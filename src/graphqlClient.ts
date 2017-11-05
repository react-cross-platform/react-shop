import ApolloClient, { createBatchingNetworkInterface } from "apollo-client";
import { createNetworkInterface } from "react-apollo";

// const USE_QUERY_BATCHING = true;
const USE_QUERY_BATCHING = false;

const opts = {
  credentials: "include"
} as any;

const networkInterface = USE_QUERY_BATCHING
  ? createBatchingNetworkInterface({
      uri: process.env.GRAPHQL_ENDPOINT,
      opts,
      batchInterval: 10, // in milliseconds
      batchMax: 10
    })
  : createNetworkInterface({
      uri: process.env.GRAPHQL_ENDPOINT,
      opts
    });

const client = new ApolloClient({
  networkInterface
});

export default client;
