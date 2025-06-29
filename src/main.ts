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
    enqueue: { type: 'boolean', default: false },
    process: { type: 'boolean', default: false },
    output: { type: 'string', default: DEFAULT_OUTPUT_DIR, short: 'o' },
  },
});

async function listAllItems(kv: PocketKv) {
  let hasNextPage = true;
  let cursor: string | null = await kv.getCheckpoint();
  if (cursor) {
    console.info(`Resuming from cursor: ${cursor}`);
  }

  while (hasNextPage) {
    const items = await pocketClient.getSavedItems(cursor);
    if (!items?.user?.savedItems?.edges) {
      console.log('No more saved items found.');
      break;
    }
    let itemsCount = 0;
    for (const edge of items.user.savedItems.edges) {
      const node = edge?.node;
      if (!node) {
        console.warn('Skipping edge without node:', edge);
        continue;
      }
      await kv.enqueue(node);
      itemsCount++;
    }
    console.info(`Enqueued ${itemsCount} items`);

    hasNextPage = items.user.savedItems.pageInfo.hasNextPage;
    cursor = items.user.savedItems.pageInfo.endCursor as string | null;
    if (cursor) {
      await kv.setCheckpoint(cursor);
    }
  }
  console.debug('Finished listing all items.');
}

function isItemWithSlug(o: PocketUnknownItem): o is PocketSavedItemWithSlug {
  return (o as PocketSavedItemWithSlug)?.__typename === 'Item';
}

async function getItemProcessor(outputDir: string) {
  const pocketStore = new PocketStore(outputDir);
  await pocketStore.init();
  return async (queueItem: ArticleFetchQueueItem) => {
    try {
      if (!queueItem?.savedId) {
        console.warn('Skipping item without savedId:', queueItem);
        return;
      }
      const { savedId } = queueItem;
      let slugId: string | undefined;
      if (isItemWithSlug(queueItem.item)) {
        slugId = queueItem.item.shareId;
      }

      const slugOrItemId = slugId ?? savedId;

      await pocketStore.writeQueueItem(slugOrItemId, queueItem);

      if (await pocketStore.savedItemExists(slugOrItemId)) {
        console.info(`Item already exists: ${slugOrItemId}`);
        return;
      }
      console.info(`Processing item: ${slugOrItemId}`);
      let data: unknown = null;
      if (slugId) {
        data = await pocketClient.getSavedItemBySlug(slugId);
      } else {
        data = await pocketClient.getSavedItemById(savedId);
      }

      await pocketStore.writeSavedItem(slugOrItemId, data);
    } catch (error) {
      console.error('Error processing queue item:', queueItem, error);
      throw error;
    }
  };
}

async function monitorQueue(pocketKv: PocketKv) {
  const interval = 5000;
  return new Promise<void>((resolve) => {
    const repeat = () => {
      const pendingCount = pocketKv.getPendingJobs();
      if (pendingCount > 0) {
        console.info(`Pending jobs: ${pendingCount}`);
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

  process.on('SIGINT', () => {
    pocketKv.stop().then(() => {
      process.exit(0);
    });
  });

  const promises: Promise<void>[] = [];
  if (args.enqueue) {
    console.info('Enqueuing items...');
    promises.push(listAllItems(pocketKv));
  }
  if (args.process) {
    console.info('Processing items...');
    pocketKv.listenQueue(await getItemProcessor(outputDir));
    promises.push(monitorQueue(pocketKv));
  }

  await Promise.all(promises);
  pocketKv.stop();
}

main();
