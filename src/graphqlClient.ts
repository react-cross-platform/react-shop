import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink, HttpLink } from "apollo-link-http";
import apolloLogger from "apollo-link-logger";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT!,
  credentials: "include"
});

const link = ApolloLink.from([apolloLogger, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
