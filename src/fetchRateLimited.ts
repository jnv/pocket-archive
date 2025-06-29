import PQueue from 'p-queue';

const queue = new PQueue({ concurrency: 1, autoStart: true });
const resetHeader = 'x-limit-user-reset';
const remainingHeader = 'x-limit-user-remaining';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MAX_ATTEMPTS = 3;

export async function fetchRateLimited(
  input: string | Request | URL,
  init?: RequestInit,
): Promise<Response> {
  const response = await queue.add(async () => {
    for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
      // console.debug('FETCH ATTEMPT:', attempts + 1);
      const response = await fetch(input, init);
      const remaining = response.headers.get(remainingHeader);
      console.debug(`Rate limit remaining: ${remaining}`);
      if (response.status !== 429) {
        return response;
      }

      const limitResetHeader = response.headers.get(resetHeader);
      let waitMs = 1000 * 60 * 5; // default 5 minutes
      if (limitResetHeader) {
        const seconds = parseInt(limitResetHeader, 10);
        if (!Number.isNaN(seconds)) {
          waitMs = seconds * 1000;
        }
      } else {
        console.error(
          `Rate limit exceeded, but no ${resetHeader} header found.`,
          response,
        );
      }
      console.debug(response);
      console.warn(
        `Rate limit exceeded. Waiting for ${waitMs / 1000} seconds before retrying.`,
      );
      queue.pause();
      await delay(waitMs);
      queue.start();
    }
    throw new Error(
      `Fetch failed after ${MAX_ATTEMPTS} attempts due to rate limit.`,
    );
  });
  if (!response) {
    throw new Error('Fetch response is undefined. This should not happen.');
  }

  return response;
}

fetchRateLimited.preconnect = fetch.preconnect;
