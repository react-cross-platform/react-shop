import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import client from "./graphqlClient";
import history from "./history";
import { RouteSwitch } from "./routes";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ConnectedRouter history={history}>
          <Route component={RouteSwitch} />
        </ConnectedRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
