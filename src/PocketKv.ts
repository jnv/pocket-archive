import type Database from 'bun:sqlite';
import path from 'node:path';
import type { Queue } from 'plainjob';
import {
  bun,
  defineQueue,
  defineWorker,
  JobStatus,
  type Logger,
  type Worker,
} from 'plainjob';
import type { ArticleFetchQueueItem } from './types';

const QUEUE_NAME = 'article-fetch-queue';
const QUEUE_TIMEOUT = 120 * 60 * 1000; // 2 hours

const consoleLogger: Logger = {
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: () => {},
};

export class PocketKv {
  queue: Queue;
  checkpointPath: string;
  worker: Worker | undefined;

  constructor(outputDir: string, queueDb: Database) {
    const connection = bun(queueDb);
    this.queue = defineQueue({ connection, timeout: QUEUE_TIMEOUT });
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
        logger: consoleLogger,
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
    await Bun.write(this.checkpointPath, JSON.stringify({ cursor }));
  }

  async getCheckpoint(): Promise<string | null> {
    try {
      const data = await Bun.file(this.checkpointPath).json();
      return data.cursor || null;
    } catch {
      return null;
    }
  }
}
