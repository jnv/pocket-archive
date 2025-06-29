import { mkdir } from 'node:fs/promises';
import { join as pathJoin } from 'node:path';

export class PocketStore {
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
      Object.values(this.paths).map((subdir) =>
        mkdir(subdir, { recursive: true }),
      ),
    );
  }

  #writeFile(filePath: string, data: unknown): Promise<number> {
    return Bun.write(filePath, JSON.stringify(data, null, 2));
  }

  writeQueueItem(itemId: string, queueItem: unknown): Promise<number> {
    const edgePath = pathJoin(this.paths.queueItems, `${itemId}.json`);
    return this.#writeFile(edgePath, queueItem);
  }

  #getSavedItemPath(itemId: string): string {
    return pathJoin(this.paths.savedItems, `${itemId}.json`);
  }

  savedItemExists(itemId: string): Promise<boolean> {
    const itemPath = this.#getSavedItemPath(itemId);
    return Bun.file(itemPath).exists();
  }

  writeSavedItem(itemId: string, data: unknown): Promise<number> {
    const itemPath = this.#getSavedItemPath(itemId);
    return this.#writeFile(itemPath, data);
  }
}
