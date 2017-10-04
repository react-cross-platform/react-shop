import ApolloClient, { createNetworkInterface } from "apollo-client";

const networkInterface = createNetworkInterface({
  uri: process.env.GRAPHQL_ENDPOINT,
  opts: {
    credentials: "include"
  }
});

const client = new ApolloClient({
  networkInterface
});

export default client;
