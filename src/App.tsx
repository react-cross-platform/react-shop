import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import client from "./graphqlClient";
import history from "./history";
import { RouteSwitch } from "./routes";
import store from "./store";

const App = (props) => {
  return (
    <ApolloProvider store={store} client={client as any}>
      <ConnectedRouter history={history}>
        <Route component={RouteSwitch} />
      </ConnectedRouter>
    </ApolloProvider>
  );
};

export default App;
