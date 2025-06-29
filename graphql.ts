import { gql, GraphQLClient } from 'graphql-request';
import type { PocketCredentials } from './types.ts';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parse } from 'graphql';
import {
  type GetSavedItemByIdQuery,
  type GetSavedItemByIdQueryVariables,
  type GetSavedItemBySlugQuery,
  type GetSavedItemBySlugQueryVariables,
  type GetSavedItemsQuery,
  type GetSavedItemsQueryVariables,
  SavedItemsSortBy,
  SavedItemsSortOrder,
  SavedItemStatusFilter,
} from './graphqlTypes.generated.ts';
import { fetchRateLimited } from './fetchRateLimited.ts';

const GRAPHQL_BASE_URL = 'https://getpocket.com/graphql';

const fragmentSavedItemDetails = gql`
  fragment SavedItemDetails on SavedItem {
    _createdAt
    _updatedAt
    _version
    id
    title
    url
    savedId: id
    status
    isFavorite
    favoritedAt
    isArchived
    archivedAt
    tags {
      id
      name
    }
    annotations {
      highlights {
        _createdAt
        _updatedAt
        id
        quote
        patch
        version
        _createdAt
        _updatedAt
        note {
          text
          _createdAt
          _updatedAt
        }
      }
    }
  }
`;

const fragmentItemDetails = gql`
  fragment ItemDetails on Item {
    isArticle
    title
    shareId: id
    itemId
    readerSlug
    resolvedId
    resolvedUrl
    domain
    domainMetadata {
      name
    }
    excerpt
    hasImage
    hasVideo
    images {
      caption
      credit
      height
      imageId
      src
      width
    }
    videos {
      vid
      videoId
      type
      src
    }
    topImageUrl
    timeToRead
    givenUrl
    normalUrl
    resolvedUrl
    ssml
    wordCount
    collection {
      imageUrl
      intro
      title
      excerpt
    }
    authors {
      id
      name
      url
    }
    datePublished
    syndicatedArticle {
      slug
      publisher {
        name
        url
      }
    }
    article
  }
`;

const getSavedItemsIds: TypedDocumentNode<
  GetSavedItemsQuery,
  GetSavedItemsQueryVariables
> = parse(gql`
  query getSavedItems(
    $filter: SavedItemsFilter
    $sort: SavedItemsSort
    $pagination: PaginationInput
  ) {
    user {
      savedItems(filter: $filter, sort: $sort, pagination: $pagination) {
        edges {
          cursor
          node {
            __typename
            item {
              __typename
              ... on PendingItem {
                itemId
                status
                url
              }
              ... on Item {
                isArticle
                hasImage
                hasVideo
                timeToRead
                shareId: id
                itemId
                givenUrl
                preview {
                  ... on ItemSummary {
                    previewId: id
                    image {
                      caption
                      credit
                      url
                      cachedImages(
                        imageOptions: [
                          { id: "WebPImage", fileType: WEBP, width: 640 }
                        ]
                      ) {
                        url
                        id
                      }
                    }
                    excerpt
                    title
                    authors {
                      name
                    }
                    domain {
                      name
                    }
                    datePublished
                    url
                  }
                  ... on OEmbed {
                    previewId: id
                    image {
                      caption
                      credit
                      url
                      cachedImages(
                        imageOptions: [
                          { id: "WebPImage", fileType: WEBP, width: 640 }
                        ]
                      ) {
                        url
                        id
                      }
                    }
                    excerpt
                    title
                    authors {
                      name
                    }
                    domain {
                      name
                    }
                    datePublished
                    url
                    htmlEmbed
                    type
                  }
                }
              }
            }
            _createdAt
            _updatedAt
            title
            url
            savedId: id
            status
            isFavorite
            favoritedAt
            isArchived
            archivedAt
            tags {
              id
              name
            }
            annotations {
              highlights {
                id
                quote
                patch
                version
                _createdAt
                _updatedAt
                note {
                  text
                  _createdAt
                  _updatedAt
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
`);

const getSavedItemBySlug: TypedDocumentNode<
  GetSavedItemBySlugQuery,
  GetSavedItemBySlugQueryVariables
> = parse(gql`
  query getSavedItemBySlug($id: ID!) {
    readerSlug(slug: $id) {
      fallbackPage {
        ... on ReaderInterstitial {
          itemCard {
            ... on PocketMetadata {
              item {
                ...ItemDetails
              }
            }
          }
        }
      }
      savedItem {
        ...SavedItemDetails
        annotations {
          highlights {
            id
            quote
            patch
            version
            _createdAt
            _updatedAt
            note {
              text
              _createdAt
              _updatedAt
            }
          }
        }
        item {
          ...ItemDetails
          ... on Item {
            article
            relatedAfterArticle(count: 3) {
              corpusRecommendationId: id
              corpusItem {
                thumbnail: imageUrl
                publisher
                title
                externalUrl: url
                saveUrl: url
                id
                excerpt
              }
            }
          }
        }
      }
      slug
    }
  }
  ${fragmentItemDetails}
  ${fragmentSavedItemDetails}
`);

const getSaveItemById: TypedDocumentNode<
  GetSavedItemByIdQuery,
  GetSavedItemByIdQueryVariables
> = parse(gql`
  query getSavedItemById($id: ID!) {
    user {
      savedItemById(id: $id) {
        ...SavedItemDetails
        annotations {
          highlights {
            id
            quote
            patch
            version
            _createdAt
            _updatedAt
            note {
              text
              _createdAt
              _updatedAt
            }
          }
        }
        item {
          ...ItemDetails
          ... on PendingItem {
            itemId
            status
            url
          }
        }
      }
    }
  }
  ${fragmentSavedItemDetails}
  ${fragmentItemDetails}
`);

export function GraphqlClient({ consumerKey, accessToken }: PocketCredentials) {
  if (!consumerKey || !accessToken) {
    throw new Error(
      'Missing Pocket credentials (consumerKey and accessToken).',
    );
  }

  const endpoint =
    `${GRAPHQL_BASE_URL}?consumer_key=${consumerKey}&access_token=${accessToken}&enable_cors=1`;

  const client = new GraphQLClient(endpoint, {
    fetch: fetchRateLimited,
  });
  return {
    getSavedItemBySlug(slug: string) {
      try {
        return client.request(getSavedItemBySlug, { id: slug });
      } catch (error) {
        console.error('Error fetching saved item by slug:', error);
        throw error;
      }
    },
    getSavedItemById(id: string) {
      try {
        return client.request(getSaveItemById, { id });
      } catch (error) {
        console.error('Error fetching saved item by ID:', error);
        throw error;
      }
    },
    getSavedItems(cursor?: string | null) {
      const pagination = cursor ? { after: cursor } : undefined;
      try {
        return client.request(getSavedItemsIds, {
          pagination,
          filter: {
            statuses: [
              SavedItemStatusFilter.Archived,
              SavedItemStatusFilter.Unread,
              SavedItemStatusFilter.Hidden,
            ],
          },
          sort: {
            sortBy: SavedItemsSortBy.CreatedAt,
            sortOrder: SavedItemsSortOrder.Desc,
          },
        });
      } catch (error) {
        console.error('Error fetching saved items:', error);
        throw error;
      }
    },
  };
}

