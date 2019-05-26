import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import client from "./graphqlClient";
import history from "./history";
import GoogleAnalytics from "./modules/common/api/GoogleAnalytics/GoogleAnalytics";
import { RouteSwitch } from "./routes";
import store from "./store";

interface Props {}

class App extends React.Component<Props> {
  componentWillMount() {
    GoogleAnalytics.init({ debug: true });
  }

  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <Route component={RouteSwitch} />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
