import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Router } from "react-router";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import client from "./graphqlClient";
import history from "./history";
import { FlatPageModal, FlatPages, Layout } from "./modules/layout/index";
import { Product, ProductModal } from "./modules/product/index";
import { CategoryPage, HomePage, ProductPage } from "./pages/index";
import store from "./store";

class ModalSwitch extends React.Component<any, any> {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    // https://reacttraining.com/react-router/web/example/modal-gallery
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    const _location = isModal ? this.previousLocation : location;

    return (
      <div>
        <Switch location={_location}>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/product/:id" component={ProductPage} />
        </Switch>

        {isModal
          ? <div>
              <Route path="/flatpage/:id" component={FlatPageModal} />
              <Route path="/product/:id" component={ProductModal} />
            </div>
          : null}
      </div>
    );
  }
}

const App = () => {
  return (
    <ApolloProvider store={store} client={client}>
      <ConnectedRouter history={history}>
        <Layout>
          <Route component={ModalSwitch} />
        </Layout>
      </ConnectedRouter>
    </ApolloProvider>
  );
};

export default App;
