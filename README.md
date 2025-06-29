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

The application writes to `_data` directory by default.

1. Enqueue bookmarks for processing
    ```shell
    bun run enqueue
    ```
1. Process queued bookmarks
    ```shell
    bun run process
    ```


> [!IMPORTANT]
> Currently there is no mechanism to gracefully end the processing task. If it's hanging for a while without any output, just kill it with <kbd>Ctrl+C</kbd>.

### Command line options

You can invoke the main script directly (in this case to both enqueue and process in a single process):

```shell
bun run src/main.ts --enqueue --process --output ./my_output_directory
```

- `--enqueue`: Queue bookmarks for processing
- `--process`: Process queued bookmarks
- `--output <dir>`: Specify output directory (default: `_data`)

## Notes

- The application dumps raw JSON data from GraphQL API.
- The application uses and shows Pocket's rate limiting; when the limit is reached, the application pauses until the limit resets. (From my testing the limit is usually 500 requests per hour.)
- Enqueueing stores the last known cursor, so it resumes when interrupted.
- Items are stored by their slug ID when available, otherwise by saved ID (typically for unprocessed items).
- Existing items are skipped to avoid unnecessary re-processing.

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

```json
{ access_token: "YOUR_ACCESS_TOKEN", username: "your_username" }
```

Copy the `access_token` value and use it as your `POCKET_ACCESS_TOKEN` in `.env` file.

> ![NOTE]
> If you can't or don't want to use the `pocket-auth-cli`, I wrote [an article about Pocket authentication][bitoff-pocket] if you want to build it yourself. Check also [the official Pocket documentation](https://getpocket.com/developer/docs/authentication).

## Related resources

- [pockexport] – Python application which uses Pocket's public API.
- [pocket-auth-cli] – CLI application to obtain Pocket access token.
- [Exploring Pocket API: Authorization][bitoff-pocket]

[pockexport]: https://github.com/karlicoss/pockexport
[bitoff-pocket]: https://www.bitoff.org/pocket-api-auth/
[pocket-auth-cli]: https://github.com/mheap/pocket-auth-cli

## License

This project, except the GraphQL schema, is licensed under the AGPL-3.0 License. See the [LICENSE](LICENSE) file for details.

The [GraphQL schema](gql/schema.graphql) is a property of Mozilla Corporation.
