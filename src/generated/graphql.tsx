import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  artistListByName: ArtistsResponse;
  similarArtists: Array<Artist>;
  artistById: Artist;
  artistAlbums: AlbumResponse;
};

export type QueryArtistListByNameArgs = {
  filter: ArtistSearchFilter;
};

export type QuerySimilarArtistsArgs = {
  artistId: Scalars["String"];
};

export type QueryArtistByIdArgs = {
  id: Scalars["String"];
};

export type QueryArtistAlbumsArgs = {
  offset?: Maybe<Scalars["Float"]>;
  artistId: Scalars["String"];
};

export type ArtistsResponse = {
  __typename?: "ArtistsResponse";
  pages: SpotifyPagination;
  artists: Array<Artist>;
};

export type SpotifyPagination = {
  __typename?: "SpotifyPagination";
  start: Scalars["Float"];
  limit: Scalars["Float"];
  total: Scalars["Float"];
};

export type Artist = {
  __typename?: "Artist";
  genres: Array<Scalars["String"]>;
  href?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  spotifyUri: Scalars["String"];
};

export type ArtistSearchFilter = {
  name: Scalars["String"];
  start?: Maybe<Scalars["Float"]>;
  limit?: Maybe<Scalars["Float"]>;
};

export type AlbumResponse = {
  __typename?: "AlbumResponse";
  pages: SpotifyPagination;
  albums: Array<Album>;
};

export type Album = {
  __typename?: "Album";
  albumGroup: Scalars["String"];
  albumType: Scalars["String"];
  availableMarkets: Array<Scalars["String"]>;
  externalSpotifyUrl: Scalars["String"];
  href: Scalars["String"];
  id: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  releaseDate: Scalars["String"];
  trackCount: Scalars["Float"];
  type: Scalars["String"];
  spotifyUri: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  getAccessToken: AuthResponse;
};

export type MutationGetAccessTokenArgs = {
  code: Scalars["String"];
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  token: Scalars["String"];
  expires: Scalars["Float"];
};

export type GetAccessTokenMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type GetAccessTokenMutation = { __typename?: "Mutation" } & {
  getAccessToken: { __typename?: "AuthResponse" } & Pick<
    AuthResponse,
    "token" | "expires"
  >;
};

export type ArtistAlbumsQueryVariables = Exact<{
  artistId: Scalars["String"];
  offset?: Maybe<Scalars["Float"]>;
}>;

export type ArtistAlbumsQuery = { __typename?: "Query" } & {
  artistAlbums: { __typename?: "AlbumResponse" } & {
    pages: { __typename?: "SpotifyPagination" } & Pick<
      SpotifyPagination,
      "start" | "limit" | "total"
    >;
    albums: Array<
      { __typename?: "Album" } & Pick<
        Album,
        | "albumGroup"
        | "albumType"
        | "availableMarkets"
        | "id"
        | "name"
        | "spotifyUri"
        | "externalSpotifyUrl"
        | "image"
      >
    >;
  };
};

export type ArtistByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type ArtistByIdQuery = { __typename?: "Query" } & {
  artistById: { __typename?: "Artist" } & Pick<
    Artist,
    "id" | "name" | "genres" | "image" | "href" | "spotifyUri"
  >;
};

export type ArtistListByNameQueryVariables = Exact<{
  filter: ArtistSearchFilter;
}>;

export type ArtistListByNameQuery = { __typename?: "Query" } & {
  artistListByName: { __typename?: "ArtistsResponse" } & {
    pages: { __typename?: "SpotifyPagination" } & Pick<
      SpotifyPagination,
      "start" | "limit" | "total"
    >;
    artists: Array<
      { __typename?: "Artist" } & Pick<
        Artist,
        "id" | "name" | "genres" | "image" | "href" | "spotifyUri"
      >
    >;
  };
};

export type SimilarArtistsQueryVariables = Exact<{
  artistId: Scalars["String"];
}>;

export type SimilarArtistsQuery = { __typename?: "Query" } & {
  similarArtists: Array<
    { __typename?: "Artist" } & Pick<
      Artist,
      "id" | "name" | "genres" | "image" | "href" | "spotifyUri"
    >
  >;
};

export const GetAccessTokenDocument = gql`
  mutation getAccessToken($code: String!) {
    getAccessToken(code: $code) {
      token
      expires
    }
  }
`;
export type GetAccessTokenMutationFn = Apollo.MutationFunction<
  GetAccessTokenMutation,
  GetAccessTokenMutationVariables
>;

/**
 * __useGetAccessTokenMutation__
 *
 * To run a mutation, you first call `useGetAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAccessTokenMutation, { data, loading, error }] = useGetAccessTokenMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetAccessTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GetAccessTokenMutation,
    GetAccessTokenMutationVariables
  >
) {
  return Apollo.useMutation<
    GetAccessTokenMutation,
    GetAccessTokenMutationVariables
  >(GetAccessTokenDocument, baseOptions);
}
export type GetAccessTokenMutationHookResult = ReturnType<
  typeof useGetAccessTokenMutation
>;
export type GetAccessTokenMutationResult = Apollo.MutationResult<GetAccessTokenMutation>;
export type GetAccessTokenMutationOptions = Apollo.BaseMutationOptions<
  GetAccessTokenMutation,
  GetAccessTokenMutationVariables
>;
export const ArtistAlbumsDocument = gql`
  query artistAlbums($artistId: String!, $offset: Float) {
    artistAlbums(artistId: $artistId, offset: $offset) {
      pages {
        start
        limit
        total
      }
      albums {
        albumGroup
        albumType
        availableMarkets
        id
        name
        spotifyUri
        externalSpotifyUrl
        image
      }
    }
  }
`;

/**
 * __useArtistAlbumsQuery__
 *
 * To run a query within a React component, call `useArtistAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistAlbumsQuery({
 *   variables: {
 *      artistId: // value for 'artistId'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useArtistAlbumsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ArtistAlbumsQuery,
    ArtistAlbumsQueryVariables
  >
) {
  return Apollo.useQuery<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>(
    ArtistAlbumsDocument,
    baseOptions
  );
}
export function useArtistAlbumsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ArtistAlbumsQuery,
    ArtistAlbumsQueryVariables
  >
) {
  return Apollo.useLazyQuery<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>(
    ArtistAlbumsDocument,
    baseOptions
  );
}
export type ArtistAlbumsQueryHookResult = ReturnType<
  typeof useArtistAlbumsQuery
>;
export type ArtistAlbumsLazyQueryHookResult = ReturnType<
  typeof useArtistAlbumsLazyQuery
>;
export type ArtistAlbumsQueryResult = Apollo.QueryResult<
  ArtistAlbumsQuery,
  ArtistAlbumsQueryVariables
>;
export const ArtistByIdDocument = gql`
  query artistById($id: String!) {
    artistById(id: $id) {
      id
      name
      genres
      image
      href
      spotifyUri
    }
  }
`;

/**
 * __useArtistByIdQuery__
 *
 * To run a query within a React component, call `useArtistByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArtistByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    ArtistByIdQuery,
    ArtistByIdQueryVariables
  >
) {
  return Apollo.useQuery<ArtistByIdQuery, ArtistByIdQueryVariables>(
    ArtistByIdDocument,
    baseOptions
  );
}
export function useArtistByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ArtistByIdQuery,
    ArtistByIdQueryVariables
  >
) {
  return Apollo.useLazyQuery<ArtistByIdQuery, ArtistByIdQueryVariables>(
    ArtistByIdDocument,
    baseOptions
  );
}
export type ArtistByIdQueryHookResult = ReturnType<typeof useArtistByIdQuery>;
export type ArtistByIdLazyQueryHookResult = ReturnType<
  typeof useArtistByIdLazyQuery
>;
export type ArtistByIdQueryResult = Apollo.QueryResult<
  ArtistByIdQuery,
  ArtistByIdQueryVariables
>;
export const ArtistListByNameDocument = gql`
  query artistListByName($filter: ArtistSearchFilter!) {
    artistListByName(filter: $filter) {
      pages {
        start
        limit
        total
      }
      artists {
        id
        name
        genres
        image
        href
        spotifyUri
      }
    }
  }
`;

/**
 * __useArtistListByNameQuery__
 *
 * To run a query within a React component, call `useArtistListByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistListByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistListByNameQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useArtistListByNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    ArtistListByNameQuery,
    ArtistListByNameQueryVariables
  >
) {
  return Apollo.useQuery<ArtistListByNameQuery, ArtistListByNameQueryVariables>(
    ArtistListByNameDocument,
    baseOptions
  );
}
export function useArtistListByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ArtistListByNameQuery,
    ArtistListByNameQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    ArtistListByNameQuery,
    ArtistListByNameQueryVariables
  >(ArtistListByNameDocument, baseOptions);
}
export type ArtistListByNameQueryHookResult = ReturnType<
  typeof useArtistListByNameQuery
>;
export type ArtistListByNameLazyQueryHookResult = ReturnType<
  typeof useArtistListByNameLazyQuery
>;
export type ArtistListByNameQueryResult = Apollo.QueryResult<
  ArtistListByNameQuery,
  ArtistListByNameQueryVariables
>;
export const SimilarArtistsDocument = gql`
  query similarArtists($artistId: String!) {
    similarArtists(artistId: $artistId) {
      id
      name
      genres
      image
      href
      spotifyUri
    }
  }
`;

/**
 * __useSimilarArtistsQuery__
 *
 * To run a query within a React component, call `useSimilarArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimilarArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimilarArtistsQuery({
 *   variables: {
 *      artistId: // value for 'artistId'
 *   },
 * });
 */
export function useSimilarArtistsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SimilarArtistsQuery,
    SimilarArtistsQueryVariables
  >
) {
  return Apollo.useQuery<SimilarArtistsQuery, SimilarArtistsQueryVariables>(
    SimilarArtistsDocument,
    baseOptions
  );
}
export function useSimilarArtistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SimilarArtistsQuery,
    SimilarArtistsQueryVariables
  >
) {
  return Apollo.useLazyQuery<SimilarArtistsQuery, SimilarArtistsQueryVariables>(
    SimilarArtistsDocument,
    baseOptions
  );
}
export type SimilarArtistsQueryHookResult = ReturnType<
  typeof useSimilarArtistsQuery
>;
export type SimilarArtistsLazyQueryHookResult = ReturnType<
  typeof useSimilarArtistsLazyQuery
>;
export type SimilarArtistsQueryResult = Apollo.QueryResult<
  SimilarArtistsQuery,
  SimilarArtistsQueryVariables
>;
