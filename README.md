# Pocket Archiver

A Bun application that fetches and archives Pocket saves including articles' full content.

> [!WARNING]
> This project uses Pocket's private GraphQL API, which is not officially supported by Pocket. Abuse may lead to your account being banned. Use at your own risk.

## Requirements

[Bun](https://bun.sh/) v1.2 or later.

## Setup

1. Clone this repository
1. Install dependencies with `bun install`
1. Obtain consumer key and access token (see [below for details](#obtaining-consumer-key-and-access-token))
1. Create a `.env` file in the project root:
   ```
   POCKET_ACCESS_TOKEN=your_access_token_here
   POCKET_CONSUMER_KEY=your_consumer_key_here
   ```


## Usage

Run:

```shell
bun start
```

The application fetches articles and writes raw JSON dumps to `_data` directory by default.

After all articles are fetched, there's an additional attempt to fetch more details about "pending items" (usually items Pocket failed to fetch or are no longer available).

### Command line options

You can invoke the main script directly with custom options:

```shell
bun run src/main.ts --output ./my_output_directory
```

- `--output <dir>` (or `-o <dir>`): Specify output directory (default: `_data`)

## Notes

- The application dumps raw JSON data from GraphQL API (see [example document](docs/example.json)).
- The application uses and shows Pocket's rate limiting; when the limit is reached, the application pauses until the limit resets. (From my testing the limit is usually 500 requests per hour.)
- Enqueueing stores the last known cursor, so it resumes when interrupted.
- Items are stored by their slug ID when available, otherwise by saved ID (typically for unprocessed items).
- Existing items are skipped to avoid unnecessary re-processing.

## Output directory structure

The application creates the following structure in the output directory (`_data` by default):

```
_data/
├── checkpoint.json          # Stores the last processed cursor for resuming
├── queue.db                 # Database for persisting the processing queue
├── saved_items/             # Successfully processed items with full content
│   ├── {item_id}.json       # Items with slug IDs (preferred naming)
│   └── {saved_id}.json      # Items without slug IDs (fallback naming)
└── partial_items/           # Items that couldn't be fully processed
    └── {item_id}.json       # Incomplete or failed items
```

## Obtaining consumer key and access token

### Consumer key

To access Pocket's API you can use a consumer key issued by Pocket.

The official (but untested) way is to [create a new application](https://getpocket.com/developer/apps/new) with "Retrieve" permission and platform set to "Desktop (other)".

Simpler way is to get credentials from official applications. For example, the [pockexport] project lists original consumer key for former Pocket web application under "Lazy way". The key still works.

Alternatively you can get up-to-date consumer key by eavesdropping the network traffic from Pocket's [web application](https://getpocket.com/home). Open the Network tab in developer tools, refresh the page and look for requests to `https://getpocket.com/graphql`. The consumer key is sent as the request parameter, e.g.:

```
https://getpocket.com/graphql?consumer_key=99999-somehexnumbers&enable_cors=1
```

Copy the `consumer_key` parameter from the URL and use it as your `POCKET_CONSUMER_KEY` in `.env` file and for obtaining the access token.

### Access token

With consumer key you can obtain the access token using, for example [pocket-auth-cli] application. It works well with Bun:

```shell
bunx pocket-auth-cli YOUR_CONSUMER_KEY
```
This will open a browser window where you can log in to your Pocket account and authorize the application. After that, it will print the access token to the console:

```js
{ access_token: "YOUR_ACCESS_TOKEN", username: "your_username" }
```

Copy the `access_token` value and use it as your `POCKET_ACCESS_TOKEN` in `.env` file.

> [!NOTE]
> If you can't or don't want to use the `pocket-auth-cli`, I wrote [an article about Pocket authentication][bitoff-pocket] if you want to build it yourself. Check also [the official Pocket documentation](https://getpocket.com/developer/docs/authentication).

## Related resources

- [pocket-exporter](https://github.com/ArchiveBox/pocket-exporter) – Much more advanced web app which also archives images and provides a (paid) hosted service.
- [pockexport] – Python application which uses Pocket's public API.
- [pocket-auth-cli] – CLI application to obtain Pocket access token.
- [Exploring Pocket API: Authorization][bitoff-pocket]

[pockexport]: https://github.com/karlicoss/pockexport
[bitoff-pocket]: https://www.bitoff.org/pocket-api-auth/
[pocket-auth-cli]: https://github.com/mheap/pocket-auth-cli

## License

This project, except the GraphQL schema, is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.

The [GraphQL schema](gql/schema.graphql) is a property of Mozilla Corporation.
