import {
  GetSavedItemBySlugQuery,
  GetSavedItemsQuery,
} from './graphqlTypes.generated.ts';

export type PocketCredentials = {
  accessToken: string;
  consumerKey: string;
};

export type ArticleFetchQueueItem = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<GetSavedItemsQuery['user']>['savedItems']
    >['edges']
  >[number]
>['node'];
export type PocketItem = GetSavedItemBySlugQuery;

export type PocketUnknownItem = NonNullable<ArticleFetchQueueItem>['item'];

export type PocketSavedItemWithSlug =
  & PocketUnknownItem
  & { __typename: 'Item' };

export type PocketPendingItem =
  & PocketUnknownItem
  & { __typename: 'PendingItem' };
