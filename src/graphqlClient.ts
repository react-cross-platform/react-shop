import { ApolloClient, InMemoryCache } from "@apollo/client";

const USE_QUERY_BATCHING = false;

const opts = {
  credentials: "include"
} as any;

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

export default client;
