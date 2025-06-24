import { ArticleFetchQueueItem } from './types.ts';

const KEYS = {
  CHECKPOINT: ['state', 'checkpoint'],
  FAILED: ['queue', 'failed'],
};

export class PocketKv {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  enqueue(queueItem: ArticleFetchQueueItem) {
    const id = queueItem?.savedId ?? Date.now().toString();
    const backupKey = [...KEYS.FAILED, id];
    return this.#kv.enqueue(queueItem, {
      keysIfUndelivered: [backupKey],
      backoffSchedule: [1000, 5000, 10_000],
    });
  }

  listenQueue(
    callback: (item: ArticleFetchQueueItem) => Promise<void>,
  ): Promise<void> {
    return this.#kv.listenQueue(callback);
  }

  setCheckpoint(cursor: string) {
    return this.#kv.set(KEYS.CHECKPOINT, cursor);
  }

  reset() {
    return this.#kv.delete(KEYS.CHECKPOINT);
  }

  async getCheckpoint(): Promise<string | null> {
    const result = await this.#kv.get<string>(KEYS.CHECKPOINT);
    return result.value;
  }
}
