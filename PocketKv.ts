const KEYS = {
  CHECKPOINT: ['state', 'checkpoint'],
};

export class PocketKv<TQueueItem> {
  #kv: Deno.Kv;

  constructor(kv: Deno.Kv) {
    this.#kv = kv;
  }

  enqueue(item: TQueueItem) {
    return this.#kv.enqueue(item);
  }

  listenQueue(
    callback: (item: TQueueItem) => Promise<void>,
  ): Promise<void> {
    return this.#kv.listenQueue(callback);
  }

  setCheckpoint(cursor: string) {
    return this.#kv.set(KEYS.CHECKPOINT, cursor);
  }

  async getCheckpoint(): Promise<string | null> {
    const result = await this.#kv.get<string>(KEYS.CHECKPOINT);
    return result.value;
  }
}
