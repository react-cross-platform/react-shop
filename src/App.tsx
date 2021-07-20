import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";

import client from "./graphqlClient";
import history from "./history";
import { RouteSwitch } from "./routes";
import store from "./store";

const App = (props) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client as any}>
        <ConnectedRouter history={history}>
          <Route component={RouteSwitch} />
        </ConnectedRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
