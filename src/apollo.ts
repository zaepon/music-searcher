import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { getAccessToken } from "./accessToken";

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}`,
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: getAccessToken(),
    },
  });
  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
