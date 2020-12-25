import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { getAccessToken } from "./accessToken";

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? `http://localhost:4000/graphql`
      : "https://api.henril.com/graphql",
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
