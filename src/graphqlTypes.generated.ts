export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> =
  & Omit<T, K>
  & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  /** A String representing a date in the format of `yyyy-MM-dd HH:mm:ss` */
  DateString: any;
  /** FunctionalBoostValue custom scalar type */
  FunctionalBoostValue: any;
  HtmlString: any;
  /** ISOString custom scalar type */
  ISOString: any;
  /**
   * A string formatted with CommonMark markdown,
   * plus the strikethrough extension from GFM.
   * This Scalar is for documentation purposes; otherwise
   * not treated differently from String in the API.
   */
  Markdown: any;
  /** String truncated to 300 characters (truncated strings indicated with ellipses) */
  Max300CharString: any;
  /** A positive integer number. */
  NonNegativeInt: any;
  ProseMirrorJson: any;
  /** Integer based represention of a unix timestamp */
  Timestamp: any;
  /** A String in the format of a url. */
  Url: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  ValidUrl: any;
};

/** The source of en entity */
export enum ActivitySource {
  /** Manually entered through the curation admin tool */
  Manual = 'MANUAL',
  /** Created by ML */
  Ml = 'ML',
}

/**
 * Input data for adding multiple items to a list.
 * Appends to the end of the list.
 */
export type AddItemInput = {
  itemId: Scalars['ID'];
  url: Scalars['Url'];
  title?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['Url']>;
  publisher?: Maybe<Scalars['String']>;
  authors?: Maybe<Scalars['String']>;
};

export type AdvancedSearchFilters = {
  isFavorite?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<SearchItemsContentType>;
  status?: Maybe<SearchItemsStatusFilter>;
  domain?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  /**
   * Include only items with the following tags (exact)
   * in search results (OR combination)
   */
  tags?: Maybe<Array<Scalars['String']>>;
};

export type ArchiveNoteInput = {
  /**
   * The ID of the note to archive or unarchive
   * (depends on mutation).
   */
  id: Scalars['ID'];
  /**
   * When the note was archived or unarchived.
   * If not provided, defaults to the server time upon
   * receiving request.
   */
  updatedAt?: Maybe<Scalars['ISOString']>;
};

export type ArticleMarkdown = {
  __typename?: 'ArticleMarkdown';
  text: Scalars['String'];
  images?: Maybe<Array<MarkdownImagePosition>>;
};

/**
 * The status of the syndicated article
 * TODO: rename to SyndicatedArticle status and move to schema-shared.graphql
 * (requires client changes)
 */
export enum ArticleStatus {
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Active = 'ACTIVE',
}

/** Information about an Author of an article or some content */
export type Author = {
  __typename?: 'Author';
  /** Unique id for that Author */
  id: Scalars['ID'];
  /** Display name */
  name?: Maybe<Scalars['String']>;
  /** A url to that Author's site */
  url?: Maybe<Scalars['String']>;
};

export type BaseError = {
  path: Scalars['String'];
  message: Scalars['String'];
};

/** Input for batch imports */
export type BatchImportInput = {
  url: Scalars['Url'];
  createdAt: Scalars['ISOString'];
  title: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<ImportableStatus>;
};

/** Input object for creating and deleting highlights using bulk mutation. */
export type BatchWriteHighlightsInput = {
  delete?: Maybe<Array<Scalars['ID']>>;
  create?: Maybe<Array<CreateHighlightInput>>;
};

/**
 * Result object for bulk create/delete highlights mutation.
 * Mutation is atomic -- if there is a response, all operations
 * were successful.
 *
 * The corresponding result array will be empty, but present, if there
 * were no requests for created/deleted.
 */
export type BatchWriteHighlightsResult = {
  __typename?: 'BatchWriteHighlightsResult';
  deleted: Array<Scalars['ID']>;
  created: Array<Highlight>;
};

/** Row in a bulleted (unordered list) */
export type BulletedListElement = ListElement & {
  __typename?: 'BulletedListElement';
  /** Row in a list. */
  content: Scalars['Markdown'];
  /** Zero-indexed level, for handling nested lists. */
  level: Scalars['Int'];
};

/**
 * Apollo Server @cacheControl directive caching behavior either for a single field, or for all fields that
 * return a particular type
 */
export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

/** A requested image that is cached and has the requested image parameters */
export type CachedImage = {
  __typename?: 'CachedImage';
  /** Id of the image that matches the ID from the requested options */
  id: Scalars['ID'];
  /** URL of the cached image */
  url?: Maybe<Scalars['Url']>;
  /** Width of the cached image */
  width?: Maybe<Scalars['Int']>;
  /** Height of the cached image */
  height?: Maybe<Scalars['Int']>;
};

/** Set of parameters that will be used to change an image */
export type CachedImageInput = {
  /**
   * ID that will be added to the generated response object so you can find it.
   * NOTE: Can be any string that you like, it will be added to the response so you
   * can use it when consuming it
   */
  id: Scalars['ID'];
  /** Quality of the image in whole percentage, 100 = full, quality 50 = half quality */
  qualityPercentage?: Maybe<Scalars['Int']>;
  /** Width of the image */
  width?: Maybe<Scalars['Int']>;
  /** Height of the image */
  height?: Maybe<Scalars['Int']>;
  /** File type of the requested image */
  fileType?: Maybe<ImageFileType>;
};

export type Collection = {
  __typename?: 'Collection';
  externalId: Scalars['ID'];
  slug: Scalars['String'];
  title: Scalars['String'];
  excerpt?: Maybe<Scalars['Markdown']>;
  status: CollectionStatus;
  curationCategory?: Maybe<CurationCategory>;
  intro?: Maybe<Scalars['Markdown']>;
  imageUrl?: Maybe<Scalars['Url']>;
  labels?: Maybe<Array<Maybe<Label>>>;
  /**
   * note that language is *not* being used as locale - only to specify the
   * language of the collection.
   */
  language: CollectionLanguage;
  partnership?: Maybe<CollectionPartnership>;
  publishedAt?: Maybe<Scalars['DateString']>;
  authors: Array<CollectionAuthor>;
  stories: Array<CollectionStory>;
  /**
   * We will never return child categories in this type, so there's no need to
   * specify `IABParentCategory` here. The basic `IABCategory` is sufficient.
   */
  IABParentCategory?: Maybe<IabCategory>;
  IABChildCategory?: Maybe<IabCategory>;
  /**
   * Provides short url for the given_url in the format: https://pocket.co/<identifier>.
   * marked as beta because it's not ready yet for large client request.
   */
  shortUrl?: Maybe<Scalars['Url']>;
  /** The preview of the collection */
  preview: PocketMetadata;
};

export type CollectionAuthor = {
  __typename?: 'CollectionAuthor';
  externalId: Scalars['ID'];
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['Markdown']>;
  imageUrl?: Maybe<Scalars['Url']>;
  active: Scalars['Boolean'];
};

/** valid language codes for collections */
export enum CollectionLanguage {
  /** German */
  De = 'DE',
  /** English */
  En = 'EN',
}

/**
 * If a collection was made in partnership with an external company, this
 * entity will hold all required info about that partnership.
 */
export type CollectionPartnership = {
  __typename?: 'CollectionPartnership';
  externalId: Scalars['String'];
  type: CollectionPartnershipType;
  name: Scalars['String'];
  url: Scalars['Url'];
  imageUrl: Scalars['Url'];
  blurb: Scalars['Markdown'];
};

/** Type and enums related to Collections made in partnership with a company. */
export enum CollectionPartnershipType {
  Partnered = 'PARTNERED',
  Sponsored = 'SPONSORED',
}

export type CollectionsFiltersInput = {
  /** If not provided, or if an unsupported language is requested, defaults to `en` */
  language?: Maybe<Scalars['String']>;
  /** If provided, will return all collections that match at least one of the labels. */
  labels?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CollectionsResult = {
  __typename?: 'CollectionsResult';
  pagination: Pagination;
  collections: Array<Collection>;
};

export enum CollectionStatus {
  Draft = 'DRAFT',
  Review = 'REVIEW',
  Published = 'PUBLISHED',
  Archived = 'ARCHIVED',
}

export type CollectionStory = {
  __typename?: 'CollectionStory';
  externalId: Scalars['ID'];
  url: Scalars['Url'];
  title: Scalars['String'];
  excerpt: Scalars['Markdown'];
  imageUrl?: Maybe<Scalars['Url']>;
  authors: Array<CollectionStoryAuthor>;
  publisher?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
  item?: Maybe<Item>;
  /** if True, the story is provided by a partner and should be displayed as such */
  fromPartner: Scalars['Boolean'];
};

export type CollectionStoryAuthor = {
  __typename?: 'CollectionStoryAuthor';
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

/** Content type classification for a corpus item */
export enum CorpusContentType {
  Article = 'ARTICLE',
  Video = 'VIDEO',
  Collection = 'COLLECTION',
}

/**
 * Represents an item that is in the Corpus and its associated manually edited metadata.
 * TODO: CorpusItem to implement PocketResource when it becomes available.
 */
export type CorpusItem = {
  __typename?: 'CorpusItem';
  /** The GUID that is stored on an approved corpus item */
  id: Scalars['ID'];
  /** The URL of the Approved Item. */
  url: Scalars['Url'];
  /** The title of the Approved Item. */
  title: Scalars['String'];
  /** The excerpt of the Approved Item. */
  excerpt: Scalars['String'];
  /** What language this item is in. This is a two-letter code, for example, 'EN' for English. */
  language: CorpusLanguage;
  /** The name of the online publication that published this story. */
  publisher: Scalars['String'];
  /** The publication date for this story. */
  datePublished?: Maybe<Scalars['Date']>;
  /** The image URL for this item's accompanying picture. */
  imageUrl: Scalars['Url'];
  /** The image for this item's accompanying picture. */
  image: Image;
  /** The author names and sort orders associated with this CorpusItem. */
  authors: Array<CorpusItemAuthor>;
  /** The topic associated with this CorpusItem. */
  topic?: Maybe<Scalars['String']>;
  /** If the Corpus Item is pocket owned with a specific type, this is the associated object (Collection or SyndicatedArticle). */
  target?: Maybe<CorpusTarget>;
  /** Experimental data point that could imply either an expiry date or an urgency to be shown. */
  isTimeSensitive: Scalars['Boolean'];
  /** The user's saved item, from the Corpus Item, if the corpus item was saved to the user's saves */
  savedItem?: Maybe<SavedItem>;
  /**
   * Provides short url for the given_url in the format: https://pocket.co/<identifier>.
   * marked as beta because it's not ready yet for large client request.
   */
  shortUrl?: Maybe<Scalars['Url']>;
  /** Time to read in minutes. Is nullable. */
  timeToRead?: Maybe<Scalars['Int']>;
  /** The preview of the search result */
  preview: PocketMetadata;
};

/** An author associated with a CorpusItem. */
export type CorpusItemAuthor = {
  __typename?: 'CorpusItemAuthor';
  name: Scalars['String'];
  sortOrder: Scalars['Int'];
};

/** Valid language codes for curated corpus items. */
export enum CorpusLanguage {
  /** German */
  De = 'DE',
  /** English */
  En = 'EN',
  /** Italian */
  It = 'IT',
  /** French */
  Fr = 'FR',
  /** Spanish */
  Es = 'ES',
}

export type CorpusRecommendation = {
  __typename?: 'CorpusRecommendation';
  /**
   * Clients should include this id in the `corpus_recommendation` Snowplow entity
   * for impression, content_open, and engagement events related to this
   * recommendation. This id is different across users, across requests, and across
   * corpus items. The recommendation-api service associates metadata with this id
   * to join and aggregate recommendations in our data warehouse.
   */
  id: Scalars['ID'];
  /**
   * Firefox clients require an integer id. Other clients should use `id` instead
   * of this field. tileId uniquely identifies the ScheduledSurface, CorpusItem,
   * and scheduled_date. tileId is greater than 0 and less than 2^53 to fit in a
   * Javascript number (64-bit IEEE 754 float). The field type is a Float because a
   * GraphQL Int is limited to 32 bit.
   * @deprecated Only to be used by Firefox. Other clients should use `id`. We plan to also migrate Firefox New Tab to use CorpusRecommendation.id instead of tileId to track recommendation telemetry.
   */
  tileId: Scalars['Float'];
  /** Content meta data. */
  corpusItem: CorpusItem;
  /** Reason why this CorpusItem is recommended to the user, or null if no reason is available. */
  reason?: Maybe<RecommendationReason>;
};

/** Paginated corpus search result connection */
export type CorpusSearchConnection = {
  __typename?: 'CorpusSearchConnection';
  edges: Array<CorpusSearchEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a CorpusSearchConnection result */
export type CorpusSearchEdge = {
  __typename?: 'CorpusSearchEdge';
  cursor: Scalars['String'];
  node: CorpusSearchNode;
};

/** Fields that can be searched using query strings */
export enum CorpusSearchFields {
  /**
   * (Default) Search the fields which relate to the content
   * of the resource (title, article, excerpt, extracted content)
   * rather than the metadata (publisher).
   */
  AllContentful = 'ALL_CONTENTFUL',
  /** Search terms in title fields */
  Title = 'TITLE',
  /** Search terms in parsed, extracted content fields */
  ExtractedContent = 'EXTRACTED_CONTENT',
  /** Search terms in excerpt fields */
  Excerpt = 'EXCERPT',
  /** Search terms in publisher fields */
  Publisher = 'PUBLISHER',
  /** Search all possible fields */
  All = 'ALL',
}

/** Filters to refine corpus search results. */
export type CorpusSearchFilters = {
  /** The language of the corpus to search (letter code) */
  language: CorpusLanguage;
  /** The author's name */
  author?: Maybe<Scalars['String']>;
  /**
   * The topic (use getTopics query to retrieve valid topics).
   * Multiple topics are combined with OR.
   */
  topic?: Maybe<Array<Scalars['String']>>;
  /**
   * The publisher's name. This is an exact match for filtering.
   * To use publisher in search, use the publisher field in the query
   * string.
   */
  publisher?: Maybe<Scalars['String']>;
  /**
   * Filter for when an article was published. Can provide
   * upper/lower bounds with 'before' or 'after', or use both
   * both to create a time range.
   */
  publishedDateRange?: Maybe<DateFilter>;
  /** When the content was added to Pocket's corpus */
  addedDateRange?: Maybe<DateFilter>;
  /** Set to true to exclude collections from the results. */
  excludeCollections?: Maybe<Scalars['Boolean']>;
  /** Set to true to exclude ML-generated recommendations from the results. */
  excludeML?: Maybe<Scalars['Boolean']>;
  /**
   * Filter to limit the result set to specific content types.
   * Multiple types are combined with OR.
   * Can use this to search collections only.
   */
  contentType?: Maybe<Array<CorpusContentType>>;
};

/**
 * Highlighted snippets from fields in the search results
 * so clients can show users where the query matches are.
 * Each field, if available, contains an array of html text
 * snippets that contain a match to the search term.
 * The matching text is wrapped in <em> tags, e.g.
 * ["Hiss at <em>vacuum</em> cleaner if it fits i sits"]
 */
export type CorpusSearchHighlights = {
  __typename?: 'CorpusSearchHighlights';
  fullText?: Maybe<Array<Maybe<Scalars['HtmlString']>>>;
  title?: Maybe<Array<Maybe<Scalars['HtmlString']>>>;
  excerpt?: Maybe<Array<Maybe<Scalars['HtmlString']>>>;
  publisher?: Maybe<Array<Maybe<Scalars['HtmlString']>>>;
};

/** A node in a CorpusSearchConnection result */
export type CorpusSearchNode = {
  __typename?: 'CorpusSearchNode';
  /** Attaches the item so we can use the preview field */
  item?: Maybe<Item>;
  /** Search highlights */
  searchHighlights?: Maybe<CorpusSearchHighlights>;
};

/** A search query for the corpus */
export type CorpusSearchQueryString = {
  /** The query string to search. */
  query: Scalars['String'];
  /**
   * A specific field to search on (e.g. title),
   * or ALL to search all available text content fields.
   * If missing, defaults to 'ALL_CONTENTFUL'
   */
  field?: Maybe<CorpusSearchFields>;
};

/**
 * Sort scheme for Corpus Search. Defaults to showing most relevant results first.
 * Only relevant for indices which use keyword search.
 * **Semantic search will ignore any inputs and use default only.**
 */
export type CorpusSearchSort = {
  sortBy: CorpusSearchSortBy;
  sortOrder?: Maybe<SearchItemsSortOrder>;
};

/** Sortable properties for Corpus Search */
export enum CorpusSearchSortBy {
  /** Relevance score computed by search algorithm */
  Relevance = 'RELEVANCE',
  /** When the content was added to the corpus */
  DateAddedToCorpus = 'DATE_ADDED_TO_CORPUS',
  /**
   * When the content was originally published
   * (Note: this data is sparse/nullable)
   */
  DatePublished = 'DATE_PUBLISHED',
}

/**
 * This is the same as Slate but in this type all recommendations are backed by
 * CorpusItems. This means that the editorial team has editorial control over the
 * items served by this endpoint.
 */
export type CorpusSlate = {
  __typename?: 'CorpusSlate';
  /** UUID */
  id: Scalars['ID'];
  /** Recommendations for the current request context. */
  recommendations: Array<CorpusRecommendation>;
  /** Indicates the main type of reason why recommendations are included in this slate, or null if none is available. */
  recommendationReasonType?: Maybe<RecommendationReasonType>;
  /**
   * The display headline for the slate. Surface context may be required to render
   * determine what to display. This will depend on if we connect the copy to the
   * Surface, SlateExperiment, or Slate.
   */
  headline: Scalars['String'];
  /** A smaller, secondary headline that can be displayed to provide additional context on the slate. */
  subheadline?: Maybe<Scalars['String']>;
  /** Link to a page where the user can explore more recommendations similar to this slate, or null if no link is provided. */
  moreLink?: Maybe<Link>;
  /** utm_source value that can be set on the url by the caller to attribute the recommendations. */
  utmSource?: Maybe<Scalars['String']>;
};

/**
 * This is the same as Slate but in this type all recommendations are backed by
 * CorpusItems. This means that the editorial team has editorial control over the
 * items served by this endpoint.
 */
export type CorpusSlateRecommendationsArgs = {
  count?: Maybe<Scalars['Int']>;
};

/** A collection of slates. */
export type CorpusSlateLineup = {
  __typename?: 'CorpusSlateLineup';
  /** UUID */
  id: Scalars['ID'];
  /** Slates. */
  slates: Array<CorpusSlate>;
};

/** A collection of slates. */
export type CorpusSlateLineupSlatesArgs = {
  count?: Maybe<Scalars['Int']>;
};

/**
 * TODO: Make this type implement PocketResource when available.
 * https://getpocket.atlassian.net/wiki/spaces/PE/pages/2771714049/The+Future+of+Item
 */
export type CorpusTarget = SyndicatedArticle | Collection;

/** Input for creating a new User-highlighted passage on a SavedItem. */
export type CreateHighlightByUrlInput = {
  /**
   * Optionally, a client-generated UUID to identify the highlight.
   * If one is not passed, it will be created. Must be in UUID format,
   * or will fail generation. Will not overwrite existing data if there
   * is an ID collision.
   */
  id?: Maybe<Scalars['String']>;
  /**
   * The full text of the highlighted passage. Used as a fallback for
   * rendering highlight if the patch fails.
   */
  quote: Scalars['String'];
  /**
   * Patch string generated by 'DiffMatchPatch' library, serialized
   * into text via `patch_toText` method.
   * Format is similar to UniDiff but is character-based.
   * The patched text depends on version. For example, the version 2
   * patch surrounds the highlighted text portion with a pair of
   * sentinel tags: '<pkt_tag_annotation></pkt_tag_annotation>'
   * Reference: https://github.com/google/diff-match-patch
   */
  patch: Scalars['String'];
  /** Annotation data version */
  version: Scalars['Int'];
  /** The url of the Item that should be annotated in the User's list */
  url: Scalars['ValidUrl'];
  /** Optional note generated by User */
  note?: Maybe<Scalars['String']>;
};

/** Input for creating a new User-highlighted passage on a SavedItem. */
export type CreateHighlightInput = {
  /**
   * Optionally, a client-generated UUID to identify the highlight.
   * If one is not passed, it will be created. Must be in UUID format,
   * or will fail generation. Will not overwrite existing data if there
   * is an ID collision.
   */
  id?: Maybe<Scalars['String']>;
  /**
   * The full text of the highlighted passage. Used as a fallback for
   * rendering highlight if the patch fails.
   */
  quote: Scalars['String'];
  /**
   * Patch string generated by 'DiffMatchPatch' library, serialized
   * into text via `patch_toText` method.
   * Format is similar to UniDiff but is character-based.
   * The patched text depends on version. For example, the version 2
   * patch surrounds the highlighted text portion with a pair of
   * sentinel tags: '<pkt_tag_annotation></pkt_tag_annotation>'
   * Reference: https://github.com/google/diff-match-patch
   */
  patch: Scalars['String'];
  /** Annotation data version */
  version: Scalars['Int'];
  /** The ID of the Item that should be annotated in the User's list */
  itemId: Scalars['ID'];
  /** Optional note generated by User */
  note?: Maybe<Scalars['String']>;
};

/** Input to create a new Note */
export type CreateNoteInput = {
  /** Optional title for this Note */
  title?: Maybe<Scalars['String']>;
  /**
   * Client-provided UUID for the new Note.
   * If not provided, will be generated on the server.
   */
  id?: Maybe<Scalars['ID']>;
  /** Optional URL to link this Note to. */
  source?: Maybe<Scalars['ValidUrl']>;
  /** JSON representation of a ProseMirror document */
  docContent: Scalars['ProseMirrorJson'];
  /**
   * When this note was created. If not provided, defaults to server time upon
   * receiving request.
   */
  createdAt?: Maybe<Scalars['ISOString']>;
};

/**
 * Input to create a new Note with markdown-formatted
 * content string.
 */
export type CreateNoteMarkdownInput = {
  /** Optional title for this Note */
  title?: Maybe<Scalars['String']>;
  /**
   * Client-provided UUID for the new Note.
   * If not provided, will be generated on the server.
   */
  id?: Maybe<Scalars['ID']>;
  /** Optional URL to link this Note to. */
  source?: Maybe<Scalars['ValidUrl']>;
  /** The document content in Commonmark Markdown. */
  docMarkdown: Scalars['Markdown'];
  /**
   * When this note was created. If not provided, defaults to server time upon
   * receiving request.
   */
  createdAt?: Maybe<Scalars['ISOString']>;
};

/** Input data for creating a Shareable List. */
export type CreateShareableListInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  listItemNoteVisibility?: Maybe<ShareableListVisibility>;
};

/** Input data for creating a Shareable List Item. */
export type CreateShareableListItemInput = {
  listExternalId: Scalars['ID'];
  itemId: Scalars['ID'];
  url: Scalars['Url'];
  title?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['Url']>;
  publisher?: Maybe<Scalars['String']>;
  authors?: Maybe<Scalars['String']>;
  sortOrder: Scalars['Int'];
};

/** Input data for creating a Shareable List Item during Shareable List creation. */
export type CreateShareableListItemWithList = {
  itemId: Scalars['ID'];
  url: Scalars['Url'];
  title?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['Url']>;
  publisher?: Maybe<Scalars['String']>;
  authors?: Maybe<Scalars['String']>;
  sortOrder: Scalars['Int'];
};

/** This type represents the information we need on a curated item. */
export type CuratedInfo = {
  __typename?: 'CuratedInfo';
  title?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  imageSrc?: Maybe<Scalars['Url']>;
  /** The image for this item's accompanying picture. */
  image?: Maybe<Image>;
};

export type CurationCategory = {
  __typename?: 'CurationCategory';
  externalId: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

/**
 * Filter to get documents added/published before or after a date,
 * or provide both for a range of [after, before)
 * Before is exclusive, after is inclusive.
 */
export type DateFilter = {
  /** Exclusive date -- results must be exclusively before this time. */
  before?: Maybe<Scalars['ISOString']>;
  /** Inclusive date -- results must be at or after than this time. */
  after?: Maybe<Scalars['ISOString']>;
};

export type DeleteNoteInput = {
  /** The ID of the note to delete */
  id: Scalars['ID'];
  /**
   * When the note was deleted was made. If not provided, defaults to
   * the server time upon receiving request.
   */
  deletedAt?: Maybe<Scalars['ISOString']>;
};

export type DeleteSavedItemTagsInput = {
  /** The id of the SavedItem from which to delete a Tag association */
  savedItemId: Scalars['ID'];
  /** The ids of the Tag to disassociate from the SavedItem */
  tagIds: Array<Scalars['ID']>;
};

/** Metadata from a domain, originally populated from ClearBit */
export type DomainMetadata = {
  __typename?: 'DomainMetadata';
  /** The name of the domain (e.g., The New York Times) */
  name?: Maybe<Scalars['String']>;
  /** Url for the logo image */
  logo?: Maybe<Scalars['Url']>;
  /** Url for the greyscale logo image */
  logoGreyscale?: Maybe<Scalars['Url']>;
};

/** Input for editing the content of a Note (user-generated) */
export type EditNoteContentInput = {
  /** The ID of the note to edit */
  noteId: Scalars['ID'];
  /** JSON representation of a ProseMirror document */
  docContent: Scalars['ProseMirrorJson'];
  /** The time this update was made (defaults to server time) */
  updatedAt?: Maybe<Scalars['ISOString']>;
};

/**
 * Input for editing the content of a Note (user-generated),
 * providing the content as a Markdown-formatted string.
 */
export type EditNoteContentMarkdownInput = {
  /** The ID of the note to edit */
  noteId: Scalars['ID'];
  /** Commonmark Markdown string representing the document content. */
  docMarkdown: Scalars['Markdown'];
  /** The time this update was made (defaults to server time) */
  updatedAt?: Maybe<Scalars['ISOString']>;
};

export type EditNoteTitleInput = {
  /** The ID of the note to edit */
  id: Scalars['ID'];
  /**
   * The new title for the note. If null, sets the title
   * field to null (deletes it).
   */
  title?: Maybe<Scalars['String']>;
  /**
   * When the update was made. If not provided, defaults to the server
   * time upon receiving request.
   */
  updatedAt?: Maybe<Scalars['ISOString']>;
};

/** The reason a user web session is being expired. */
export enum ExpireUserWebSessionReason {
  /** Expire web session on account password change. */
  PasswordChanged = 'PASSWORD_CHANGED',
  /** Expire web session upon logging out. */
  Logout = 'LOGOUT',
}

export type ExportAcknowledgment = {
  __typename?: 'ExportAcknowledgment';
  requestId: Scalars['String'];
};

export type ExportDisabled = {
  __typename?: 'ExportDisabled';
  message: Scalars['String'];
};

export type ExportResponse = ExportAcknowledgment | ExportDisabled;

/** Input field to boost the score of an elasticsearch document based on a specific field and value */
export type FunctionalBoostField = {
  /** Field to evaluate for boosting */
  field: Scalars['String'];
  /** Field value to evaluate */
  value: Scalars['FunctionalBoostValue'];
  /** A float number to boost the score by */
  factor: Scalars['Float'];
  /** The mathematical operation to use for boosting */
  operation: SearchFunctionalBoostOperation;
};

/** A User-highlighted passage on a SavedItem */
export type Highlight = {
  __typename?: 'Highlight';
  /** The ID for this Highlight annotation */
  id: Scalars['ID'];
  /**
   * The full text of the highlighted passage. Used as a fallback for
   * rendering highlight if the patch fails.
   */
  quote: Scalars['String'];
  /**
   * Patch string generated by 'DiffMatchPatch' library, serialized
   * into text via `patch_toText` method. Use `patch_fromText` to
   * deserialize into an object that can be used by the DiffMatchPatch
   * library. Format is similar to UniDiff but is character-based.
   * The patched text depends on version. For example, the version 2
   * patch surrounds the highlighted text portion with a pair of
   * sentinel tags: '<pkt_tag_annotation></pkt_tag_annotation>'
   * Reference: https://github.com/google/diff-match-patch
   */
  patch: Scalars['String'];
  /** Version number for highlight data specification */
  version: Scalars['Int'];
  /** When the Highlight was created */
  _createdAt: Scalars['Timestamp'];
  /** When the highlight was last updated */
  _updatedAt: Scalars['Timestamp'];
  /** Highlight Note associated with this Highlight */
  note?: Maybe<HighlightNote>;
};

export type HighlightNote = {
  __typename?: 'HighlightNote';
  /** User entered text */
  text: Scalars['String'];
  /** When the HighlightNote was created */
  _createdAt: Scalars['Timestamp'];
  /** When the HighlightNote was last updated */
  _updatedAt: Scalars['Timestamp'];
};

/** Interactive Advertising Bureau Category - these are used on clients to serve relevant ads */
export type IabCategory = {
  __typename?: 'IABCategory';
  externalId: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

/**
 * Represents IAB metadata for a Section.
 * Used by both admin input/output and public output.
 */
export type IabMetadata = {
  __typename?: 'IABMetadata';
  taxonomy: Scalars['String'];
  categories: Array<Scalars['String']>;
};

export type IabParentCategory = {
  __typename?: 'IABParentCategory';
  externalId: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  children: Array<IabCategory>;
};

/** An image that is keyed on URL */
export type Image = {
  __typename?: 'Image';
  /** The url of the image */
  url: Scalars['Url'];
  /** The determined width of the image at the url */
  width?: Maybe<Scalars['Int']>;
  /** The determined height of the image at the url */
  height?: Maybe<Scalars['Int']>;
  /**
   * Query to get a cached and modified set of images based on the image from the
   * original url, images will be matched by the client assigned id value
   */
  cachedImages?: Maybe<Array<Maybe<CachedImage>>>;
  /** A caption or description of the image */
  caption?: Maybe<Scalars['String']>;
  /** A credit for the image, typically who the image belongs to / created by */
  credit?: Maybe<Scalars['String']>;
  /**
   * The id for placing within an Article View. Item.article will have placeholders
   * of <div id='RIL_IMG_X' /> where X is this id. Apps can download those images
   * as needed and populate them in their article view.
   */
  imageId: Scalars['Int'];
  /**
   * Absolute url to the image
   * @deprecated use url property moving forward
   */
  src: Scalars['String'];
  /** If the image is also a link, the destination url */
  targetUrl?: Maybe<Scalars['String']>;
};

/** An image that is keyed on URL */
export type ImageCachedImagesArgs = {
  imageOptions: Array<CachedImageInput>;
};

/** The image file type */
export enum ImageFileType {
  Webp = 'WEBP',
  Jpeg = 'JPEG',
  Png = 'PNG',
}

export enum Imageness {
  /** No images (v3 value is 0) */
  NoImages = 'NO_IMAGES',
  /** Contains images (v3 value is 1) */
  HasImages = 'HAS_IMAGES',
  /** Is an image (v3 value is 2) */
  IsImage = 'IS_IMAGE',
}

export enum ImportableStatus {
  Archived = 'ARCHIVED',
  Unread = 'UNREAD',
}

export type ImportLimited = {
  __typename?: 'ImportLimited';
  message: Scalars['String'];
  refreshInHours: Scalars['Int'];
};

/** Services we support file upload imports from. */
export enum ImportType {
  Omnivore = 'omnivore',
}

export type ImportUploadResponse = PreSignedUrl | ImportLimited;

/**
 * The heart of Pocket
 * A url and meta data related to it.
 */
export type Item = {
  __typename?: 'Item';
  /** key field to identify the Item entity in the Parser service */
  givenUrl: Scalars['Url'];
  /** If the item is a collection allow them to get the collection information */
  collection?: Maybe<Collection>;
  /** If the givenUrl redirects (once or many times), this is the final url. Otherwise, same as givenUrl */
  resolvedUrl?: Maybe<Scalars['Url']>;
  /** If the item is in corpus allow the item to reference it.  Exposing curated info for consistent UX */
  corpusItem?: Maybe<CorpusItem>;
  /**
   * The Item entity is owned by the Parser service.
   * We only extend it in this service to make this service's schema valid.
   * The key for this entity is the 'itemId'
   */
  itemId: Scalars['String'];
  /** Helper property to identify if the given item is in the user's list */
  savedItem?: Maybe<SavedItem>;
  /** A server generated unique id for this item based on itemId */
  id: Scalars['ID'];
  /** A server generated unique reader slug for this item based on itemId */
  readerSlug: Scalars['String'];
  /**
   * A normalized value of the givenUrl.
   * It will look like a url but is not guaranteed to be a valid url, just a unique
   * string that is used to eliminate common duplicates.
   * Item's that share a normal_url should be considered the same item. For example
   * https://getpocket.com and http://getpocket.com will be considered the same
   * since they both normalize to http://getpocket.com
   * This is technically the true identity of an item, since this is what the backend uses to tell if two items are the same.
   * However, for the clients to use this, they would all have to ship an
   * implementation of the normalization function that the backend has exactly.
   * And even if it did that, some items, some of the earliest saves, use a legacy
   * normalize function and the client would have no way to know when to use which
   * normalizing function.
   */
  normalUrl: Scalars['String'];
  /** If available, the url to an AMP version of this article */
  ampUrl?: Maybe<Scalars['Url']>;
  /**
   * Provides short url for the given_url in the format: https://pocket.co/<identifier>.
   * marked as beta because it's not ready yet for large client request.
   */
  shortUrl?: Maybe<Scalars['Url']>;
  /** List of Authors involved with this article */
  authors?: Maybe<Array<Maybe<Author>>>;
  /** The domain, such as 'getpocket.com' of the resolved_url */
  domain?: Maybe<Scalars['String']>;
  /** Additional information about the item domain, when present, use this for displaying the domain name */
  domainMetadata?: Maybe<DomainMetadata>;
  /** The string encoding code of this item's web page */
  encoding?: Maybe<Scalars['String']>;
  /** A snippet of text from the article */
  excerpt?: Maybe<Scalars['String']>;
  /** 0=no images, 1=contains images, 2=is an image */
  hasImage?: Maybe<Imageness>;
  /** 0=no videos, 1=contains video, 2=is a video */
  hasVideo?: Maybe<Videoness>;
  /** Array of images within an article */
  images?: Maybe<Array<Maybe<Image>>>;
  /** true if the item is an article */
  isArticle?: Maybe<Scalars['Boolean']>;
  /** true if the item is an index / home page, rather than a specific single piece of content */
  isIndex?: Maybe<Scalars['Boolean']>;
  /** The mime type of this item's web page */
  mimeType?: Maybe<Scalars['String']>;
  /** The item id of the resolved_url */
  resolvedId?: Maybe<Scalars['String']>;
  /** The title as determined by the parser. */
  title?: Maybe<Scalars['String']>;
  /**
   * The page's / publisher's preferred thumbnail image
   * @deprecated use the topImage object
   */
  topImageUrl?: Maybe<Scalars['Url']>;
  /** The page's / publisher's preferred thumbnail image */
  topImage?: Maybe<Image>;
  /** Array of videos within the item If the item is a video, this will likely just contain one video */
  videos?: Maybe<Array<Maybe<Video>>>;
  /** Number of words in the article */
  wordCount?: Maybe<Scalars['Int']>;
  /** The date the parser resolved this item */
  dateResolved?: Maybe<Scalars['DateString']>;
  /** The date the article was published */
  datePublished?: Maybe<Scalars['DateString']>;
  /** The detected language of the article */
  language?: Maybe<Scalars['String']>;
  /** How long it will take to read the article (TODO in what time unit? and by what calculation?) */
  timeToRead?: Maybe<Scalars['Int']>;
  /** Estimated time to listen to the article, in seconds */
  listenDuration?: Maybe<Scalars['Int']>;
  /**
   * Indicates that the item was stored via a different search_hash (using the old
   * method), we'll need to look up a different id
   * @deprecated Most new items use a new hash
   */
  hasOldDupes?: Maybe<Scalars['Boolean']>;
  /**
   * The primary database id of the domain this article is from
   * @deprecated Use a domain as the identifier instead
   */
  domainId?: Maybe<Scalars['String']>;
  /**
   * If a the domainId is a subdomain this is the primary domain id
   * @deprecated Use a domain as the identifier instead
   */
  originDomainId?: Maybe<Scalars['String']>;
  /**
   * The http response code of the given url
   * @deprecated Clients should not use this
   */
  responseCode?: Maybe<Scalars['Int']>;
  /**
   * The length in bytes of the content
   * @deprecated Clients should not use this
   */
  contentLength?: Maybe<Scalars['Int']>;
  /**
   * Indicates if the text of the url is a redirect to another url
   * @deprecated Clients should not use this
   */
  innerDomainRedirect?: Maybe<Scalars['Boolean']>;
  /**
   * Indicates if the url requires a login
   * @deprecated Clients should not use this
   */
  loginRequired?: Maybe<Scalars['Boolean']>;
  /**
   * Indicates if the parser used fallback methods
   * @deprecated Clients should not use this
   */
  usedFallback?: Maybe<Scalars['Int']>;
  /**
   * Date this item was first parsed in Pocket
   * @deprecated Clients should not use this
   */
  timeFirstParsed?: Maybe<Scalars['DateString']>;
  /**
   * The resolved url, but ran through the normalized function
   * @deprecated Use the resolved url instead
   */
  resolvedNormalUrl?: Maybe<Scalars['Url']>;
  /**
   * The pocket HTML string of the article.
   * Note: Web and Android as of 3/4/2022 use the Article field, any improvements made
   * within MArticle for parsing will not be reflected in the article field.
   * When that happens, the clients will work to move to MArticle.
   */
  article?: Maybe<Scalars['String']>;
  /** If the url is an Article, the text in SSML format for speaking, i.e. Listen */
  ssml?: Maybe<Scalars['String']>;
  /** The Marticle format of the article, used by clients for native article view. */
  marticle?: Maybe<Array<MarticleComponent>>;
  /**
   * The client preview/display logic for this url. The requires for each object
   * should be kept in sync with the sub objects requires field.
   */
  preview?: Maybe<PocketMetadata>;
  /** If the item has a syndicated counterpart the syndication information */
  syndicatedArticle?: Maybe<SyndicatedArticle>;
  /** Recommend similar articles to show in the bottom of an article. */
  relatedAfterArticle: Array<CorpusRecommendation>;
  /** Recommend similar articles after saving. */
  relatedAfterCreate: Array<CorpusRecommendation>;
  /** Keyword highlights from search */
  highlights?: Maybe<ItemHighlights>;
};

/**
 * The heart of Pocket
 * A url and meta data related to it.
 */
export type ItemRelatedAfterArticleArgs = {
  count?: Maybe<Scalars['Int']>;
};

/**
 * The heart of Pocket
 * A url and meta data related to it.
 */
export type ItemRelatedAfterCreateArgs = {
  count?: Maybe<Scalars['Int']>;
};

/** Elasticsearch highlights */
export type ItemHighlights = {
  __typename?: 'ItemHighlights';
  full_text?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ItemNotFound = {
  __typename?: 'ItemNotFound';
  message?: Maybe<Scalars['String']>;
};

/** Union type for items that may or may not be processed */
export type ItemResult = PendingItem | Item;

export type ItemSummary = PocketMetadata & {
  __typename?: 'ItemSummary';
  id: Scalars['ID'];
  image?: Maybe<Image>;
  excerpt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authors?: Maybe<Array<Author>>;
  domain?: Maybe<DomainMetadata>;
  datePublished?: Maybe<Scalars['ISOString']>;
  url: Scalars['Url'];
  source: PocketMetadataSource;
  item?: Maybe<Item>;
};

/** A label used to mark and categorize an Entity (e.g. Collection). */
export type Label = {
  __typename?: 'Label';
  externalId: Scalars['ID'];
  name: Scalars['String'];
};

/** Web link */
export type Link = {
  __typename?: 'Link';
  /** The URL to send the user to when clicking on the link. */
  url: Scalars['Url'];
  /** The link text displayed to the user. */
  text: Scalars['String'];
};

export type ListElement = {
  /** Row in a list. */
  content: Scalars['Markdown'];
  /** Zero-indexed level, for handling nested lists. */
  level: Scalars['Int'];
};

/** The Connection type for ListItem */
export type ListItemConnection = {
  __typename?: 'ListItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ListItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of SavedItems in the connection. */
  totalCount: Scalars['Int'];
};

/** An Edge in a Connection */
export type ListItemEdge = {
  __typename?: 'ListItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The ListItem at the end of the edge. */
  node: ShareableListItem;
};

export type MarkdownImagePosition = {
  __typename?: 'MarkdownImagePosition';
  index: Scalars['Int'];
  position: Scalars['Int'];
  /** Fallback is to use the images field in the Item entity */
  src?: Maybe<Scalars['String']>;
};

/** Content of a blockquote */
export type MarticleBlockquote = {
  __typename?: 'MarticleBlockquote';
  /** Markdown text content. */
  content: Scalars['Markdown'];
};

/** Content in a bulleted (unordered) list. */
export type MarticleBulletedList = {
  __typename?: 'MarticleBulletedList';
  rows: Array<BulletedListElement>;
};

/** A pre formatted text in the HTML content. */
export type MarticleCodeBlock = {
  __typename?: 'MarticleCodeBlock';
  /** Content of a pre tag */
  text: Scalars['String'];
  /** Assuming the codeblock was a programming language, this field is used to identify it. */
  language?: Maybe<Scalars['Int']>;
};

export type MarticleComponent =
  | MarticleText
  | Image
  | MarticleDivider
  | MarticleTable
  | MarticleHeading
  | MarticleCodeBlock
  | Video
  | MarticleBulletedList
  | MarticleNumberedList
  | MarticleBlockquote
  | UnMarseable;

export type MarticleDivider = {
  __typename?: 'MarticleDivider';
  /** Always '---'; provided for convenience if building a markdown string */
  content: Scalars['Markdown'];
};

/** A heading in an article, with markdown formatting. */
export type MarticleHeading = {
  __typename?: 'MarticleHeading';
  /** Heading text, in markdown. */
  content: Scalars['Markdown'];
  /** Heading level. Restricted to values 1-6. */
  level: Scalars['Int'];
};

/** Content in a bulleted (unordered) list. */
export type MarticleNumberedList = {
  __typename?: 'MarticleNumberedList';
  rows: Array<NumberedListElement>;
};

/** Content in a table. */
export type MarticleTable = {
  __typename?: 'MarticleTable';
  /** Raw HTML representation of the table. */
  html: Scalars['String'];
};

/**
 * A section of the article's text content, in markdown.
 * A subset of gfm is supported. See README.md for more information.
 */
export type MarticleText = {
  __typename?: 'MarticleText';
  /** Markdown text content. Typically, a paragraph. */
  content: Scalars['Markdown'];
};

/** Default Mutation Type */
export type Mutation = {
  __typename?: 'Mutation';
  /** Create new highlight annotation(s). Returns the data for the created Highlight object(s). */
  createSavedItemHighlights: Array<Highlight>;
  /** Create new highlight annotation(s). Returns the data for the created Highlight object. */
  createHighlightByUrl: Highlight;
  /** Create new highlight note. Returns the data for the created Highlight note. */
  createSavedItemHighlightNote?: Maybe<HighlightNote>;
  /**
   * Update an existing highlight annotation, by its ID.
   * If the given highlight ID does not exist, will return error data
   * and the highlight will not be created.
   * Note that if an ID is passed to the optional ID field in CreateHighlightInput,
   * it will be ignored, as this mutation does not allow updating the ID.
   * @deprecated use updateHighlight
   */
  updateSavedItemHighlight: Highlight;
  /**
   * Update an existing highlight annotation, by its ID.
   * If the given highlight ID does not exist, will return error data
   * and the highlight will not be created.
   */
  updateHighlight: Highlight;
  /**
   * Update an existing highlight note, by its ID.
   * If the given highlight ID does not exist, will return error data
   * and the note will not be updated.
   */
  updateSavedItemHighlightNote?: Maybe<HighlightNote>;
  /** Delete a highlight by its ID. */
  deleteSavedItemHighlight: Scalars['ID'];
  /** Delete a highlight note by the Highlight ID. */
  deleteSavedItemHighlightNote: Scalars['ID'];
  /**
   * Make requests to create and delete highlights in a single batch.
   * Mutation is atomic -- if there is a response, all operations were successful.
   */
  batchWriteHighlights: BatchWriteHighlightsResult;
  /**
   * Updates a SavedItem, undeletes and unarchives it, bringing it to the top of the user's list, if it exists
   * and creates it if it doesn't.
   */
  upsertSavedItem: SavedItem;
  /** Archives a SavedItem */
  updateSavedItemArchive: SavedItem;
  /** Unarchives a SavedItem */
  updateSavedItemUnArchive: SavedItem;
  /** Undo the delete operation for a SavedItem */
  updateSavedItemUnDelete: SavedItem;
  /** Favorites a SavedItem */
  updateSavedItemFavorite: SavedItem;
  /** Unfavorites a SavedItem */
  updateSavedItemUnFavorite: SavedItem;
  /**
   * Update the title display of a Saved Item, retrieved by ID.
   * This is user-save specific (does not update the metadata saved by the parser).
   * Clients should ensure the input fits in the utf8mb3 character set (BMP only,
   * which means no emoji) to avoid being rejected by the database.
   * In the future this will be more permissive.
   */
  updateSavedItemTitle?: Maybe<SavedItem>;
  /**
   * Set the Tags that are associated with a SavedItem.
   * Will replace any existing Tag associations on the SavedItem.
   * To remove all Tags from a SavedItem, use `updateSavedItemRemoveTags`.
   * @deprecated use saveBatchUpdateTags
   */
  updateSavedItemTags: SavedItem;
  /**
   * Removes all Tag associations from a SavedItem. Returns the
   * SavedItem that had its Tag associations cleared.
   * Note that if this operation results in a Tag having no associations
   * to a SavedItem, the Tag object will be deleted.
   * @deprecated use saveBatchUpdateTags
   */
  updateSavedItemRemoveTags: SavedItem;
  /**
   * Deletes a SavedItem from the users list. Returns ID of the
   * deleted SavedItem
   */
  deleteSavedItem: Scalars['ID'];
  /**
   * Updates a Tag (renames the tag), and returns the updated Tag.
   * If a Tag with the updated name already exists in the database, will
   * associate that Tag to all relevant SavedItems rather than creating
   * a duplicate Tag object.
   */
  updateTag: Tag;
  /**
   * Deletes a Tag object. This is deletes the Tag and all SavedItem associations
   * (removes the Tag from all SavedItems). Returns ID of the deleted Tag.
   */
  deleteTag: Scalars['ID'];
  /**
   * Delete one or more tags from one or more SavedItems.
   * Note that if this operation results in a Tag having no associations
   * to a SavedItem, the Tag object will be deleted.
   */
  deleteSavedItemTags: Array<SavedItem>;
  /**
   * Add tags to the savedItems
   * Inputs a list of SavedItemTagsInput(ie. savedItemId and the list of tagName)
   * Returns the list of `SavedItem` for which the tags were added
   */
  createSavedItemTags: Array<SavedItem>;
  /**
   * Replaces the old tags associated with the savedItem to the new tag list
   * given in the entry
   * To remove all Tags from a SavedItem, use `updateSavedItemRemoveTags`.
   * Note: if there is a new tag name in the SavedItemTagsInput, then the tag record will be created
   * Inputs a list of SavedItemTagsInput(ie. savedItemId and list of tag names)
   * Returns the SavedItem for which the tags have been modified.
   * @deprecated use saveBatchUpdateTags
   */
  replaceSavedItemTags: Array<SavedItem>;
  /** Archives PocketSaves */
  saveArchive?: Maybe<SaveWriteMutationPayload>;
  /** Unarchives PocketSaves */
  saveUnArchive?: Maybe<SaveWriteMutationPayload>;
  /**
   * Favorites PocketSaves
   * Accepts a list of PocketSave Ids that we want to favorite.
   */
  saveFavorite?: Maybe<SaveWriteMutationPayload>;
  /**
   * Unfavorites PocketSaves
   * Accepts a list of PocketSave Ids that we want to unfavorite.
   */
  saveUnFavorite?: Maybe<SaveWriteMutationPayload>;
  /**
   * Batch update the Tags associated with a Save
   * by adding new tags and deleting existing tags.
   * Maximum of 150 operations (adds/deletes) per request.
   */
  saveBatchUpdateTags: SaveWriteMutationPayload;
  /**
   * Creates a new Save; if the Save already exists (either in List or Archive), "re-add" it.
   * "Re-adding" unarchives and undeletes the Save as applicable, and refreshes the "createdAt"
   * timestamp.
   */
  saveUpsert: SaveWriteMutationPayload;
  /** Associate Tag(s) with a Save */
  savedItemTag?: Maybe<SavedItem>;
  /** Archive a SavedItem (identified by URL) */
  savedItemArchive?: Maybe<SavedItem>;
  /** Unarchive a SavedItem (identified by URL) */
  savedItemUnArchive?: Maybe<SavedItem>;
  /** Favorite a SavedItem (identified by URL) */
  savedItemFavorite?: Maybe<SavedItem>;
  /** 'Unfavorite' a 'favorite' SavedItem (identified by URL) */
  savedItemUnFavorite?: Maybe<SavedItem>;
  /** 'Soft-delete' a SavedItem (identified by URL) */
  savedItemDelete?: Maybe<Scalars['Url']>;
  /**
   * Undo the 'soft-delete' operation on a SavedItem (identified by URL).
   * Does not restore tags. Does not restore SavedItems that have been
   * 'hard-deleted' (record removed from the database entirely).
   */
  savedItemUnDelete?: Maybe<SavedItem>;
  /**
   * Update the title display of a Saved Item, retrieved by URL.
   * This is user-save specific (does not update the metadata saved by the parser)
   * Clients should ensure the input fits in the utf8mb3 character set (BMP only,
   * which means no emoji) to avoid being rejected by the database.
   * In the future this will be more permissive.
   */
  savedItemUpdateTitle?: Maybe<SavedItem>;
  /** Remove all tags associated to a SavedItem (included for v3 proxy). */
  clearTags?: Maybe<SavedItem>;
  /** Rename a tag identified by name (rather than ID), to support v3 proxy. */
  renameTagByName?: Maybe<Tag>;
  /**
   * Delete a tag entity identified by name (rather than ID), to support v3 proxy.
   * Disassociates this tag from all SavedItems.
   */
  deleteTagByName?: Maybe<Scalars['String']>;
  /**
   * Removes specific tags associated to a SavedItem,
   * referenced by name, to support v3 proxy.
   */
  removeTagsByName?: Maybe<SavedItem>;
  /** Replace specific tags associated to a SavedItem, to support v3 proxy. */
  replaceTags?: Maybe<SavedItem>;
  /**
   * 'Re-add' a SavedItem by id. Unarchives and undeletes the SavedItem
   * as applicable, and refreshes the "createdAt" timestamp.
   */
  reAddById?: Maybe<SavedItem>;
  /**
   * Request for an asynchronous export of a user's list.
   * Returns the request ID associated with the request.
   * @deprecated use exportData
   */
  exportList?: Maybe<Scalars['String']>;
  /**
   * Request data for export. Returns an acknowledgment with the
   * request ID, or an error message (if the export service is
   * temporarily disabled for maintenance)
   */
  exportData?: Maybe<ExportResponse>;
  /**
   * Get a presigned URL to upload an export from another service
   * to S3, to be imported into Pocket.
   */
  importUploadUrl?: Maybe<ImportUploadResponse>;
  /** Create a new note, optionally with title and content */
  createNote: Note;
  /** Create a new note, optionally with title and markdown content */
  createNoteMarkdown: Note;
  /**
   * Edit the title of a Note.
   * If the Note does not exist or is inaccessible for the current user,
   * response will be null and a NOT_FOUND error will be included in the
   * errors array.
   */
  editNoteTitle?: Maybe<Note>;
  /**
   * Edit the content of a Note.
   * If the Note does not exist or is inaccessible for the current user,
   * response will be null and a NOT_FOUND error will be included in the
   * errors array.
   */
  editNoteContent?: Maybe<Note>;
  /**
   * Edit the content of a Note, providing a markdown document instead
   * of a Prosemirror JSON.
   * If the Note does not exist or is inaccessible for the current user,
   * response will be null and a NOT_FOUND error will be included in the
   * errors array.
   */
  editNoteContentMarkdown?: Maybe<Note>;
  /**
   * Delete a note and all attachments. Returns True if the note was successfully
   * deleted. If the note cannot be deleted or does not exist, returns False.
   * Errors will be included in the errors array if applicable.
   */
  deleteNote: Scalars['ID'];
  /**
   * Archive a note.
   * If the Note does not exist or is inaccessible for the current user,
   * response will be null and a NOT_FOUND error will be included in the
   * errors array.
   */
  archiveNote?: Maybe<Note>;
  /**
   * Unarchive a note.
   * If the Note does not exist or is inaccessible for the current user,
   * response will be null and a NOT_FOUND error will be included in the
   * errors array.
   */
  unArchiveNote?: Maybe<Note>;
  /** Refresh an Item's article content. */
  refreshItemArticle: Item;
  /** Updates user preferences for content recommendations across Pocket. */
  updateUserRecommendationPreferences: UserRecommendationPreferences;
  /**
   * Creates a Shareable List. Takes in an optional listItemData parameter to create a ShareableListItem
   * along with a ShareableList.
   */
  createShareableList?: Maybe<ShareableList>;
  /** Deletes a Shareable List. */
  deleteShareableList: ShareableList;
  /** Updates a Shareable List. Cannot make a list public. */
  updateShareableList: ShareableList;
  /** Creates a Shareable List Item. */
  createShareableListItem?: Maybe<ShareableListItem>;
  /** Updates a single Shareable List Item. */
  updateShareableListItem: ShareableListItem;
  /** Updates an array of Shareable List Items (sortOrder). */
  updateShareableListItems: Array<ShareableListItem>;
  /** Deletes a Shareable List Item. HIDDEN Lists cannot have their items deleted. */
  deleteShareableListItem: ShareableListItem;
  /** Add a batch of items to an existing shareable list. */
  addToShareableList: ShareableList;
  /** Add a batch of items to an existing shareable list. */
  createAndAddToShareableList?: Maybe<ShareableList>;
  /**
   * Create a Pocket Share for a provided target URL, optionally
   * with additional share context.
   */
  createShareLink?: Maybe<PocketShare>;
  /**
   * Attach share context to a Pocket Share. If a context already exists
   * on the Pocket Share, it will be overrwritten. Session ID via the `guid`
   * field on the JWT is used to determine ownership of a share.
   * That means users may only edit share links created in the same
   * session (intended to be a post-share add, not something returned to
   * later). It also lets us attribute ownership to anonymous/logged-out
   * users.
   * Null values in provided context will not overrwrite existing values
   * if there are any, but but empty values will (e.g. empty string, empty array).
   * Attempting to update a nonexistent share or a share that is not owned
   * by the session user will return ShareNotFound.
   */
  addShareContext?: Maybe<ShareResult>;
  /**
   * update the email of the user for the given pocket userId. Request is made by
   * an authenticated user, and the userID is inferred from the request headers `userid`.
   */
  updateUserEmail: User;
  /** Deletes user information and their pocket data for the given pocket userId. Returns pocket userId. */
  deleteUser: Scalars['ID'];
  /**
   * update the email of the user for the given firefox account ID. Request
   * is made by a backend service. The `userid` in the headers should match
   * the FxA ID or else an authentication error will be thrown.
   */
  updateUserEmailByFxaId: User;
  /**
   * Deletes user information and their pocket data for the given firefox account ID.
   * Returns firefox account ID sent as the query parameter with the request.
   */
  deleteUserByFxaId: Scalars['ID'];
  /**
   * temporary mutation for apple user migration.
   * called by fxa-webhook proxy to update the fxaId and email of the user.
   * Returns the pocket userId on success
   * Note: requires `transfersub` to be set in the header.
   */
  migrateAppleUser: Scalars['ID'];
  /**
   * Expires a user's web session tokens by firefox account ID.
   * Called by fxa-webhook proxy. Need to supply a reason why to expire user web session.
   * Returns the user ID.
   */
  expireUserWebSessionByFxaId: Scalars['ID'];
  /**
   * Save search to potentially appear in recentSearches response.
   * Requires premium account (otherwise will send ForbiddenError).
   */
  saveSearch?: Maybe<RecentSearch>;
};

/** Default Mutation Type */
export type MutationCreateSavedItemHighlightsArgs = {
  input: Array<CreateHighlightInput>;
};

/** Default Mutation Type */
export type MutationCreateHighlightByUrlArgs = {
  input: CreateHighlightByUrlInput;
};

/** Default Mutation Type */
export type MutationCreateSavedItemHighlightNoteArgs = {
  id: Scalars['ID'];
  input: Scalars['String'];
};

/** Default Mutation Type */
export type MutationUpdateSavedItemHighlightArgs = {
  id: Scalars['ID'];
  input: CreateHighlightInput;
};

/** Default Mutation Type */
export type MutationUpdateHighlightArgs = {
  id: Scalars['ID'];
  input: UpdateHighlightInput;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemHighlightNoteArgs = {
  id: Scalars['ID'];
  input: Scalars['String'];
};

/** Default Mutation Type */
export type MutationDeleteSavedItemHighlightArgs = {
  id: Scalars['ID'];
};

/** Default Mutation Type */
export type MutationDeleteSavedItemHighlightNoteArgs = {
  id: Scalars['ID'];
};

/** Default Mutation Type */
export type MutationBatchWriteHighlightsArgs = {
  input?: Maybe<BatchWriteHighlightsInput>;
};

/** Default Mutation Type */
export type MutationUpsertSavedItemArgs = {
  input: SavedItemUpsertInput;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemArchiveArgs = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemUnArchiveArgs = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemUnDeleteArgs = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemFavoriteArgs = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemUnFavoriteArgs = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemTitleArgs = {
  id: Scalars['ID'];
  timestamp: Scalars['ISOString'];
  title: Scalars['String'];
};

/** Default Mutation Type */
export type MutationUpdateSavedItemTagsArgs = {
  input: SavedItemTagUpdateInput;
};

/** Default Mutation Type */
export type MutationUpdateSavedItemRemoveTagsArgs = {
  savedItemId?: Maybe<Scalars['ID']>;
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationDeleteSavedItemArgs = {
  id: Scalars['ID'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationUpdateTagArgs = {
  input: TagUpdateInput;
};

/** Default Mutation Type */
export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};

/** Default Mutation Type */
export type MutationDeleteSavedItemTagsArgs = {
  input: Array<DeleteSavedItemTagsInput>;
};

/** Default Mutation Type */
export type MutationCreateSavedItemTagsArgs = {
  input: Array<SavedItemTagsInput>;
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationReplaceSavedItemTagsArgs = {
  input: Array<SavedItemTagsInput>;
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationSaveArchiveArgs = {
  id: Array<Scalars['ID']>;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSaveUnArchiveArgs = {
  id: Array<Scalars['ID']>;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSaveFavoriteArgs = {
  id: Array<Scalars['ID']>;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSaveUnFavoriteArgs = {
  id: Array<Scalars['ID']>;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSaveBatchUpdateTagsArgs = {
  input: Array<SaveUpdateTagsInput>;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSaveUpsertArgs = {
  input: Array<SaveUpsertInput>;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemTagArgs = {
  input: SavedItemTagInput;
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemArchiveArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemUnArchiveArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemFavoriteArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemUnFavoriteArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemDeleteArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemUnDeleteArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationSavedItemUpdateTitleArgs = {
  givenUrl: Scalars['Url'];
  timestamp: Scalars['ISOString'];
  title: Scalars['String'];
};

/** Default Mutation Type */
export type MutationClearTagsArgs = {
  savedItem: SavedItemRef;
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationRenameTagByNameArgs = {
  oldName: Scalars['String'];
  newName: Scalars['String'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationDeleteTagByNameArgs = {
  tagName: Scalars['String'];
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationRemoveTagsByNameArgs = {
  savedItem: SavedItemRef;
  tagNames: Array<Scalars['String']>;
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationReplaceTagsArgs = {
  savedItem: SavedItemRef;
  tagNames: Array<Scalars['String']>;
  timestamp?: Maybe<Scalars['ISOString']>;
};

/** Default Mutation Type */
export type MutationReAddByIdArgs = {
  id: Scalars['ID'];
  timestamp: Scalars['ISOString'];
};

/** Default Mutation Type */
export type MutationImportUploadUrlArgs = {
  importType: ImportType;
};

/** Default Mutation Type */
export type MutationCreateNoteArgs = {
  input: CreateNoteInput;
};

/** Default Mutation Type */
export type MutationCreateNoteMarkdownArgs = {
  input: CreateNoteMarkdownInput;
};

/** Default Mutation Type */
export type MutationEditNoteTitleArgs = {
  input: EditNoteTitleInput;
};

/** Default Mutation Type */
export type MutationEditNoteContentArgs = {
  input: EditNoteContentInput;
};

/** Default Mutation Type */
export type MutationEditNoteContentMarkdownArgs = {
  input: EditNoteContentMarkdownInput;
};

/** Default Mutation Type */
export type MutationDeleteNoteArgs = {
  input: DeleteNoteInput;
};

/** Default Mutation Type */
export type MutationArchiveNoteArgs = {
  input: ArchiveNoteInput;
};

/** Default Mutation Type */
export type MutationUnArchiveNoteArgs = {
  input: ArchiveNoteInput;
};

/** Default Mutation Type */
export type MutationRefreshItemArticleArgs = {
  url: Scalars['String'];
};

/** Default Mutation Type */
export type MutationUpdateUserRecommendationPreferencesArgs = {
  input: UpdateUserRecommendationPreferencesInput;
};

/** Default Mutation Type */
export type MutationCreateShareableListArgs = {
  listData: CreateShareableListInput;
  listItemData?: Maybe<CreateShareableListItemWithList>;
};

/** Default Mutation Type */
export type MutationDeleteShareableListArgs = {
  externalId: Scalars['ID'];
};

/** Default Mutation Type */
export type MutationUpdateShareableListArgs = {
  data: UpdateShareableListInput;
};

/** Default Mutation Type */
export type MutationCreateShareableListItemArgs = {
  data: CreateShareableListItemInput;
};

/** Default Mutation Type */
export type MutationUpdateShareableListItemArgs = {
  data: UpdateShareableListItemInput;
};

/** Default Mutation Type */
export type MutationUpdateShareableListItemsArgs = {
  data: Array<UpdateShareableListItemsInput>;
};

/** Default Mutation Type */
export type MutationDeleteShareableListItemArgs = {
  externalId: Scalars['ID'];
};

/** Default Mutation Type */
export type MutationAddToShareableListArgs = {
  listExternalId: Scalars['ID'];
  items: Array<AddItemInput>;
};

/** Default Mutation Type */
export type MutationCreateAndAddToShareableListArgs = {
  listData: CreateShareableListInput;
  itemData: Array<AddItemInput>;
};

/** Default Mutation Type */
export type MutationCreateShareLinkArgs = {
  target: Scalars['ValidUrl'];
  context?: Maybe<ShareContextInput>;
};

/** Default Mutation Type */
export type MutationAddShareContextArgs = {
  slug: Scalars['ID'];
  context: ShareContextInput;
};

/** Default Mutation Type */
export type MutationUpdateUserEmailArgs = {
  email: Scalars['String'];
};

/** Default Mutation Type */
export type MutationUpdateUserEmailByFxaIdArgs = {
  id: Scalars['ID'];
  email: Scalars['String'];
};

/** Default Mutation Type */
export type MutationDeleteUserByFxaIdArgs = {
  id: Scalars['ID'];
};

/** Default Mutation Type */
export type MutationMigrateAppleUserArgs = {
  fxaId: Scalars['ID'];
  email: Scalars['String'];
};

/** Default Mutation Type */
export type MutationExpireUserWebSessionByFxaIdArgs = {
  id: Scalars['ID'];
  reason: ExpireUserWebSessionReason;
};

/** Default Mutation Type */
export type MutationSaveSearchArgs = {
  search: RecentSearchInput;
};

/**
 * A Note is an entity which may contain extracted components
 * from websites (clippings/snippets), user-generated rich text content,
 * and may be linked to a source url.
 */
export type Note = {
  __typename?: 'Note';
  /** This Note's identifier */
  id: Scalars['ID'];
  /** Title of this note */
  title?: Maybe<Scalars['String']>;
  /**
   * JSON representation of a ProseMirror document
   * (compatible with Markdown)
   */
  docContent?: Maybe<Scalars['ProseMirrorJson']>;
  /** Markdown representation of the note content */
  docMarkdown?: Maybe<Scalars['Markdown']>;
  /** Markdown preview of the note content for summary view. */
  contentPreview?: Maybe<Scalars['Markdown']>;
  /** When this note was created */
  createdAt: Scalars['ISOString'];
  /** When this note was last updated */
  updatedAt: Scalars['ISOString'];
  /**
   * The SavedItem entity this note is attached to (either directly
   * or via a Clipping, if applicable)
   */
  savedItem?: Maybe<SavedItem>;
  /**
   * The URL this entity was created from (either directly or via
   * a Clipping, if applicable).
   */
  source?: Maybe<Scalars['ValidUrl']>;
  /** Whether this Note has been marked as archived (hide from default view). */
  archived: Scalars['Boolean'];
  /**
   * Whether this Note has been marked for deletion (will be eventually
   * removed from the server). Clients should delete Notes from their local
   * storage if this value is true.
   */
  deleted: Scalars['Boolean'];
};

/** The connection type for Note. */
export type NoteConnection = {
  __typename?: 'NoteConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<NoteEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of Notes in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type NoteEdge = {
  __typename?: 'NoteEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The Note at the end of the edge. */
  node?: Maybe<Note>;
};

/** Filter for retrieving Notes */
export type NoteFilterInput = {
  /**
   * Filter to show notes which are attached to a source URL
   * directly or via clipping, or are standalone
   * notes. If not provided, notes will not be filtered by source url.
   */
  isAttachedToSave?: Maybe<Scalars['Boolean']>;
  /**
   * Filter to retrieve Notes by archived status (true/false).
   * If not provided, notes will not be filtered by archived status.
   */
  archived?: Maybe<Scalars['Boolean']>;
  /** Filter to retrieve notes after a timestamp, e.g. for syncing. */
  since?: Maybe<Scalars['ISOString']>;
  /**
   * Filter to choose whether to include notes marked for server-side
   * deletion in the response (defaults to false).
   */
  excludeDeleted?: Maybe<Scalars['Boolean']>;
};

/** Enum to specify the sort by field (these are the current options, we could add more in the future) */
export enum NoteSortBy {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
}

/** Input to sort fetched Notes. If unspecified, defaults to UPDATED_AT, DESC. */
export type NoteSortInput = {
  /** The field by which to sort Notes */
  sortBy: NoteSortBy;
  /** The order in which to sort Notes */
  sortOrder: NoteSortOrder;
};

/** Possible values for sort ordering (ascending/descending) */
export enum NoteSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type NotFound = BaseError & {
  __typename?: 'NotFound';
  path: Scalars['String'];
  message: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type NumberedListElement = ListElement & {
  __typename?: 'NumberedListElement';
  /** Row in a list */
  content: Scalars['Markdown'];
  /** Zero-indexed level, for handling nested lists. */
  level: Scalars['Int'];
  /** Numeric index. If a nested item, the index is zero-indexed from the first child. */
  index: Scalars['Int'];
};

export type OEmbed = PocketMetadata & {
  __typename?: 'OEmbed';
  id: Scalars['ID'];
  image?: Maybe<Image>;
  excerpt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authors?: Maybe<Array<Author>>;
  domain?: Maybe<DomainMetadata>;
  datePublished?: Maybe<Scalars['ISOString']>;
  url: Scalars['Url'];
  source: PocketMetadataSource;
  item?: Maybe<Item>;
  htmlEmbed?: Maybe<Scalars['String']>;
  type?: Maybe<OEmbedType>;
};

export enum OEmbedType {
  Rich = 'RICH',
  Video = 'VIDEO',
  Photo = 'PHOTO',
  Link = 'LINK',
}

/** Input for offset-pagination (internal backend use only). */
export type OffsetPaginationInput = {
  /** Defaults to 0 */
  offset?: Maybe<Scalars['Int']>;
  /** Defaults to 30 */
  limit?: Maybe<Scalars['Int']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/**
 * Represents a type of page for /explore
 * Deprecated for SlateLineups
 */
export enum PageType {
  EditorialCollection = 'editorial_collection',
  TopicPage = 'topic_page',
}

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Int'];
  totalPages: Scalars['Int'];
  totalResults: Scalars['Int'];
  perPage: Scalars['Int'];
};

/**
 * Pagination request. To determine which edges to return, the connection
 * evaluates the `before` and `after` cursors (if given) to filter the
 * edges, then evaluates `first`/`last` to slice the edges (only include a
 * value for either `first` or `last`, not both). If all fields are null,
 * by default will return a page with the first 30 elements.
 */
export type PaginationInput = {
  /**
   * Returns the elements in the list that come after the specified cursor.
   * The specified cursor is not included in the result.
   */
  after?: Maybe<Scalars['String']>;
  /**
   * Returns the elements in the list that come before the specified cursor.
   * The specified cursor is not included in the result.
   */
  before?: Maybe<Scalars['String']>;
  /**
   * Returns the first _n_ elements from the list. Must be a non-negative integer.
   * If `first` contains a value, `last` should be null/omitted in the input.
   */
  first?: Maybe<Scalars['Int']>;
  /**
   * Returns the last _n_ elements from the list. Must be a non-negative integer.
   * If `last` contains a value, `first` should be null/omitted in the input.
   */
  last?: Maybe<Scalars['Int']>;
};

export type PendingItem = {
  __typename?: 'PendingItem';
  /**
   * URL of the item that the user gave for the SavedItem
   * that is pending processing by parser
   */
  itemId: Scalars['String'];
  url: Scalars['Url'];
  status?: Maybe<PendingItemStatus>;
};

export enum PendingItemStatus {
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED',
}

export type PocketMetadata = {
  id: Scalars['ID'];
  image?: Maybe<Image>;
  excerpt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authors?: Maybe<Array<Author>>;
  domain?: Maybe<DomainMetadata>;
  datePublished?: Maybe<Scalars['ISOString']>;
  url: Scalars['Url'];
  source: PocketMetadataSource;
  item?: Maybe<Item>;
};

export enum PocketMetadataSource {
  PocketParser = 'POCKET_PARSER',
  Opengraph = 'OPENGRAPH',
  Oembed = 'OEMBED',
  CuratedCorpus = 'CURATED_CORPUS',
  Collection = 'COLLECTION',
  Syndication = 'SYNDICATION',
}

/**
 * New Pocket Save Type, replacing SavedItem.
 *
 * Represents a Pocket Item that a user has saved to their list.
 * (Said otherways, indicates a saved url to a users list and associated user specific information.)
 */
export type PocketSave = {
  __typename?: 'PocketSave';
  /** Indicates if the PocketSave is archived. */
  archived: Scalars['Boolean'];
  /** Timestamp that the PocketSave became archived, null if not archived. */
  archivedAt?: Maybe<Scalars['ISOString']>;
  /** Unix timestamp of when the PocketSave was created. */
  createdAt: Scalars['ISOString'];
  /** Unix timestamp of when the entity was deleted. */
  deletedAt?: Maybe<Scalars['ISOString']>;
  /** Indicates if the PocketSave is favorited. */
  favorite: Scalars['Boolean'];
  /** Timestamp that the PocketSave became favorited, null if not favorited. */
  favoritedAt?: Maybe<Scalars['ISOString']>;
  /** The url the user gave (as opposed to normalized URLs). */
  givenUrl: Scalars['String'];
  /** Surrogate primary key. */
  id: Scalars['ID'];
  /** The status of this PocketSave; Marked for review for possible removal. */
  status?: Maybe<PocketSaveStatus>;
  /** The Suggested Tags associated with this PocketSave, if the user is not premium or there are none, this will be empty. */
  suggestedTags?: Maybe<Array<Tag>>;
  /** The Tags associated with this PocketSave. */
  tags?: Maybe<Array<Tag>>;
  /**
   * Link to the underlying Pocket Item for the URL.
   * Temporary until resource field is added. Will hopefully
   * make it easier for clients to adopt.
   * @deprecated use resource
   */
  item: ItemResult;
  /** The title of the Resource; defaults to the URL. */
  title: Scalars['String'];
  /**
   * Unix timestamp of when the PocketSave was last updated, if any property on the
   * PocketSave is modified this timestamp is set to the modified time.
   */
  updatedAt?: Maybe<Scalars['ISOString']>;
};

/** Enum to specify the PocketSave Status (mapped to integers in data store). */
export enum PocketSaveStatus {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Hidden = 'HIDDEN',
  Unread = 'UNREAD',
}

export type PocketShare = {
  __typename?: 'PocketShare';
  targetUrl: Scalars['ValidUrl'];
  preview?: Maybe<PocketMetadata>;
  slug: Scalars['ID'];
  shareUrl: Scalars['ValidUrl'];
  createdAt: Scalars['ISOString'];
  context?: Maybe<ShareContext>;
};

export enum PremiumFeature {
  /** Feature where pocket saves permanent copies of all your saves */
  PermanentLibrary = 'PERMANENT_LIBRARY',
  /** Feature where pocket suggests tags */
  SuggestedTags = 'SUGGESTED_TAGS',
  /** Feature where pocket's search is enhanced */
  PremiumSearch = 'PREMIUM_SEARCH',
  /** Feature where you can highlight articles */
  Annotations = 'ANNOTATIONS',
  /** Feature where you get an ad-free experience */
  AdFree = 'AD_FREE',
}

export enum PremiumStatus {
  /** User has never had premium */
  Never = 'NEVER',
  /**
   * User has premium and its active
   * NOTE: User will still show as active if they turn off auto-renew or have
   * otherwise canceled but the expiration date hasn't hit yet
   */
  Active = 'ACTIVE',
  /** User has had premium, but it is expired */
  Expired = 'EXPIRED',
}

/** A presigned URL for uploading to S3 */
export type PreSignedUrl = {
  __typename?: 'PreSignedUrl';
  /** The presigned URL */
  url: Scalars['Url'];
  /** Time until expiry in seconds after grant */
  ttl: Scalars['Int'];
};

/** The publisher that the curation team set for the syndicated article */
export type Publisher = {
  __typename?: 'Publisher';
  /** Square logo to use for the publisher */
  logo?: Maybe<Scalars['String']>;
  /** Name of the publisher of the article */
  name?: Maybe<Scalars['String']>;
  /** Url of the publisher */
  url?: Maybe<Scalars['Url']>;
  /** Wide logo to use for the publisher */
  logoWide?: Maybe<Scalars['String']>;
  /** Black wide based logo to use for the publisher */
  logoWideBlack?: Maybe<Scalars['String']>;
  /** The name to show to the article in recommendations */
  recommendationName?: Maybe<Scalars['String']>;
  /** Whether or not to show the authors of the article */
  showAuthors: Scalars['Boolean'];
  /** Whether or not to attribute the publisher to the article */
  attributeCanonicalToPublisher: Scalars['Boolean'];
  /** Whether or not to show an article call to action */
  showArticleCta: Scalars['Boolean'];
  /** The article call to action to show if selected */
  articleCta?: Maybe<PublisherArticleCta>;
  /** Whether or not to show the article appeared on domain */
  appearedOnDomain: Scalars['Boolean'];
  /** Whether or not to show publisher recomendations */
  showPublisherRecommendations?: Maybe<Scalars['Boolean']>;
};

/**
 * The call to action to show on a SyndicatedArticle for a specific publisher
 * TODO: rename to SyndicatedPublisherArticle and move to schema-shared.graphql
 * (requires client changes)
 */
export type PublisherArticleCta = {
  __typename?: 'PublisherArticleCta';
  /** The url to link to */
  url?: Maybe<Scalars['String']>;
  /** The text to show */
  text?: Maybe<Scalars['String']>;
  /** The lead in text to show */
  leadIn?: Maybe<Scalars['String']>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type Query = {
  __typename?: 'Query';
  /** Retrieves a paged set of published Collections. */
  getCollections: CollectionsResult;
  /**
   * Retrieves a Collection by the given slug. The Collection must be published.
   * @deprecated Use collectionBySlug instead
   */
  getCollectionBySlug?: Maybe<Collection>;
  /** Retrieves a Collection by the given slug. The Collection must be published. */
  collectionBySlug?: Maybe<Collection>;
  scheduledSurface: ScheduledSurface;
  /** This is a future improvement, not needed now. */
  surface: Surface;
  /** Retrieves a list of active and enabled Sections with their corresponding active SectionItems for a scheduled surface. */
  getSections: Array<Section>;
  /**
   * Returns a list of unleash toggles that are enabled for a given context.
   *
   * For more details on this check out https://docs.google.com/document/d/1dYS81h-DbQEWNLtK-ajLTylw454S32llPXUyBmDd5mU/edit# and https://getpocket.atlassian.net/wiki/spaces/PE/pages/1191444582/Feature+Flags+-+Unleash
   *
   * ~ For each of the enabled unleash toggles (via https://featureflags.readitlater.com/api/client/features or an unleash sdk)
   * ~ Check if the toggle is assigned/enabled for the provided {.context}
   * ~ Add an {UnleashAssignment} representing it to this list
   * ~ If no toggles are found, return an empty list
   * @deprecated use unleashAssignments instead
   */
  getUnleashAssignments?: Maybe<UnleashAssignmentList>;
  /**
   * Returns a list of unleash toggles that are enabled for a given context.
   *
   * For more details on this check out https://docs.google.com/document/d/1dYS81h-DbQEWNLtK-ajLTylw454S32llPXUyBmDd5mU/edit# and https://getpocket.atlassian.net/wiki/spaces/PE/pages/1191444582/Feature+Flags+-+Unleash
   *
   * ~ For each of the enabled unleash toggles (via https://featureflags.readitlater.com/api/client/features or an unleash sdk)
   * ~ Check if the toggle is assigned/enabled for the provided {.context}
   * ~ Add an {UnleashAssignment} representing it to this list
   * ~ If no toggles are found, return an empty list
   */
  unleashAssignments?: Maybe<UnleashAssignmentList>;
  /** Retrieve a specific Note */
  note?: Maybe<Note>;
  /** Retrieve a user's Notes */
  notes?: Maybe<NoteConnection>;
  /**
   * Look up Item info by a url.
   * @deprecated Use itemByUrl instead
   */
  getItemByUrl?: Maybe<Item>;
  /** Look up Item info by a url. */
  itemByUrl?: Maybe<Item>;
  /**
   * Resolve Reader View links which might point to SavedItems that do not
   * exist, aren't in the Pocket User's list, or are requested by a logged-out
   * user (or user without a Pocket Account).
   * Fetches data which clients can use to generate an appropriate fallback view
   * that allows users to preview the content and access the original source site.
   */
  readerSlug: ReaderViewResult;
  /** Get a slate of ranked recommendations for the Firefox New Tab. Currently supports the Italy, France, and Spain markets. */
  newTabSlate: CorpusSlate;
  /** Get ranked corpus slates and recommendations to deliver a unified Home experience.  */
  homeSlateLineup: CorpusSlateLineup;
  /** List all topics that the user can express a preference for. */
  recommendationPreferenceTopics: Array<Topic>;
  /**
   * List all available topics that we have recommendations for.
   * @deprecated Use `getSlateLineup` with a specific SlateLineup instead.
   */
  listTopics: Array<Topic>;
  /**
   * Request a specific `Slate` by id
   * @deprecated Please use queries specific to the surface ex. setMomentSlate. If a named query for your surface does not yet exit please reach out to the Data Products team and they will happily provide you with a named query.
   */
  getSlate: Slate;
  /**
   * Request a specific `SlateLineup` by id
   * @deprecated Please use queries specific to the surface ex. setMomentSlate. If a named query for your surface does not yet exit please reach out to the Data Products team and they will happily provide you with a named query.
   */
  getSlateLineup: SlateLineup;
  /**
   * Looks up and returns a Shareable List with a given external ID for a given user.
   * (the user ID will be coming through with the headers)
   */
  shareableList?: Maybe<ShareableList>;
  /** Returns a publicly-shared Shareable List. Note: this query does not require user authentication. */
  shareableListPublic?: Maybe<ShareableListPublic>;
  /**
   * Looks up and returns an array of Shareable Lists for a given user ID for a given user.
   * (the user ID will be coming through with the headers)
   */
  shareableLists: Array<ShareableList>;
  /** Determines if the userid passed in the headers has access to the pilot program. */
  shareableListsPilotUser: Scalars['Boolean'];
  /**
   * Resolve data for a Shared link, or return a Not Found
   * message if the share does not exist.
   */
  shareSlug?: Maybe<ShareResult>;
  /**
   * Look up SyndicatedArticle by a slug.
   * @deprecated use syndicatedArticleBySlug instead
   */
  getSyndicatedArticleBySlug?: Maybe<SyndicatedArticle>;
  /** Look up the SyndicatedArticle by a slug */
  syndicatedArticleBySlug?: Maybe<SyndicatedArticle>;
  /** Get a user entity for an authenticated client */
  user?: Maybe<User>;
  /**
   * Search Pocket's corpus of recommendations and collections.
   * Note that sort will have no effect unless using keyword
   * semantic search will always be returned in relevance order
   * (most relevant first).
   */
  searchCorpus?: Maybe<CorpusSearchConnection>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetCollectionsArgs = {
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  filters?: Maybe<CollectionsFiltersInput>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetCollectionBySlugArgs = {
  slug: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryCollectionBySlugArgs = {
  slug: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryScheduledSurfaceArgs = {
  id: Scalars['ID'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QuerySurfaceArgs = {
  id: Scalars['ID'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetSectionsArgs = {
  filters: SectionFilters;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetUnleashAssignmentsArgs = {
  context: UnleashContext;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryUnleashAssignmentsArgs = {
  context: UnleashContext;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryNoteArgs = {
  id: Scalars['ID'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryNotesArgs = {
  sort?: Maybe<NoteSortInput>;
  filter?: Maybe<NoteFilterInput>;
  pagination?: Maybe<PaginationInput>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetItemByUrlArgs = {
  url: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryItemByUrlArgs = {
  url: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryReaderSlugArgs = {
  slug: Scalars['ID'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryNewTabSlateArgs = {
  locale: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  enableRankingByRegion?: Maybe<Scalars['Boolean']>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryHomeSlateLineupArgs = {
  locale?: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetSlateArgs = {
  slateId: Scalars['String'];
  recommendationCount?: Maybe<Scalars['Int']>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetSlateLineupArgs = {
  slateLineupId: Scalars['String'];
  slateCount?: Maybe<Scalars['Int']>;
  recommendationCount?: Maybe<Scalars['Int']>;
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryShareableListArgs = {
  externalId: Scalars['ID'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryShareableListPublicArgs = {
  externalId: Scalars['ID'];
  slug: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryShareSlugArgs = {
  slug: Scalars['ID'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QueryGetSyndicatedArticleBySlugArgs = {
  slug: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QuerySyndicatedArticleBySlugArgs = {
  slug: Scalars['String'];
};

/**
 * Default root level query type. All authorization checks are done in these queries.
 * TODO: These belong in a seperate User Service that provides a User object (the user settings will probably exist there too)
 */
export type QuerySearchCorpusArgs = {
  search: CorpusSearchQueryString;
  filter: CorpusSearchFilters;
  sort?: Maybe<CorpusSearchSort>;
  pagination?: Maybe<PaginationInput>;
};

/**
 * Metadata of an Item in Pocket for preview purposes,
 * or an ItemNotFound result if the record does not exist.
 */
export type ReaderFallback = ReaderInterstitial | ItemNotFound;

/**
 * Card preview data for Items resolved from reader view
 * (getpocket.com/read/) links.
 *
 * Should be used to create a view if Reader Mode cannot
 * be rendered (e.g. the link is visited by an anonymous
 * Pocket user, or a Pocket User that does not have the
 * underlying Item in their Saves). Due to legal obligations
 * we can only display Reader Mode for SavedItems.
 */
export type ReaderInterstitial = {
  __typename?: 'ReaderInterstitial';
  itemCard?: Maybe<PocketMetadata>;
};

/** Result for resolving a getpocket.com/read/<slug> link. */
export type ReaderViewResult = {
  __typename?: 'ReaderViewResult';
  slug: Scalars['ID'];
  /**
   * The SavedItem referenced by this reader view slug, if it
   * is in the Pocket User's list.
   */
  savedItem?: Maybe<SavedItem>;
  fallbackPage?: Maybe<ReaderFallback>;
};

export type RecentSearch = {
  __typename?: 'RecentSearch';
  term: Scalars['String'];
  context?: Maybe<RecentSearchContext>;
  sortId: Scalars['Int'];
};

export type RecentSearchContext = {
  __typename?: 'RecentSearchContext';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type RecentSearchInput = {
  /** The term that was used for search */
  term: Scalars['String'];
  /**
   * Optional, the time the search was performed.
   * Defaults to current server time at time of request.
   */
  timestamp?: Maybe<Scalars['ISOString']>;
};

export type RecItUserProfile = {
  userModels: Array<Scalars['String']>;
};

/** Represents a Recommendation from Pocket */
export type Recommendation = {
  __typename?: 'Recommendation';
  /**
   * The Recommendation entity is owned by the Recommendation API service.
   * We extend it in this service to add an extra field ('curationInfo') to the Recommendation entity.
   * The key for this entity is the 'itemId' found within the Item entity which is owned by the Parser service.
   */
  item: Item;
  /** The feed id from mysql that this item was curated from (if it was curated) */
  feedId?: Maybe<Scalars['Int']>;
  curatedInfo?: Maybe<CuratedInfo>;
  /** A generated id from the Data and Learning team that represents the Recommendation */
  id: Scalars['ID'];
  /**
   * A generated id from the Data and Learning team that represents the Recommendation - Deprecated
   * @deprecated Use `id`
   */
  feedItemId?: Maybe<Scalars['ID']>;
  /**
   * The ID of the item this recommendation represents
   * TODO: Use apollo federation to turn this into an Item type.
   */
  itemId: Scalars['ID'];
  /** The source of the recommendation */
  recSrc: Scalars['String'];
  /** The publisher of the item */
  publisher?: Maybe<Scalars['String']>;
};

export type RecommendationReason = {
  __typename?: 'RecommendationReason';
  /** A succinct name for the recommendation reason that can be displayed to the user. */
  name: Scalars['String'];
  /** The type of reason for why the recommendation is made. */
  type: RecommendationReasonType;
};

/** Reasons why recommendations are made. Focuses on client needs and is not exhaustive. */
export enum RecommendationReasonType {
  /** Recommendations are sourced from the Pocket Hits newsletter. */
  PocketHits = 'POCKET_HITS',
  /** Recommendations that match the user's topic preferences are ranked higher. */
  PreferredTopics = 'PREFERRED_TOPICS',
}

/** Interface that all state based entities must implement */
export type RemoteEntity = {
  /**
   * For tags entity, id denotes the unique tag Id.
   * For savedItems, id denotes the itemId.
   * Along with the userId provided in the header, we will use id to fetch savedItems/tags for the user.
   */
  id: Scalars['ID'];
  /** Unix timestamp of when the entity was created */
  _createdAt?: Maybe<Scalars['Int']>;
  /**
   * Unix timestamp of when the entity was last updated, if any property on the
   * entity is modified this timestamp is set to the modified time
   */
  _updatedAt?: Maybe<Scalars['Int']>;
  /** Version of the entity, this will increment with each modification of the entity's field */
  _version?: Maybe<Scalars['Int']>;
  /**
   * Unix timestamp of when the entity was deleted, 30 days after this date this
   * entity will be HARD deleted from the database and no longer exist
   */
  _deletedAt?: Maybe<Scalars['Int']>;
};

/** Union type for saveById - retrieving either PocketSaves or NotFound errors */
export type SaveByIdResult = PocketSave | NotFound;

/** Payload for mutations that delete Saves */
export type SaveDeleteMutationPayload = {
  __typename?: 'SaveDeleteMutationPayload';
  success: Scalars['Boolean'];
  /** Any errors associated with the mutation. Empty if the mutation was succesful. */
  errors: Array<SaveMutationError>;
};

/**
 * Represents a Pocket Item that a user has saved to their list.
 * (Said otherways, indicates a saved url to a users list and associated user specific information.)
 */
export type SavedItem = RemoteEntity & {
  __typename?: 'SavedItem';
  /**
   * Surrogate primary key. This is usually generated by clients, but will be
   * generated by the server if not passed through creation
   */
  id: Scalars['ID'];
  /** Annotations associated to this SavedItem */
  annotations?: Maybe<SavedItemAnnotations>;
  /** key field to identify the SavedItem entity in the ListApi service */
  url: Scalars['String'];
  /** If the item is in corpus allow the saved item to reference it.  Exposing curated info for consistent UX */
  corpusItem?: Maybe<CorpusItem>;
  /** The title for user saved item. Set by the user and if not, set by the parser. */
  title?: Maybe<Scalars['String']>;
  /** Helper property to indicate if the SavedItem is favorited */
  isFavorite: Scalars['Boolean'];
  /** Timestamp that the SavedItem became favorited, null if not favorited */
  favoritedAt?: Maybe<Scalars['Int']>;
  /** Helper property to indicate if the SavedItem is archived */
  isArchived: Scalars['Boolean'];
  /** Timestamp that the SavedItem became archied, null if not archived */
  archivedAt?: Maybe<Scalars['Int']>;
  /** Link to the underlying Pocket Item for the URL */
  item: ItemResult;
  /** The Tags associated with this SavedItem */
  tags?: Maybe<Array<Tag>>;
  /** The Suggested Tags associated with this SavedItem, if the user is not premium or there are none, this will be empty. */
  suggestedTags?: Maybe<Array<Tag>>;
  /** The status of this SavedItem */
  status?: Maybe<SavedItemStatus>;
  /** Unix timestamp of when the entity was created */
  _createdAt: Scalars['Int'];
  /**
   * Unix timestamp of when the entity was last updated, if any property on the
   * entity is modified this timestamp is set to the modified time
   */
  _updatedAt?: Maybe<Scalars['Int']>;
  /** Version of the entity, this will increment with each modification of the entity's field */
  _version?: Maybe<Scalars['Int']>;
  /**
   * Unix timestamp of when the entity was deleted, 30 days after this date this
   * entity will be HARD deleted from the database and no longer exist
   */
  _deletedAt?: Maybe<Scalars['Int']>;
  /**
   * The notes associated with this SavedItem, optionally
   * filtered to retrieve after a 'since' parameter.
   */
  notes: NoteConnection;
};

/**
 * Represents a Pocket Item that a user has saved to their list.
 * (Said otherways, indicates a saved url to a users list and associated user specific information.)
 */
export type SavedItemNotesArgs = {
  pagination?: Maybe<PaginationInput>;
  sort?: Maybe<NoteSortInput>;
  filter?: Maybe<SavedItemNoteFilterInput>;
};

/**
 * Container for all annotations associated to a SavedItem.
 * Can be extended when more types of annotations are added.
 */
export type SavedItemAnnotations = {
  __typename?: 'SavedItemAnnotations';
  /** User-highlighted passages on a SavedItem */
  highlights?: Maybe<Array<Maybe<Highlight>>>;
};

/** The connection type for SavedItem. */
export type SavedItemConnection = {
  __typename?: 'SavedItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SavedItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of SavedItems in the connection. */
  totalCount: Scalars['Int'];
};

/** Payload for mutations that delete Saves */
export type SavedItemDeleteMutationPayload = {
  __typename?: 'SavedItemDeleteMutationPayload';
  success: Scalars['Boolean'];
  /** Any errors associated with the mutation. Empty if the mutation was succesful. */
  errors: Array<SavedItemMutationError>;
};

/** An edge in a connection. */
export type SavedItemEdge = {
  __typename?: 'SavedItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The SavedItem at the end of the edge. */
  node?: Maybe<SavedItem>;
};

/** All types in this union should implement BaseError, for client fallback */
export type SavedItemMutationError = NotFound | SyncConflict;

/** Filter for retrieving Notes attached to a SavedItem */
export type SavedItemNoteFilterInput = {
  /**
   * Filter to retrieve Notes by archived status (true/false).
   * If not provided, notes will not be filtered by archived status.
   */
  archived?: Maybe<Scalars['Boolean']>;
  /** Filter to retrieve notes after a timestamp, e.g. for syncing. */
  since?: Maybe<Scalars['ISOString']>;
  /**
   * Filter to choose whether to include notes marked for server-side
   * deletion in the response (defaults to false).
   */
  excludeDeleted?: Maybe<Scalars['Boolean']>;
};

/**
 * We don't have official oneOf support, but this will
 * throw if both `id` and `url` are unset/null.
 * Don't provide both... but if both are provided, it will
 * default to using ID.
 */
export type SavedItemRef = {
  id?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['Url']>;
};

/** A SavedItem can be one of these content types */
export enum SavedItemsContentType {
  /** Item is a parsed article that contains videos */
  Video = 'VIDEO',
  /** Item is a parsed page can be opened in reader view */
  Article = 'ARTICLE',
  /** Item is an image */
  IsImage = 'IS_IMAGE',
  /** Item is a video */
  IsVideo = 'IS_VIDEO',
  /** Item is a parsed article that contains videos */
  HasVideo = 'HAS_VIDEO',
  /** Item is a video or a parsed article that contains videos */
  HasVideoInclusive = 'HAS_VIDEO_INCLUSIVE',
  /** Item is a parsed page can be opened in reader view */
  IsReadable = 'IS_READABLE',
  /** Item is an un-parsable page and will be opened externally */
  IsExternal = 'IS_EXTERNAL',
}

export type SavedItemSearchResult = {
  __typename?: 'SavedItemSearchResult';
  savedItem: SavedItem;
  /**
   * Highlighted snippets from fields in the search results
   * searchHighlights is a premium user feature. Not available for free search.
   */
  searchHighlights?: Maybe<SaveItemSearchHighlights>;
};

/** The connection type for SavedItem. */
export type SavedItemSearchResultConnection = {
  __typename?: 'SavedItemSearchResultConnection';
  /** A list of edges. */
  edges: Array<SavedItemSearchResultEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type SavedItemSearchResultEdge = {
  __typename?: 'SavedItemSearchResultEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: SavedItemSearchResult;
};

/** A page of SavedItemSearchResult, retrieved by offset-based pagination. */
export type SavedItemSearchResultPage = {
  __typename?: 'SavedItemSearchResultPage';
  entries: Array<SavedItemSearchResult>;
  totalCount: Scalars['Int'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};

/** Input field for filtering a user's list */
export type SavedItemsFilter = {
  /**
   * Optional, filter to get SavedItems updated since a unix timestamp.
   * Mutually exclusive with `updatedBefore` option.
   */
  updatedSince?: Maybe<Scalars['Int']>;
  /**
   * Optional, filter to get SavedItems updated before a unix timestamp.
   * Mutually exclusive with `updatedSince` option.
   */
  updatedBefore?: Maybe<Scalars['Int']>;
  /** Optional, filter to get SavedItems that have been favorited */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /**
   * Optional, filter to get SavedItems that have been archived.
   * This field is deprecated. Use status instead.
   * TODO: Add deprecate tag once input field deprecation is enabled.
   * Ref: https://github.com/apollographql/federation/issues/912
   */
  isArchived?: Maybe<Scalars['Boolean']>;
  /** Optional, filter to get SavedItems associated to the specified Tag. */
  tagIds?: Maybe<Array<Scalars['ID']>>;
  /**
   * Optional, filter to get SavedItems associated to the specified Tag name.
   * To get untagged items, include the string '_untagged_'.
   */
  tagNames?: Maybe<Array<Scalars['String']>>;
  /** Optional, filter to get SavedItems with highlights */
  isHighlighted?: Maybe<Scalars['Boolean']>;
  /** Optional, filter to get SavedItems based on content type */
  contentType?: Maybe<SavedItemsContentType>;
  /** Optional, filter to get user items based on status. Deprecated: use statuses instead. */
  status?: Maybe<SavedItemStatusFilter>;
  /** Optional, filters to get user items based on multiple statuses (OR operator) */
  statuses?: Maybe<Array<Maybe<SavedItemStatusFilter>>>;
};

/** A page of SavedItems, retrieved by offset-based pagination. */
export type SavedItemsPage = {
  __typename?: 'SavedItemsPage';
  entries: Array<SavedItem>;
  totalCount: Scalars['Int'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};

/** Input to sort fetched SavedItems. If unspecified, defaults to CREATED_AT, ASC. */
export type SavedItemsSort = {
  /** The field by which to sort SavedItems */
  sortBy: SavedItemsSortBy;
  /** The order in which to sort SavedItems */
  sortOrder: SavedItemsSortOrder;
};

/** Enum to specify the sort by field (these are the current options, we could add more in the future) */
export enum SavedItemsSortBy {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
  FavoritedAt = 'FAVORITED_AT',
  ArchivedAt = 'ARCHIVED_AT',
}

/** Enum to specify the sort order of SavedItems fetched */
export enum SavedItemsSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum SavedItemStatus {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Hidden = 'HIDDEN',
  Unread = 'UNREAD',
}

/** Valid statuses a client may use to filter SavedItems */
export enum SavedItemStatusFilter {
  Unread = 'UNREAD',
  Archived = 'ARCHIVED',
  Hidden = 'HIDDEN',
}

export type SavedItemTagAssociation = {
  __typename?: 'SavedItemTagAssociation';
  /** The ID of the SavedItem associated with the Tag */
  savedItemId: Scalars['ID'];
  /** The ID of the Tag associated with the SavedItem */
  tagId: Scalars['ID'];
};

/** Input field for adding Tag Associations to a SavedItem, by givenUrl */
export type SavedItemTagInput = {
  givenUrl: Scalars['Url'];
  tagNames: Array<Scalars['String']>;
};

/** Input field for setting all Tag associations on a SavedItem. */
export type SavedItemTagsInput = {
  /** The SavedItem ID to associate Tags to */
  savedItemId: Scalars['ID'];
  /** The set of Tag names to associate to the SavedItem */
  tags: Array<Scalars['String']>;
};

/** Input field for setting all Tag associations on a SavedItem. */
export type SavedItemTagUpdateInput = {
  /** The SavedItem ID to associate Tags to */
  savedItemId: Scalars['ID'];
  /** The set of Tag IDs to associate to the SavedItem */
  tagIds: Array<Scalars['ID']>;
};

/** Input field for upserting a SavedItem */
export type SavedItemUpsertInput = {
  /**
   * The url to create/update the SavedItem with. (the url to save to the list)
   * Must be at least a 4 character string which is the shortest url
   */
  url: Scalars['String'];
  /** Optional, create/update the SavedItem as a favorited item */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /** Optional, time that request was submitted by client epoch/unix time */
  timestamp?: Maybe<Scalars['Int']>;
  /** Optional, title of the SavedItem */
  title?: Maybe<Scalars['String']>;
};

/** Payload for mutations that create or update SavedItems */
export type SavedItemWriteMutationPayload = {
  __typename?: 'SavedItemWriteMutationPayload';
  /** The mutated SavedItem objects; empty if the mutation did not succeed. */
  savedItem: Array<SavedItem>;
  /** Any errors associated with the mutation. Empty if the mutation was succesful. */
  errors: Array<SavedItemMutationError>;
};

/**
 * Elasticsearch highlights.
 * Highlighted snippets from the following fields in the search results
 * so clients can show users where the query matches are.
 * Each field, if available, contains an array of html text snippets
 * that contain a match to the search term.
 * The matching text is wrapped in `<em>` tags, e.g. ["Hiss at <em>vacuum</em> cleaner if it fits i sits"]
 */
export type SaveItemSearchHighlights = {
  __typename?: 'SaveItemSearchHighlights';
  fullText?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** All types in this union should implement BaseError, for client fallback */
export type SaveMutationError = NotFound | SyncConflict;

export type SaveUpdateTagsInput = {
  saveId: Scalars['ID'];
  /** Tags to remove, by ID */
  removeTagIds: Array<Scalars['ID']>;
  /**
   * Tags to add, by name text; if a Tag
   * with the given name does not exist,
   * one will be created.
   */
  addTagNames: Array<Scalars['String']>;
};

/** Input field for upserting a Save. Used by saveUpsert mutation */
export type SaveUpsertInput = {
  /**
   * The url to create/update the SavedItem with. (the url to save to the list)
   * Must be at least a 4 character string which is the shortest url
   */
  url: Scalars['String'];
  /** Optional, title of the SavedItem */
  title?: Maybe<Scalars['String']>;
  /** Optional, create/update the SavedItem as a favorited item */
  isFavorite?: Maybe<Scalars['Boolean']>;
};

/** Payload for mutations that create or update Saves */
export type SaveWriteMutationPayload = {
  __typename?: 'SaveWriteMutationPayload';
  /** The mutated Save objects; empty if the mutation did not succeed. */
  save: Array<PocketSave>;
  /** Any errors associated with the mutation. Empty if the mutation was succesful. */
  errors: Array<SaveMutationError>;
};

/** Represents a surface that has scheduled items by day */
export type ScheduledSurface = {
  __typename?: 'ScheduledSurface';
  /** Agreed on GUID that is from our shared data pocket confluence */
  id: Scalars['ID'];
  /** Internal name of the surface */
  name: Scalars['String'];
  /** Subquery to get the ScheduledSurfaceItems to display to a user for a given date */
  items: Array<ScheduledSurfaceItem>;
};

/** Represents a surface that has scheduled items by day */
export type ScheduledSurfaceItemsArgs = {
  date: Scalars['Date'];
};

/**
 * A scheduled entry for an CorpusItem to appear on a Scheduled Surface.
 * For example, a story that is scheduled to appear on December 31st, 2021 on the
 * Scheduled Surface in Firefox for the US audience.
 */
export type ScheduledSurfaceItem = {
  __typename?: 'ScheduledSurfaceItem';
  /** A backend GUID that represents this scheduled run */
  id: Scalars['ID'];
  /** Agreed on GUID that is from our shared data pocket confluence */
  surfaceId: Scalars['ID'];
  /** The date the item should run at */
  scheduledDate: Scalars['Date'];
  /** The curated item that should run */
  corpusItem: CorpusItem;
};

/** Input filed for filtering items */
export type SearchFilter = {
  /** Optional fitler to get item with specific tags */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Optional filter to get items in a specific state */
  status?: Maybe<SearchStatus>;
  /** Optional filter to get items that are favorited */
  favorite?: Maybe<Scalars['Boolean']>;
  /** Optional filter to items of a specific content type */
  contentType?: Maybe<Scalars['String']>;
  /**
   * Optional filter to get items that matches the domain
   * domain should be in the url format, e.g getpocket.com (or) list.getpocket.com
   */
  domain?: Maybe<Scalars['String']>;
};

export type SearchFilterInput = {
  /** Optional, filter to get user items that have been favorited */
  isFavorite?: Maybe<Scalars['Boolean']>;
  /**
   * Optional, filter to get user items only based on title and url, ie Free Search
   * Note, though that if this is selected and the user is premium, they will not get search highligthing.
   */
  onlyTitleAndURL?: Maybe<Scalars['Boolean']>;
  /** Optional, filter to get SavedItems based on content type */
  contentType?: Maybe<SearchItemsContentType>;
  /** Optional, filter to get user items based on status. */
  status?: Maybe<SearchItemsStatusFilter>;
  /**
   * Optional filter to get items that matches the domain
   * domain should be in the url format, e.g getpocket.com (or) list.getpocket.com
   */
  domain?: Maybe<Scalars['String']>;
};

/**
 * Used to detemermine whether to add or multiply a document's score by the
 * functional boost factor
 */
export enum SearchFunctionalBoostOperation {
  Add = 'ADD',
  Multiply = 'MULTIPLY',
}

/** Input field to get elasticsearch highlights of keywords */
export type SearchHighlightField = {
  /** Field to highlight */
  field: Scalars['String'];
  /** The number of characters to return in addition to the keyword */
  size: Scalars['Int'];
};

/** A SavedItem can be one of these content types */
export enum SearchItemsContentType {
  Video = 'VIDEO',
  Article = 'ARTICLE',
}

/** Enum to specify the sort by field (these are the current options, we could add more in the future) */
export enum SearchItemsSortBy {
  /** Indicates when a SavedItem was created */
  CreatedAt = 'CREATED_AT',
  /** Estimated time to read a SavedItem */
  TimeToRead = 'TIME_TO_READ',
  /**
   * Sort SavedItems based on a relevance score
   * This is a feature of elasticsearch and current only available for premium search
   */
  Relevance = 'RELEVANCE',
}

/** Enum to specify the sort order of user items fetched */
export enum SearchItemsSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** Valid statuses a client may use to filter */
export enum SearchItemsStatusFilter {
  Unread = 'UNREAD',
  Archived = 'ARCHIVED',
}

/** Input field for search */
export type SearchParams = {
  /** The keyword to search for */
  term: Scalars['String'];
  /** Filters to be applied to the search */
  filters?: Maybe<SearchFilter>;
  /** Sorting for the search */
  sort?: Maybe<SearchSort>;
  /** Offset for pagination */
  from?: Maybe<Scalars['Int']>;
  /** Number of items to return */
  size?: Maybe<Scalars['Int']>;
  /** Fields to search for the keyword in */
  fields: Array<Maybe<Scalars['String']>>;
  /** Fields that should be highlighted if keywords are found within them */
  highlightFields?: Maybe<Array<Maybe<SearchHighlightField>>>;
  /** Operation to boost the score of a document based */
  functionalBoosts?: Maybe<Array<Maybe<FunctionalBoostField>>>;
};

/** The return type for the search query */
export type SearchResult = {
  __typename?: 'SearchResult';
  /** Number of items found */
  totalResults: Scalars['Int'];
  /** Items found */
  results?: Maybe<Array<Maybe<Item>>>;
  /** @deprecated Not required by implementing clients */
  page?: Maybe<Scalars['Int']>;
  /** @deprecated Not required by implementing client */
  perPage?: Maybe<Scalars['Int']>;
};

/** Input field for sorting items */
export type SearchSort = {
  /** Field in elasticsearch to sort by */
  field: Scalars['String'];
  /** Direction of the sort (ASC/DESC) */
  direction: SearchSortDirection;
};

/** Sort direction of the returned items. */
export enum SearchSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SearchSortInput = {
  /** The field by which to sort user items */
  sortBy: SearchItemsSortBy;
  /** The order in which to sort user items */
  sortOrder?: Maybe<SearchItemsSortOrder>;
};

/**
 * An index item can be in one of these states
 * QUEUED implies an item that has not been archived
 */
export enum SearchStatus {
  Queued = 'QUEUED',
  Archived = 'ARCHIVED',
}

/** An entity containing Corpus Items. */
export type Section = {
  __typename?: 'Section';
  /** An alternative primary key in UUID format. */
  externalId: Scalars['ID'];
  /** The title of the Section displayed to the users. */
  title: Scalars['String'];
  /** The GUID of the Scheduled Surface. Example: 'NEW_TAB_EN_US'. */
  scheduledSurfaceGuid: Scalars['ID'];
  /** Optional IAB metadata returned to the client (i.e. Merino->Firefox, Admin Tools) */
  iab?: Maybe<IabMetadata>;
  /** Controls the display order of Sections. */
  sort?: Maybe<Scalars['Int']>;
  /** The source which created the Section. */
  createSource: ActivitySource;
  /** Indicates whether or not a Section is available for display. */
  active: Scalars['Boolean'];
  /**
   * An array of active and in-active SectionItems in a Section.
   * This field returns an empty array when creating a new Section or updating a Section.
   */
  sectionItems: Array<SectionItem>;
};

/** Available fields for filtering Sections. */
export type SectionFilters = {
  /** Required filter to retrieve Sections & SectionItems for a Scheduled Surface */
  scheduledSurfaceGuid: Scalars['ID'];
};

/** A CorpusItem belonging to a Section */
export type SectionItem = {
  __typename?: 'SectionItem';
  /** An alternative primary key in UUID format that is generated on creation. */
  externalId: Scalars['ID'];
  /**
   * The initial rank of the SectionItem in relation to its siblings. Used as a
   * fallback in Merino when there is no engagement/click data available. May only apply to
   * ML-generated SectionItems.
   */
  rank?: Maybe<Scalars['Int']>;
  /** The associated Corpus Item. */
  corpusItem: CorpusItem;
};

/** A user-created list of Pocket saves that can be shared publicly. */
export type ShareableList = {
  __typename?: 'ShareableList';
  /** A unique string identifier in UUID format. */
  externalId: Scalars['ID'];
  /** The user who created this shareable list. */
  user: User;
  /**
   * A URL-ready identifier of the list. Generated from the title
   * of the list when it's first made public. Unique per user.
   */
  slug?: Maybe<Scalars['String']>;
  /** The title of the list. Provided by the Pocket user. */
  title: Scalars['String'];
  /** Optional text description of a Shareable List. Provided by the Pocket user. */
  description?: Maybe<Scalars['String']>;
  /** The status of the list. Defaults to PRIVATE. */
  status: ShareableListVisibility;
  /** The moderation status of the list. Defaults to VISIBLE. */
  moderationStatus: ShareableListModerationStatus;
  /** The timestamp of when the list was created by its owner. */
  createdAt: Scalars['ISOString'];
  /**
   * The timestamp of when the list was last updated by its owner
   * or a member of the moderation team.
   */
  updatedAt: Scalars['ISOString'];
  /**
   * Pocket Saves that have been added to this list by the Pocket user.
   * @deprecated use items
   */
  listItems: Array<ShareableListItem>;
  /** Pocket Saves that have been added to this list by the Pocket user. */
  items: ListItemConnection;
  /** The visibility of notes added to list items for this list. */
  listItemNoteVisibility: ShareableListVisibility;
};

/** A user-created list of Pocket saves that can be shared publicly. */
export type ShareableListItemsArgs = {
  pagination?: Maybe<PaginationInput>;
};

/** A Pocket Save (story) that has been added to a Shareable List. */
export type ShareableListItem = {
  __typename?: 'ShareableListItem';
  /** A unique string identifier in UUID format. */
  externalId: Scalars['ID'];
  /** The Parser Item ID. */
  itemId: Scalars['ID'];
  /** The URL of the story saved to a list. */
  url: Scalars['Url'];
  /**
   * The title of the story. Supplied by the Parser.
   * May not be available for URLs that cannot be resolved.
   * Not editable by the Pocket user, as are all the other
   * Parser-supplied story properties below.
   */
  title?: Maybe<Scalars['String']>;
  /** The excerpt of the story. Supplied by the Parser. */
  excerpt?: Maybe<Scalars['String']>;
  /** User generated note to accompany this list item. */
  note?: Maybe<Scalars['String']>;
  /** The URL of the thumbnail image illustrating the story. Supplied by the Parser. */
  imageUrl?: Maybe<Scalars['Url']>;
  /** The name of the publisher for this story. Supplied by the Parser. */
  publisher?: Maybe<Scalars['String']>;
  /** A comma-separated list of story authors. Supplied by the Parser. */
  authors?: Maybe<Scalars['String']>;
  /** The custom sort order of stories within a list. Defaults to 1. */
  sortOrder: Scalars['Int'];
  /** The timestamp of when this story was added to the list by its owner. */
  createdAt: Scalars['ISOString'];
  /** The timestamp of when the story was last updated. Not used for the MVP. */
  updatedAt: Scalars['ISOString'];
};

/** The moderation status of a Shareable List. Defaults to VISIBLE. */
export enum ShareableListModerationStatus {
  /** The list and its contents abide by the Pocket content moderation policy. */
  Visible = 'VISIBLE',
  /**
   * The list and its contents have been removed from view and further editing
   * by its owner as it violated the Pocket content moderation policy.
   */
  Hidden = 'HIDDEN',
}

/**
 * A list that has been already shared publicly.
 * This type is needed as it needs to be cached.
 */
export type ShareableListPublic = {
  __typename?: 'ShareableListPublic';
  /** A unique string identifier in UUID format. */
  externalId: Scalars['ID'];
  /** The user who created this shareable list. */
  user: User;
  /**
   * A URL-ready identifier of the list. Generated from the title
   * of the list when it's first made public. Unique per user.
   */
  slug?: Maybe<Scalars['String']>;
  /** The title of the list. Provided by the Pocket user. */
  title: Scalars['String'];
  /** Optional text description of a Shareable List. Provided by the Pocket user. */
  description?: Maybe<Scalars['String']>;
  /** The status of the list. Defaults to PRIVATE. */
  status: ShareableListVisibility;
  /** The moderation status of the list. Defaults to VISIBLE. */
  moderationStatus: ShareableListModerationStatus;
  /** The timestamp of when the list was created by its owner. */
  createdAt: Scalars['ISOString'];
  /**
   * The timestamp of when the list was last updated by its owner
   * or a member of the moderation team.
   */
  updatedAt: Scalars['ISOString'];
  /** Pocket Saves that have been added to this list by the Pocket user. */
  listItems: Array<ShareableListItem>;
  /** The visibility of notes added to list items for this list. */
  listItemNoteVisibility: ShareableListVisibility;
};

/**
 * The visibility levels used (e.g. list, list item note) in the Shareable List
 * API. Defaults to PRIVATE - visible only to its owner.
 */
export enum ShareableListVisibility {
  /** Only visible to its owner - the Pocket user who created it. */
  Private = 'PRIVATE',
  /** Can be viewed by anyone in the world. */
  Public = 'PUBLIC',
}

export type ShareContext = {
  __typename?: 'ShareContext';
  /** A user-provided comment/note on the shared content. */
  note?: Maybe<Scalars['String']>;
  /** User-provided highlights of the content */
  highlights?: Maybe<Array<ShareHighlight>>;
};

/** Input for mutation which creates a new Pocket Share link. */
export type ShareContextInput = {
  /** A note/comment about the Share (up to 500 characters). */
  note?: Maybe<Scalars['String']>;
  /** Quoted content from the Share source */
  highlights?: Maybe<ShareHighlightInput>;
};

export type ShareHighlight = {
  __typename?: 'ShareHighlight';
  /** Highlighted text on a piece of shared content. */
  quote: Scalars['String'];
};

export type ShareHighlightInput = {
  /**
   * Highlighted text on a piece of shared content.
   * This is a permissive constraint but there needs
   * to be _a_ constraint.
   * This input is not required, but if present 'quotes'
   * is required as it is the only field.
   * Limited to 300 characters per quote (longer quotes
   * will not be rejected, but will be truncated).
   */
  quotes: Array<Scalars['Max300CharString']>;
};

export type ShareNotFound = {
  __typename?: 'ShareNotFound';
  message?: Maybe<Scalars['String']>;
};

export type ShareResult = PocketShare | ShareNotFound;

/** A grouping of item recommendations that relate to each other under a specific name and description */
export type Slate = {
  __typename?: 'Slate';
  id: Scalars['String'];
  /**
   * A guid that is unique to every API request that returned slates, such as
   * `getSlateLineup` or `getSlate`. The API will provide a new request id every
   * time apps hit the API.
   */
  requestId: Scalars['ID'];
  /**
   * A unique guid/slug, provided by the Data & Learning team that can identify a
   * specific experiment. Production apps typically won't request a specific one,
   * but can for QA or during a/b testing.
   */
  experimentId: Scalars['ID'];
  /** The name to show to the user for this set of recommendations */
  displayName?: Maybe<Scalars['String']>;
  /** The description of the the slate */
  description?: Maybe<Scalars['String']>;
  /** An ordered list of the recommendations to show to the user */
  recommendations: Array<Recommendation>;
};

export type SlateLineup = {
  __typename?: 'SlateLineup';
  /**
   * A unique slug/id that describes a SlateLineup. The Data & Learning team will
   * provide apps what id to use here for specific cases.
   */
  id: Scalars['ID'];
  /**
   * A guid that is unique to every API request that returned slates, such as
   * `getRecommendationSlateLineup` or `getSlate`. The API will provide a new
   * request id every time apps hit the API.
   */
  requestId: Scalars['ID'];
  /**
   * A unique guid/slug, provided by the Data & Learning team that can identify a
   * specific experiment. Production apps typically won't request a specific one,
   * but can for QA or during a/b testing.
   */
  experimentId: Scalars['ID'];
  /** An ordered list of slates for the client to display */
  slates: Array<Slate>;
};

/**
 * Union type to reference a surface
 * This is a future improvement, not needed now.
 */
export type Surface = ScheduledSurface;

export type SyncConflict = BaseError & {
  __typename?: 'SyncConflict';
  path: Scalars['String'];
  message: Scalars['String'];
};

/** An article that Pocket has syndicated and we also host on our own site */
export type SyndicatedArticle = {
  __typename?: 'SyndicatedArticle';
  /** Slug that pocket uses for this article in the url */
  slug?: Maybe<Scalars['String']>;
  /** The canonical publisher URL. Automatically set at time of creation but can be changed by editor. */
  publisherUrl: Scalars['String'];
  /** Title of syndicated article */
  title: Scalars['String'];
  /** Array of author names in string format */
  authorNames: Array<Maybe<Scalars['String']>>;
  /** AWSDateTime — Format: YYYY-MM-DDThh:mm:ss.sssZ */
  publishedAt: Scalars['String'];
  /** Primary image to use in surfacing this content */
  mainImage?: Maybe<Scalars['String']>;
  /** Excerpt  */
  excerpt?: Maybe<Scalars['String']>;
  /** The manually set publisher information for this article */
  publisher?: Maybe<Publisher>;
  /** The preview of the syndicated article */
  preview: PocketMetadata;
  /**
   * The Item entity representing the original content this was
   * syndicated from.
   */
  originalItem: Item;
  /** The item id of this Syndicated Article */
  itemId?: Maybe<Scalars['ID']>;
  /** The item id of the article we cloned */
  originalItemId: Scalars['ID'];
  /** Recommend similar syndicated articles. */
  relatedEndOfArticle: Array<CorpusRecommendation>;
  /** Recommend similar articles from the same publisher. */
  relatedRightRail: Array<CorpusRecommendation>;
  /** Content for the syndicated article */
  content?: Maybe<Scalars['String']>;
  /**
   * DRAFT — Article is not meant to be available to the public
   * EXPIRED — Article contract is up and should be redirected to original article
   * ACTIVE — Article is clear to be shown in syndicated form
   */
  status: ArticleStatus;
  /** Should ads be shown on this article or not */
  showAds: Scalars['Boolean'];
  /** When does the contract for syndication expire */
  expiresAt?: Maybe<Scalars['String']>;
  /** The language of the article */
  localeLanguage?: Maybe<Scalars['String']>;
  /** The locale country of the article */
  localeCountry?: Maybe<Scalars['String']>;
  /**
   * The Main IAB category of the article defined at
   * https://support.aerserv.com/hc/en-us/articles/207148516-List-of-IAB-Categories
   */
  iabTopCategory?: Maybe<Scalars['String']>;
  /**
   * The Sub IAB category of the article defined at
   * https://support.aerserv.com/hc/en-us/articles/207148516-List-of-IAB-Categories
   */
  iabSubCategory?: Maybe<Scalars['String']>;
  /**
   * The pocket curation category of the Article, maps to the Pocket Curation Topic lists
   * @deprecated use topic instead
   */
  curationCategory?: Maybe<Scalars['String']>;
  /** The pocket topic of the Article, maps to the Pocket Curation Topic lists */
  topic?: Maybe<Scalars['String']>;
};

/** An article that Pocket has syndicated and we also host on our own site */
export type SyndicatedArticleRelatedEndOfArticleArgs = {
  count?: Maybe<Scalars['Int']>;
};

/** An article that Pocket has syndicated and we also host on our own site */
export type SyndicatedArticleRelatedRightRailArgs = {
  count?: Maybe<Scalars['Int']>;
};

/** Represents a Tag that a User has created for their list */
export type Tag = {
  __typename?: 'Tag';
  /** The actual tag string the user created for their list */
  name: Scalars['String'];
  /** paginated listing of all SavedItems associated with this Tag for the user */
  savedItems?: Maybe<SavedItemConnection>;
  /**
   * Surrogate primary key. This is usually generated by clients, but will be
   * generated by the server if not passed through creation
   */
  id: Scalars['ID'];
  /** Version of the entity, this will increment with each modification of the entity's field */
  _version?: Maybe<Scalars['Int']>;
  /**
   * Unix timestamp of when the entity was deleted, 30 days after this date this
   * entity will be HARD deleted from the database and no longer exist
   */
  _deletedAt?: Maybe<Scalars['Int']>;
};

/** Represents a Tag that a User has created for their list */
export type TagSavedItemsArgs = {
  filter?: Maybe<SavedItemsFilter>;
  sort?: Maybe<SavedItemsSort>;
  pagination?: Maybe<PaginationInput>;
};

/** The connection type for Tag. */
export type TagConnection = {
  __typename?: 'TagConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TagEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of Tags in the connection. */
  totalCount: Scalars['Int'];
};

/** Input field for creating a Tag */
export type TagCreateInput = {
  /** The user provided tag string */
  name: Scalars['String'];
  /** ID of the SavedItem to associate with this Tag */
  savedItemId: Scalars['ID'];
};

/** Payload for mutations that delete Tags */
export type TagDeleteMutationPayload = {
  __typename?: 'TagDeleteMutationPayload';
  success: Scalars['Boolean'];
  /** Any errors associated with the mutation. Empty if the mutation was succesful. */
  errors: Array<TagMutationError>;
};

/** An edge in a connection. */
export type TagEdge = {
  __typename?: 'TagEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The Tag at the end of the edge. */
  node?: Maybe<Tag>;
};

/** All types in this union should implement BaseError, for client fallback */
export type TagMutationError = NotFound | SyncConflict;

/** Input field for updating a Tag */
export type TagUpdateInput = {
  /** Tag ID */
  id: Scalars['ID'];
  /** The updated tag string */
  name: Scalars['String'];
};

/** Payload for mutations that create or update Tags */
export type TagWriteMutationPayload = {
  __typename?: 'TagWriteMutationPayload';
  /** The mutated Tag objects; empty if the mutation did not succeed. */
  tag: Array<Tag>;
  /** Any errors associated with the mutation. Empty if the mutation was succesful. */
  errors: Array<TagMutationError>;
};

/**
 * Represents a topic for /explore
 * Deprecated for SlateLineups
 */
export type Topic = {
  __typename?: 'Topic';
  /** The legacy UUID id of the topic */
  id: Scalars['ID'];
  /** The name of the topic to show to the user */
  name: Scalars['String'];
  /**
   * The name of the topic to show to the user
   * @deprecated displayName is deprecated. Use name instead.
   */
  displayName: Scalars['String'];
  /** The type of page this topic represents used in  generation */
  pageType: PageType;
  /** The slug that should be used in the url to represent the topic */
  slug: Scalars['String'];
  /** The query that was used internally for elasticsearch to find items */
  query: Scalars['String'];
  /** The label the curator uses internally to get items onto this topic */
  curatorLabel: Scalars['String'];
  /** Whether or not clients should show this topic ot users */
  isDisplayed: Scalars['Boolean'];
  /** Whether or not this topic should be visiblly promoted (prominent on the page) */
  isPromoted: Scalars['Boolean'];
  /** If returned a note to show to the user about the topic */
  displayNote?: Maybe<Scalars['String']>;
  /** The title to use in the HTML markup for SEO and social media sharing */
  socialTitle?: Maybe<Scalars['String']>;
  /** The description to use in the HTML markup for SEO and social media sharing */
  socialDescription?: Maybe<Scalars['String']>;
  /** The image to use in the HTML markup for SEO and social media sharing */
  socialImage?: Maybe<Scalars['String']>;
  /** The internal feed id that this topic will pull from if set */
  customFeedId?: Maybe<Scalars['ID']>;
};

export type TopicInput = {
  /** The id of the topic */
  id: Scalars['ID'];
};

/** Details on the variant/status of this toggle for a given user/context */
export type UnleashAssignment = {
  __typename?: 'UnleashAssignment';
  /** The unleash toggle name, the same name as it appears in the admin interface and feature api */
  name: Scalars['String'];
  /** Whether or not the provided context is assigned */
  assigned: Scalars['Boolean'];
  /** If the toggle has variants, the variant name it is assigned to */
  variant?: Maybe<Scalars['String']>;
  /** If the variant has a payload, its payload value */
  payload?: Maybe<Scalars['String']>;
};

/** Contains a list of all toggles. */
export type UnleashAssignmentList = {
  __typename?: 'UnleashAssignmentList';
  assignments: Array<Maybe<UnleashAssignment>>;
};

/**
 * Information about the user and device. Based on https://unleash.github.io/docs/unleash_context
 *
 * Used to calculate assignment values.
 */
export type UnleashContext = {
  /**
   * A unique name for one of our apps. Can be any string, but here are some known/expected values:
   *
   * - `android`
   * - `ios`
   * - `web-discover`
   * - `web-app`
   */
  appName?: Maybe<Scalars['String']>;
  /**
   * The environment the device is running in:
   * - `prod`
   * - `beta`
   * - `alpha`
   */
  environment?: Maybe<UnleashEnvironment>;
  /** If logged in, the user's encoded user id (uid). The {Account.user_id}. */
  userId?: Maybe<Scalars['String']>;
  /** A device specific identifier that will be consistent across sessions, typically the encoded {guid} or some session token. */
  sessionId?: Maybe<Scalars['String']>;
  /**
   * The device's IP address. If omitted, inferred from either request header
   * `x-forwarded-for` or the origin IP of the request.
   */
  remoteAddress?: Maybe<Scalars['String']>;
  properties?: Maybe<UnleashProperties>;
};

export enum UnleashEnvironment {
  /** User facing, production builds */
  Prod = 'prod',
  /** User facing, beta level builds */
  Beta = 'beta',
  /** Internal team builds */
  Alpha = 'alpha',
}

/** Extended properties that Unleash can use to assign users through a toggle's strategies. */
export type UnleashProperties = {
  /** If omitted, inferred from request header `accept-langauge`. */
  locale?: Maybe<Scalars['String']>;
  /** Only required on activation strategies that are based on account age */
  accountCreatedAt?: Maybe<Scalars['String']>;
  /** Only required on activation strategies that are based whether a user model exists */
  recItUserProfile?: Maybe<RecItUserProfile>;
};

/** Represents content that could not be parsed into a valid Marticle* component. */
export type UnMarseable = {
  __typename?: 'UnMarseable';
  /** The html that could not be parsed into a Marticle* component. */
  html: Scalars['String'];
};

export type UpdateHighlightInput = {
  /**
   * The full text of the highlighted passage. Used as a fallback for
   * rendering highlight if the patch fails.
   */
  quote: Scalars['String'];
  /**
   * Patch string generated by 'DiffMatchPatch' library, serialized
   * into text via `patch_toText` method.
   * Format is similar to UniDiff but is character-based.
   * The patched text depends on version. For example, the version 2
   * patch surrounds the highlighted text portion with a pair of
   * sentinel tags: '<pkt_tag_annotation></pkt_tag_annotation>'
   * Reference: https://github.com/google/diff-match-patch
   */
  patch: Scalars['String'];
  /** Annotation data version */
  version: Scalars['Int'];
  /** The ID of the Item that should be annotated in the User's list */
  itemId: Scalars['ID'];
  /** Optional note generated by User */
  note?: Maybe<Scalars['String']>;
};

/** Input data for updating a Shareable List. */
export type UpdateShareableListInput = {
  externalId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<ShareableListVisibility>;
  listItemNoteVisibility?: Maybe<ShareableListVisibility>;
};

/** Input data for updating a single Shareable List Item. */
export type UpdateShareableListItemInput = {
  externalId: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  sortOrder?: Maybe<Scalars['Int']>;
};

/** Input data for updating an array of Shareable List Items, targeting sortOrder. */
export type UpdateShareableListItemsInput = {
  externalId: Scalars['ID'];
  sortOrder: Scalars['Int'];
};

export type UpdateUserRecommendationPreferencesInput = {
  /** Topics that the user expressed interest in. */
  preferredTopics: Array<TopicInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type User = {
  __typename?: 'User';
  /** User id, provided by the user service. */
  id: Scalars['ID'];
  /** Get a general paginated listing of all SavedItems for the user */
  savedItems?: Maybe<SavedItemConnection>;
  /** Fetch SavedItems with offset pagination. Internal backend use only. */
  savedItemsByOffset?: Maybe<SavedItemsPage>;
  /** Get a paginated listing of all a user's Tags */
  tags?: Maybe<TagConnection>;
  /**
   * Get all tag names for a user.
   * If syncSince is passed, it will only return tags if changes
   * to a user's tags have occurred after syncSince. It will return
   * all of the user's tags (not just the changes).
   *
   * Yes, this is bad graphql design. It's serving a specific
   * REST API which has unlimited SQL queries, and we do not want to
   * make it possible to request every associated SavedItem
   * node on a tag object. Just biting the bullet on this one.
   */
  tagsList?: Maybe<Array<Scalars['String']>>;
  /**
   * Get a SavedItem by its id
   * @deprecated Use saveById instead
   */
  savedItemById?: Maybe<SavedItem>;
  /** Get a PocketSave(s) by its id(s) */
  saveById: Array<SaveByIdResult>;
  /** Preferences for recommendations that the user has explicitly set. */
  recommendationPreferences?: Maybe<UserRecommendationPreferences>;
  /** The public avatar url for the user */
  avatarUrl?: Maybe<Scalars['String']>;
  /** The public username for the user */
  username?: Maybe<Scalars['String']>;
  /** The users first name */
  firstName?: Maybe<Scalars['String']>;
  /** The users last name */
  lastName?: Maybe<Scalars['String']>;
  /** The users first name and last name combined */
  name?: Maybe<Scalars['String']>;
  /** A users bio for their profile */
  description?: Maybe<Scalars['String']>;
  /** The user's premium status */
  isPremium?: Maybe<Scalars['Boolean']>;
  /** Timestamp of the date when account was created */
  accountCreationDate?: Maybe<Scalars['ISOString']>;
  /** Email address associated with the account. */
  email?: Maybe<Scalars['String']>;
  /** Indicates if a user is FxA or not */
  isFxa?: Maybe<Scalars['Boolean']>;
  /** Premium features that a user has access to */
  premiumFeatures?: Maybe<Array<Maybe<PremiumFeature>>>;
  /** Current premium status of the user */
  premiumStatus?: Maybe<PremiumStatus>;
  /**
   * Premium search query. Name will be updated after client input
   * @deprecated Use searchSavedItems
   */
  search: SearchResult;
  /** Get a paginated list of user items that match a given term */
  searchSavedItems?: Maybe<SavedItemSearchResultConnection>;
  advancedSearch?: Maybe<SavedItemSearchResultConnection>;
  searchSavedItemsByOffset?: Maybe<SavedItemSearchResultPage>;
  advancedSearchByOffset?: Maybe<SavedItemSearchResultPage>;
  recentSearches?: Maybe<Array<RecentSearch>>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSavedItemsArgs = {
  filter?: Maybe<SavedItemsFilter>;
  sort?: Maybe<SavedItemsSort>;
  pagination?: Maybe<PaginationInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSavedItemsByOffsetArgs = {
  filter?: Maybe<SavedItemsFilter>;
  sort?: Maybe<SavedItemsSort>;
  pagination?: Maybe<OffsetPaginationInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserTagsArgs = {
  pagination?: Maybe<PaginationInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserTagsListArgs = {
  syncSince?: Maybe<Scalars['ISOString']>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSavedItemByIdArgs = {
  id: Scalars['ID'];
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSaveByIdArgs = {
  ids: Array<Scalars['ID']>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSearchArgs = {
  params: SearchParams;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSearchSavedItemsArgs = {
  term: Scalars['String'];
  filter?: Maybe<SearchFilterInput>;
  sort?: Maybe<SearchSortInput>;
  pagination?: Maybe<PaginationInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserAdvancedSearchArgs = {
  queryString?: Maybe<Scalars['String']>;
  filter?: Maybe<AdvancedSearchFilters>;
  sort?: Maybe<SearchSortInput>;
  pagination?: Maybe<PaginationInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserSearchSavedItemsByOffsetArgs = {
  term: Scalars['String'];
  filter?: Maybe<SearchFilterInput>;
  sort?: Maybe<SearchSortInput>;
  pagination?: Maybe<OffsetPaginationInput>;
};

/** Resolve by reference the User entity in this graph to provide user data with public lists. */
export type UserAdvancedSearchByOffsetArgs = {
  queryString?: Maybe<Scalars['String']>;
  filter?: Maybe<AdvancedSearchFilters>;
  sort?: Maybe<SearchSortInput>;
  pagination?: Maybe<OffsetPaginationInput>;
};

export type UserRecommendationPreferences = {
  __typename?: 'UserRecommendationPreferences';
  /** Topics that the user expressed interest in. */
  preferredTopics?: Maybe<Array<Topic>>;
};

/** A Video, typically within an Article View of an Item or if the Item is a video itself. */
export type Video = {
  __typename?: 'Video';
  /** If known, the height of the video in px */
  height?: Maybe<Scalars['Int']>;
  /** Absolute url to the video */
  src: Scalars['String'];
  /** The type of video */
  type: VideoType;
  /** The video's id within the service defined by type */
  vid?: Maybe<Scalars['String']>;
  /**
   * The id of the video within Article View. Item.article will have placeholders
   * of <div id='RIL_VID_X' /> where X is this id. Apps can download those images
   * as needed and populate them in their article view.
   */
  videoId: Scalars['Int'];
  /** If known, the width of the video in px */
  width?: Maybe<Scalars['Int']>;
  /** If known, the length of the video in seconds */
  length?: Maybe<Scalars['Int']>;
};

export enum Videoness {
  /** No videos (v3 value is 0) */
  NoVideos = 'NO_VIDEOS',
  /** Contains videos (v3 value is 1) */
  HasVideos = 'HAS_VIDEOS',
  /** Is a video (v3 value is 2) */
  IsVideo = 'IS_VIDEO',
}

export enum VideoType {
  /** Youtube (v3 value is 1) */
  Youtube = 'YOUTUBE',
  /** Vimeo Link (v3 value is 2) */
  VimeoLink = 'VIMEO_LINK',
  /** Vimeo Moogaloop (v3 value is 3) */
  VimeoMoogaloop = 'VIMEO_MOOGALOOP',
  /** video iframe (v3 value is 4) */
  VimeoIframe = 'VIMEO_IFRAME',
  /** html5 (v3 value is 5) */
  Html5 = 'HTML5',
  /** Flash (v3 value is 6) */
  Flash = 'FLASH',
  /** iframe (v3 value is 7) */
  Iframe = 'IFRAME',
  /** Brightcove (v3 value is 8) */
  Brightcove = 'BRIGHTCOVE',
  /** Dailymotion (v3 value is 9) */
  Dailymotion = 'DAILYMOTION',
}

export type GetSavedItemsQueryVariables = Exact<{
  filter?: Maybe<SavedItemsFilter>;
  sort?: Maybe<SavedItemsSort>;
  pagination?: Maybe<PaginationInput>;
}>;

export type GetSavedItemsQuery = { __typename?: 'Query' } & {
  user?: Maybe<
    { __typename?: 'User' } & {
      savedItems?: Maybe<
        & { __typename?: 'SavedItemConnection' }
        & Pick<
          SavedItemConnection,
          'totalCount'
        >
        & {
          edges?: Maybe<
            Array<
              Maybe<
                & { __typename?: 'SavedItemEdge' }
                & Pick<
                  SavedItemEdge,
                  'cursor'
                >
                & {
                  node?: Maybe<
                    & { __typename: 'SavedItem' }
                    & Pick<
                      SavedItem,
                      | '_createdAt'
                      | '_updatedAt'
                      | 'title'
                      | 'url'
                      | 'status'
                      | 'isFavorite'
                      | 'favoritedAt'
                      | 'isArchived'
                      | 'archivedAt'
                    >
                    & { savedId: SavedItem['id'] }
                    & {
                      item:
                        | (
                          & { __typename: 'PendingItem' }
                          & Pick<
                            PendingItem,
                            'itemId' | 'status' | 'url'
                          >
                        )
                        | (
                          & { __typename: 'Item' }
                          & Pick<
                            Item,
                            | 'isArticle'
                            | 'hasImage'
                            | 'hasVideo'
                            | 'timeToRead'
                            | 'itemId'
                            | 'givenUrl'
                          >
                          & { shareId: Item['id'] }
                          & {
                            preview?: Maybe<
                              | (
                                & { __typename?: 'ItemSummary' }
                                & Pick<
                                  ItemSummary,
                                  | 'excerpt'
                                  | 'title'
                                  | 'datePublished'
                                  | 'url'
                                >
                                & { previewId: ItemSummary['id'] }
                                & {
                                  image?: Maybe<
                                    & { __typename?: 'Image' }
                                    & Pick<
                                      Image,
                                      'caption' | 'credit' | 'url'
                                    >
                                    & {
                                      cachedImages?: Maybe<
                                        Array<
                                          Maybe<
                                            & {
                                              __typename?: 'CachedImage';
                                            }
                                            & Pick<
                                              CachedImage,
                                              'url' | 'id'
                                            >
                                          >
                                        >
                                      >;
                                    }
                                  >;
                                  authors?: Maybe<
                                    Array<
                                      {
                                        __typename?: 'Author';
                                      } & Pick<Author, 'name'>
                                    >
                                  >;
                                  domain?: Maybe<
                                    {
                                      __typename?: 'DomainMetadata';
                                    } & Pick<DomainMetadata, 'name'>
                                  >;
                                }
                              )
                              | (
                                & { __typename?: 'OEmbed' }
                                & Pick<
                                  OEmbed,
                                  | 'excerpt'
                                  | 'title'
                                  | 'datePublished'
                                  | 'url'
                                  | 'htmlEmbed'
                                  | 'type'
                                >
                                & { previewId: OEmbed['id'] }
                                & {
                                  image?: Maybe<
                                    & { __typename?: 'Image' }
                                    & Pick<
                                      Image,
                                      'caption' | 'credit' | 'url'
                                    >
                                    & {
                                      cachedImages?: Maybe<
                                        Array<
                                          Maybe<
                                            & {
                                              __typename?: 'CachedImage';
                                            }
                                            & Pick<
                                              CachedImage,
                                              'url' | 'id'
                                            >
                                          >
                                        >
                                      >;
                                    }
                                  >;
                                  authors?: Maybe<
                                    Array<
                                      {
                                        __typename?: 'Author';
                                      } & Pick<Author, 'name'>
                                    >
                                  >;
                                  domain?: Maybe<
                                    {
                                      __typename?: 'DomainMetadata';
                                    } & Pick<DomainMetadata, 'name'>
                                  >;
                                }
                              )
                            >;
                          }
                        );
                      tags?: Maybe<
                        Array<
                          & { __typename?: 'Tag' }
                          & Pick<
                            Tag,
                            'id' | 'name'
                          >
                        >
                      >;
                      annotations?: Maybe<
                        { __typename?: 'SavedItemAnnotations' } & {
                          highlights?: Maybe<
                            Array<
                              Maybe<
                                & { __typename?: 'Highlight' }
                                & Pick<
                                  Highlight,
                                  | 'id'
                                  | 'quote'
                                  | 'patch'
                                  | 'version'
                                  | '_createdAt'
                                  | '_updatedAt'
                                >
                                & {
                                  note?: Maybe<
                                    & {
                                      __typename?: 'HighlightNote';
                                    }
                                    & Pick<
                                      HighlightNote,
                                      | 'text'
                                      | '_createdAt'
                                      | '_updatedAt'
                                    >
                                  >;
                                }
                              >
                            >
                          >;
                        }
                      >;
                    }
                  >;
                }
              >
            >
          >;
          pageInfo:
            & { __typename?: 'PageInfo' }
            & Pick<
              PageInfo,
              'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
            >;
        }
      >;
    }
  >;
};

export type GetSavedItemByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetSavedItemByIdQuery = { __typename?: 'Query' } & {
  user?: Maybe<
    { __typename?: 'User' } & {
      savedItemById?: Maybe<
        { __typename?: 'SavedItem' } & {
          annotations?: Maybe<
            { __typename?: 'SavedItemAnnotations' } & {
              highlights?: Maybe<
                Array<
                  Maybe<
                    & { __typename?: 'Highlight' }
                    & Pick<
                      Highlight,
                      | 'id'
                      | 'quote'
                      | 'patch'
                      | 'version'
                      | '_createdAt'
                      | '_updatedAt'
                    >
                    & {
                      note?: Maybe<
                        & { __typename?: 'HighlightNote' }
                        & Pick<
                          HighlightNote,
                          'text' | '_createdAt' | '_updatedAt'
                        >
                      >;
                    }
                  >
                >
              >;
            }
          >;
          item:
            | (
              & { __typename?: 'PendingItem' }
              & Pick<
                PendingItem,
                'itemId' | 'status' | 'url'
              >
            )
            | ({ __typename?: 'Item' } & ItemDetailsFragment);
        } & SavedItemDetailsFragment
      >;
    }
  >;
};

export type GetSavedItemBySlugQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetSavedItemBySlugQuery = { __typename?: 'Query' } & {
  readerSlug:
    & { __typename?: 'ReaderViewResult' }
    & Pick<
      ReaderViewResult,
      'slug'
    >
    & {
      fallbackPage?: Maybe<
        | ({ __typename?: 'ReaderInterstitial' } & {
          itemCard?: Maybe<
            | ({ __typename?: 'ItemSummary' } & {
              item?: Maybe<{ __typename?: 'Item' } & ItemDetailsFragment>;
            })
            | ({ __typename?: 'OEmbed' } & {
              item?: Maybe<{ __typename?: 'Item' } & ItemDetailsFragment>;
            })
          >;
        })
        | { __typename?: 'ItemNotFound' }
      >;
      savedItem?: Maybe<
        { __typename?: 'SavedItem' } & {
          annotations?: Maybe<
            { __typename?: 'SavedItemAnnotations' } & {
              highlights?: Maybe<
                Array<
                  Maybe<
                    & { __typename?: 'Highlight' }
                    & Pick<
                      Highlight,
                      | 'id'
                      | 'quote'
                      | 'patch'
                      | 'version'
                      | '_createdAt'
                      | '_updatedAt'
                    >
                    & {
                      note?: Maybe<
                        & { __typename?: 'HighlightNote' }
                        & Pick<
                          HighlightNote,
                          'text' | '_createdAt' | '_updatedAt'
                        >
                      >;
                    }
                  >
                >
              >;
            }
          >;
          item:
            | { __typename?: 'PendingItem' }
            | ({ __typename?: 'Item' } & Pick<Item, 'article'> & {
              relatedAfterArticle: Array<
                { __typename?: 'CorpusRecommendation' } & {
                  corpusRecommendationId: CorpusRecommendation['id'];
                } & {
                  corpusItem:
                    & { __typename?: 'CorpusItem' }
                    & Pick<
                      CorpusItem,
                      'publisher' | 'title' | 'id' | 'excerpt'
                    >
                    & {
                      thumbnail: CorpusItem['imageUrl'];
                      externalUrl: CorpusItem['url'];
                      saveUrl: CorpusItem['url'];
                    };
                }
              >;
            } & ItemDetailsFragment);
        } & SavedItemDetailsFragment
      >;
    };
};

export type ItemDetailsFragment =
  & { __typename?: 'Item' }
  & Pick<
    Item,
    | 'isArticle'
    | 'title'
    | 'itemId'
    | 'readerSlug'
    | 'resolvedId'
    | 'resolvedUrl'
    | 'domain'
    | 'excerpt'
    | 'hasImage'
    | 'hasVideo'
    | 'topImageUrl'
    | 'timeToRead'
    | 'givenUrl'
    | 'normalUrl'
    | 'ssml'
    | 'wordCount'
    | 'datePublished'
    | 'article'
  >
  & { shareId: Item['id'] }
  & {
    domainMetadata?: Maybe<
      { __typename?: 'DomainMetadata' } & Pick<DomainMetadata, 'name'>
    >;
    images?: Maybe<
      Array<
        Maybe<
          & { __typename?: 'Image' }
          & Pick<
            Image,
            'caption' | 'credit' | 'height' | 'imageId' | 'src' | 'width'
          >
        >
      >
    >;
    videos?: Maybe<
      Array<
        Maybe<
          & { __typename?: 'Video' }
          & Pick<
            Video,
            'vid' | 'videoId' | 'type' | 'src'
          >
        >
      >
    >;
    collection?: Maybe<
      & { __typename?: 'Collection' }
      & Pick<
        Collection,
        'imageUrl' | 'intro' | 'title' | 'excerpt'
      >
    >;
    authors?: Maybe<
      Array<
        Maybe<{ __typename?: 'Author' } & Pick<Author, 'id' | 'name' | 'url'>>
      >
    >;
    syndicatedArticle?: Maybe<
      { __typename?: 'SyndicatedArticle' } & Pick<SyndicatedArticle, 'slug'> & {
        publisher?: Maybe<
          { __typename?: 'Publisher' } & Pick<Publisher, 'name' | 'url'>
        >;
      }
    >;
  };

export type SavedItemDetailsFragment =
  & { __typename?: 'SavedItem' }
  & Pick<
    SavedItem,
    | '_createdAt'
    | '_updatedAt'
    | '_version'
    | 'id'
    | 'title'
    | 'url'
    | 'status'
    | 'isFavorite'
    | 'favoritedAt'
    | 'isArchived'
    | 'archivedAt'
  >
  & { savedId: SavedItem['id'] }
  & {
    tags?: Maybe<Array<{ __typename?: 'Tag' } & Pick<Tag, 'id' | 'name'>>>;
    annotations?: Maybe<
      { __typename?: 'SavedItemAnnotations' } & {
        highlights?: Maybe<
          Array<
            Maybe<
              & { __typename?: 'Highlight' }
              & Pick<
                Highlight,
                | '_createdAt'
                | '_updatedAt'
                | 'id'
                | 'quote'
                | 'patch'
                | 'version'
              >
              & {
                note?: Maybe<
                  & { __typename?: 'HighlightNote' }
                  & Pick<
                    HighlightNote,
                    'text' | '_createdAt' | '_updatedAt'
                  >
                >;
              }
            >
          >
        >;
      }
    >;
  };
