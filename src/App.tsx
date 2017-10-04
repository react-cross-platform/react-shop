import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import client from './graphqlClient';
import history from './history';
import { Header, Layout } from './modules/layout/index';
import Routing from './routing';
import store from './store';

const App = () => {
  return (
    <ApolloProvider store={store} client={client as any}>
      <ConnectedRouter history={history}>
        <Layout header={<Header />}>
          <Route component={Routing} />
        </Layout>
      </ConnectedRouter>
    </ApolloProvider>
  );
};

export default App;
