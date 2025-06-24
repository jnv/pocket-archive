import { PocketStore } from './PocketStore';
import { GraphqlClient } from './graphql';
import { PocketKv } from './PocketKv';
import type {
  ArticleFetchQueueItem,
  PocketCredentials,
  PocketItem,
  PocketSavedItemWithSlug,
  PocketUnknownItem,
} from './types';
import path from 'path';
import fs from 'fs/promises';
import { parseArgs } from 'node:util';
// If you see type errors for 'process', install @types/node: bun add -d @types/node

const POCKET_CREDENTIALS: PocketCredentials = {
  accessToken: process.env.POCKET_ACCESS_TOKEN || '',
  consumerKey: process.env.POCKET_CONSUMER_KEY || '',
};

const QUEUE_PATH = 'queue.jsonl';
const CHECKPOINT_PATH = 'checkpoint.json';
const OUTPUT_DIR = '_data';

const pocketClient = GraphqlClient(POCKET_CREDENTIALS);

const { values: args } = parseArgs({
  args: process.argv.slice(2),
  options: {
    enqueue: { type: 'boolean', default: false },
    process: { type: 'boolean', default: false },
    output: { type: 'string', default: OUTPUT_DIR, short: 'o' },
  },
});

async function listAllItems(kv: PocketKv) {
  try {
    let hasNextPage = true;
    let cursor: string | null = await kv.getCheckpoint();
    if (cursor) {
      console.info(`Resuming from cursor: ${cursor}`);
    }

    while (hasNextPage) {
      const items = await pocketClient.getSavedItems(cursor);
      if (
        !items?.user?.savedItems?.edges
      ) {
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
  } catch (error) {
    throw error;
  }
}

function isItemWithSlug(o: PocketUnknownItem): o is PocketSavedItemWithSlug {
  return (
    (o as PocketSavedItemWithSlug)?.__typename === 'Item'
  );
}

async function getItemProcessor(outputDir: string) {
  const pocketStore = new PocketStore<PocketItem>(outputDir);
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

async function main() {
  const outputDir = args.output;
  await fs.mkdir(outputDir, { recursive: true });
  const queuePath = path.join(outputDir, QUEUE_PATH);
  const checkpointPath = path.join(outputDir, CHECKPOINT_PATH);
  const pocketKv = new PocketKv(queuePath, checkpointPath);

  process.on('SIGINT', () => {
    process.exit(0);
  });

  const promises: Promise<void>[] = [];
  if (args.enqueue) {
    console.info('Enqueuing items...');
    promises.push(listAllItems(pocketKv));
  }
  if (args.process) {
    console.info('Processing items...');
    promises.push(pocketKv.listenQueue(
      await getItemProcessor(outputDir),
    ));
  }

  await Promise.all(promises);
}

main();
