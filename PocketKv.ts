import fs from 'node:fs/promises';
import path from 'node:path';
import { bun, defineQueue, defineWorker, JobStatus, type Worker } from 'plainjob';
import type Database from 'bun:sqlite';
import type { Queue } from 'plainjob';
import type { ArticleFetchQueueItem } from './types';

const QUEUE_NAME = 'article-fetch-queue';

export class PocketKv {
  queue: Queue;
  checkpointPath: string;
  worker: Worker | undefined;

  constructor(outputDir: string, queueDb: Database) {
    const connection = bun(queueDb);
    this.queue = defineQueue({ connection });
    this.checkpointPath = path.join(outputDir, 'checkpoint.json');
  }

  async enqueue(queueItem: ArticleFetchQueueItem) {
    this.queue.add(QUEUE_NAME, queueItem);
  }

  async listenQueue(
    callback: (item: ArticleFetchQueueItem) => Promise<void>,
  ): Promise<void> {
    this.worker = defineWorker(
      QUEUE_NAME,
      async (job) => {
        const data = JSON.parse(job.data) as ArticleFetchQueueItem;
        return callback(data);
      },
      {
        queue: this.queue,
        onFailed: (job, error) =>
          console.error(`Job ${job.id} failed: ${error}`),
      },
    );
    this.worker.start();
  }

  getPendingJobs(): number {
    const pendingCount = this.queue.countJobs({ status: JobStatus.Pending });
    return pendingCount;
  }

  async stop(): Promise<void> {
    await this.worker?.stop();
    this.queue.close();
  }

  async setCheckpoint(cursor: string) {
    await fs.writeFile(this.checkpointPath, JSON.stringify({ cursor }), 'utf8');
  }

  async getCheckpoint(): Promise<string | null> {
    try {
      const data = await fs.readFile(this.checkpointPath, 'utf8');
      const obj = JSON.parse(data);
      return obj.cursor || null;
    } catch {
      return null;
    }
  }
}
