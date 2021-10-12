import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  albumGroup: Scalars['String'];
  albumType: Scalars['String'];
  availableMarkets: Array<Scalars['String']>;
  externalSpotifyUrl: Scalars['String'];
  href: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  releaseDate: Scalars['String'];
  spotifyUri: Scalars['String'];
  trackCount: Scalars['Float'];
  type: Scalars['String'];
};

export type AlbumResponse = {
  __typename?: 'AlbumResponse';
  albums: Array<Album>;
  pages: SpotifyPagination;
};

export type Artist = {
  __typename?: 'Artist';
  genres: Array<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  spotifyUri: Scalars['String'];
};

export type ArtistSearchFilter = {
  limit?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  start?: Maybe<Scalars['Float']>;
};

export type ArtistsResponse = {
  __typename?: 'ArtistsResponse';
  artists: Array<Artist>;
  pages: SpotifyPagination;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  expires: Scalars['Float'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getAccessToken: AuthResponse;
  logout: Scalars['Boolean'];
};


export type MutationGetAccessTokenArgs = {
  code: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  artistAlbums: AlbumResponse;
  artistById: Artist;
  artistListByName: ArtistsResponse;
  artistRecommendations: ArtistsResponse;
  similarArtists: Array<Artist>;
  user: User;
};


export type QueryArtistAlbumsArgs = {
  artistId: Scalars['String'];
  offset?: Maybe<Scalars['Float']>;
};


export type QueryArtistByIdArgs = {
  id: Scalars['String'];
};


export type QueryArtistListByNameArgs = {
  filter: ArtistSearchFilter;
};


export type QuerySimilarArtistsArgs = {
  artistId: Scalars['String'];
};

export type SpotifyPagination = {
  __typename?: 'SpotifyPagination';
  limit: Scalars['Float'];
  start: Scalars['Float'];
  total: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type GetAccessTokenMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GetAccessTokenMutation = { __typename?: 'Mutation', getAccessToken: { __typename?: 'AuthResponse', token: string, expires: number } };

export type ArtistAlbumsQueryVariables = Exact<{
  artistId: Scalars['String'];
  offset?: Maybe<Scalars['Float']>;
}>;


export type ArtistAlbumsQuery = { __typename?: 'Query', artistAlbums: { __typename?: 'AlbumResponse', pages: { __typename?: 'SpotifyPagination', start: number, limit: number, total: number }, albums: Array<{ __typename?: 'Album', albumGroup: string, albumType: string, availableMarkets: Array<string>, id: string, name: string, spotifyUri: string, externalSpotifyUrl: string, image?: string | null | undefined }> } };

export type ArtistByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ArtistByIdQuery = { __typename?: 'Query', artistById: { __typename?: 'Artist', id: string, name: string, genres: Array<string>, image?: string | null | undefined, href?: string | null | undefined, spotifyUri: string } };

export type ArtistListByNameQueryVariables = Exact<{
  filter: ArtistSearchFilter;
}>;


export type ArtistListByNameQuery = { __typename?: 'Query', artistListByName: { __typename?: 'ArtistsResponse', pages: { __typename?: 'SpotifyPagination', start: number, limit: number, total: number }, artists: Array<{ __typename?: 'Artist', id: string, name: string, genres: Array<string>, image?: string | null | undefined, href?: string | null | undefined, spotifyUri: string }> } };

export type ArtistRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistRecommendationsQuery = { __typename?: 'Query', artistRecommendations: { __typename: 'ArtistsResponse', artists: Array<{ __typename: 'Artist', id: string, name: string, genres: Array<string>, image?: string | null | undefined, href?: string | null | undefined, spotifyUri: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SimilarArtistsQueryVariables = Exact<{
  artistId: Scalars['String'];
}>;


export type SimilarArtistsQuery = { __typename?: 'Query', similarArtists: Array<{ __typename?: 'Artist', id: string, name: string, genres: Array<string>, image?: string | null | undefined, href?: string | null | undefined, spotifyUri: string }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, imageUrl?: string | null | undefined } };


export const GetAccessTokenDocument = gql`
    mutation getAccessToken($code: String!) {
  getAccessToken(code: $code) {
    token
    expires
  }
}
    `;
export type GetAccessTokenMutationFn = Apollo.MutationFunction<GetAccessTokenMutation, GetAccessTokenMutationVariables>;

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
export function useGetAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<GetAccessTokenMutation, GetAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAccessTokenMutation, GetAccessTokenMutationVariables>(GetAccessTokenDocument, options);
      }
export type GetAccessTokenMutationHookResult = ReturnType<typeof useGetAccessTokenMutation>;
export type GetAccessTokenMutationResult = Apollo.MutationResult<GetAccessTokenMutation>;
export type GetAccessTokenMutationOptions = Apollo.BaseMutationOptions<GetAccessTokenMutation, GetAccessTokenMutationVariables>;
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
export function useArtistAlbumsQuery(baseOptions: Apollo.QueryHookOptions<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>(ArtistAlbumsDocument, options);
      }
export function useArtistAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>(ArtistAlbumsDocument, options);
        }
export type ArtistAlbumsQueryHookResult = ReturnType<typeof useArtistAlbumsQuery>;
export type ArtistAlbumsLazyQueryHookResult = ReturnType<typeof useArtistAlbumsLazyQuery>;
export type ArtistAlbumsQueryResult = Apollo.QueryResult<ArtistAlbumsQuery, ArtistAlbumsQueryVariables>;
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
export function useArtistByIdQuery(baseOptions: Apollo.QueryHookOptions<ArtistByIdQuery, ArtistByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistByIdQuery, ArtistByIdQueryVariables>(ArtistByIdDocument, options);
      }
export function useArtistByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistByIdQuery, ArtistByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistByIdQuery, ArtistByIdQueryVariables>(ArtistByIdDocument, options);
        }
export type ArtistByIdQueryHookResult = ReturnType<typeof useArtistByIdQuery>;
export type ArtistByIdLazyQueryHookResult = ReturnType<typeof useArtistByIdLazyQuery>;
export type ArtistByIdQueryResult = Apollo.QueryResult<ArtistByIdQuery, ArtistByIdQueryVariables>;
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
export function useArtistListByNameQuery(baseOptions: Apollo.QueryHookOptions<ArtistListByNameQuery, ArtistListByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistListByNameQuery, ArtistListByNameQueryVariables>(ArtistListByNameDocument, options);
      }
export function useArtistListByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistListByNameQuery, ArtistListByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistListByNameQuery, ArtistListByNameQueryVariables>(ArtistListByNameDocument, options);
        }
export type ArtistListByNameQueryHookResult = ReturnType<typeof useArtistListByNameQuery>;
export type ArtistListByNameLazyQueryHookResult = ReturnType<typeof useArtistListByNameLazyQuery>;
export type ArtistListByNameQueryResult = Apollo.QueryResult<ArtistListByNameQuery, ArtistListByNameQueryVariables>;
export const ArtistRecommendationsDocument = gql`
    query artistRecommendations {
  artistRecommendations {
    artists {
      id
      name
      genres
      image
      href
      spotifyUri
      __typename
    }
    __typename
  }
}
    `;

/**
 * __useArtistRecommendationsQuery__
 *
 * To run a query within a React component, call `useArtistRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistRecommendationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistRecommendationsQuery(baseOptions?: Apollo.QueryHookOptions<ArtistRecommendationsQuery, ArtistRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistRecommendationsQuery, ArtistRecommendationsQueryVariables>(ArtistRecommendationsDocument, options);
      }
export function useArtistRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistRecommendationsQuery, ArtistRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistRecommendationsQuery, ArtistRecommendationsQueryVariables>(ArtistRecommendationsDocument, options);
        }
export type ArtistRecommendationsQueryHookResult = ReturnType<typeof useArtistRecommendationsQuery>;
export type ArtistRecommendationsLazyQueryHookResult = ReturnType<typeof useArtistRecommendationsLazyQuery>;
export type ArtistRecommendationsQueryResult = Apollo.QueryResult<ArtistRecommendationsQuery, ArtistRecommendationsQueryVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export function useSimilarArtistsQuery(baseOptions: Apollo.QueryHookOptions<SimilarArtistsQuery, SimilarArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimilarArtistsQuery, SimilarArtistsQueryVariables>(SimilarArtistsDocument, options);
      }
export function useSimilarArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimilarArtistsQuery, SimilarArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimilarArtistsQuery, SimilarArtistsQueryVariables>(SimilarArtistsDocument, options);
        }
export type SimilarArtistsQueryHookResult = ReturnType<typeof useSimilarArtistsQuery>;
export type SimilarArtistsLazyQueryHookResult = ReturnType<typeof useSimilarArtistsLazyQuery>;
export type SimilarArtistsQueryResult = Apollo.QueryResult<SimilarArtistsQuery, SimilarArtistsQueryVariables>;
export const UserDocument = gql`
    query user {
  user {
    id
    name
    imageUrl
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;