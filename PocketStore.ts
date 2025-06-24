import { join as pathJoin } from '@std/path/join';
import { exists } from '@std/fs/exists';
import { ensureDir } from '@std/fs/ensure-dir';
import { ArticleFetchQueueItem } from './types.ts';

export class PocketStore<TQueueItem> {
  readonly basePath: string;
  readonly paths: { queueItems: string; savedItems: string };

  constructor(basePath: string) {
    this.basePath = basePath;
    this.paths = {
      queueItems: pathJoin(basePath, 'partial_items'),
      savedItems: pathJoin(basePath, 'saved_items'),
    };
  }

  async init(): Promise<void> {
    await Promise.all(
      Object.values(this.paths).map((subdir) => ensureDir(subdir)),
    );
  }

  #writeFile(filePath: string, data: unknown): Promise<void> {
    return Deno.writeTextFile(filePath, JSON.stringify(data, null, 2));
  }

  writeQueueItem(itemId: string, queueItem: unknown): Promise<void> {
    const edgePath = pathJoin(
      this.paths.queueItems,
      `${itemId}.json`,
    );
    return this.#writeFile(edgePath, queueItem);
  }

  #getSavedItemPath(itemId: string): string {
    return pathJoin(this.paths.savedItems, `${itemId}.json`);
  }

  savedItemExists(itemId: string): Promise<boolean> {
    const itemPath = this.#getSavedItemPath(itemId);
    return exists(itemPath);
  }

  writeSavedItem(itemId: string, data: unknown): Promise<void> {
    const itemPath = this.#getSavedItemPath(itemId);
    return this.#writeFile(itemPath, data);
  }
}
