import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  getAccessToken: AuthResponse;
  refreshAccessToken: RefreshTokenResponse;
};


export type MutationGetAccessTokenArgs = {
  code: Scalars['String'];
};


export type MutationRefreshAccessTokenArgs = {
  refreshToken: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  refreshToken: Scalars['String'];
  expires: Scalars['Float'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  token: Scalars['String'];
  expires: Scalars['Float'];
};

export type GetAccessTokenMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GetAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & { getAccessToken: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token' | 'expires'>
  ) }
);


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
        return Apollo.useMutation<GetAccessTokenMutation, GetAccessTokenMutationVariables>(GetAccessTokenDocument, baseOptions);
      }
export type GetAccessTokenMutationHookResult = ReturnType<typeof useGetAccessTokenMutation>;
export type GetAccessTokenMutationResult = Apollo.MutationResult<GetAccessTokenMutation>;
export type GetAccessTokenMutationOptions = Apollo.BaseMutationOptions<GetAccessTokenMutation, GetAccessTokenMutationVariables>;