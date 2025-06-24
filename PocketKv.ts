import type { ArticleFetchQueueItem } from './types';
import { JobQueue, Job } from 'plainjob';
import fs from 'fs/promises';

export class PocketKv {
  queue: JobQueue<ArticleFetchQueueItem>;
  checkpointPath: string;

  constructor(queuePath: string, checkpointPath: string) {
    this.queue = new JobQueue<ArticleFetchQueueItem>({
      path: queuePath,
    });
    this.checkpointPath = checkpointPath;
  }

  async enqueue(queueItem: ArticleFetchQueueItem) {
    const id = queueItem?.savedId ?? Date.now().toString();
    await this.queue.add({ ...queueItem, _id: id });
  }

  async listenQueue(callback: (item: ArticleFetchQueueItem) => Promise<void>): Promise<void> {
    for await (const job of this.queue) {
      try {
        await callback(job.data);
        await job.done();
      } catch (err) {
        await job.fail(err);
      }
    }
  }

  async setCheckpoint(cursor: string) {
    await fs.writeFile(this.checkpointPath, JSON.stringify({ cursor }), 'utf8');
  }

  async getCheckpoint(): Promise<string | null> {
    try {
      const data = await fs.readFile(this.checkpointPath, 'utf8');
      const obj = JSON.parse(data);
      return obj.cursor || null;
    } catch (err) {
      return null;
    }
  }

  async reset() {
    try {
      await fs.unlink(this.checkpointPath);
    } catch (err) {
      // ignore if file does not exist
    }
  }
}
