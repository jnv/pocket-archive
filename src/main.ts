import Database from 'bun:sqlite';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { GraphqlClient } from './graphql';
import { PocketKv } from './PocketKv';
import { PocketStore } from './PocketStore';
import type {
  ArticleFetchQueueItem,
  PocketCredentials,
  PocketSavedItemWithSlug,
  PocketUnknownItem,
} from './types';

const POCKET_CREDENTIALS: PocketCredentials = {
  accessToken: process.env.POCKET_ACCESS_TOKEN || '',
  consumerKey: process.env.POCKET_CONSUMER_KEY || '',
};

const DEFAULT_OUTPUT_DIR = '_data';

const pocketClient = GraphqlClient(POCKET_CREDENTIALS);

const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    output: { type: 'string', default: DEFAULT_OUTPUT_DIR, short: 'o' },
  },
});

async function listAllItems(
  kv: PocketKv,
  pocketStore: PocketStore,
): Promise<number> {
  let hasNextPage = true;
  let cursor: string | null = await kv.getCheckpoint();
  if (cursor) {
    console.info(`Resuming from cursor: ${cursor}`);
  }

  let totalCount = 0;
  while (hasNextPage) {
    const items = await pocketClient.getSavedItems(cursor);
    if (!items?.user?.savedItems?.edges) {
      console.debug('No more saved items found.');
      break;
    }
    const { saved, enqueued } = await saveOrEnqueueItems(
      kv,
      pocketStore,
      items.user.savedItems.edges.map((edge) => edge?.node),
    );
    totalCount += saved + enqueued;
    console.info(`Saved ${saved} items, enqueued ${enqueued} items.`);

    hasNextPage = items.user.savedItems.pageInfo.hasNextPage;
    cursor = items.user.savedItems.pageInfo.endCursor as string | null;
    if (cursor) {
      await kv.setCheckpoint(cursor);
    }
  }
  return totalCount;
}

async function saveOrEnqueueItems(
  kv: PocketKv,
  store: PocketStore,
  items: ArticleFetchQueueItem[],
): Promise<{ saved: number; enqueued: number }> {
  let processedCount = 0;
  let enqueuedCount = 0;
  for (const queueItem of items) {
    if (!queueItem?.savedId) {
      console.warn('Skipping item without savedId:', queueItem);
      continue;
    }
    const { savedId } = queueItem;

    let slugId: string | undefined;
    if (isItemWithSlug(queueItem.item)) {
      slugId = queueItem.item.shareId;
    }
    if (slugId) {
      await store.writeSavedItem(slugId, queueItem);
      processedCount++;
    } else {
      console.info(`Enqueuing item without slug: ${savedId}`);
      await store.writePartialItem(savedId, queueItem);
      await kv.enqueue(queueItem);
      enqueuedCount++;
    }
  }
  return { saved: processedCount, enqueued: enqueuedCount };
}

function isItemWithSlug(o: PocketUnknownItem): o is PocketSavedItemWithSlug {
  return (o as PocketSavedItemWithSlug)?.__typename === 'Item';
}

async function getItemProcessor(pocketStore: PocketStore) {
  return async (queueItem: ArticleFetchQueueItem) => {
    try {
      if (!queueItem?.savedId) {
        console.warn('Skipping item without savedId:', queueItem);
        return;
      }
      const { savedId } = queueItem;
      const data = await pocketClient.getSavedItemById(savedId);
      await pocketStore.writeSavedItem(savedId, data);
    } catch (error) {
      console.error('Error processing queue item:', queueItem, error);
      throw error;
    }
  };
}

async function monitorQueue(pocketKv: PocketKv) {
  const interval = 5000;
  return new Promise<void>((resolve) => {
    let lastPendingCount: number | null = null;
    const repeat = () => {
      const pendingCount = pocketKv.getPendingJobs();
      if (pendingCount > 0) {
        if (lastPendingCount !== pendingCount) {
          console.info(`Pending jobs: ${pendingCount}`);
        }
        lastPendingCount = pendingCount;
        setTimeout(repeat, interval);
      } else {
        console.info('All jobs processed.');
        resolve();
      }
    };
    setTimeout(repeat, interval);
  });
}

async function main() {
  const outputDir = args.output;
  await fs.mkdir(outputDir, { recursive: true });
  const queueDb = new Database(path.join(outputDir, 'queue.db'), {
    strict: true,
  });
  const pocketKv = new PocketKv(outputDir, queueDb);
  const pocketStore = new PocketStore(outputDir);
  await pocketStore.init();

  process.on('SIGINT', () => {
    pocketKv.stop().then(() => {
      process.exit(0);
    });
  });

  const totalProcessed = await listAllItems(pocketKv, pocketStore);
  console.info(`Total items processed: ${totalProcessed}`);
  pocketKv.listenQueue(await getItemProcessor(pocketStore));
  await monitorQueue(pocketKv);
  await pocketKv.stop();
}

main();
