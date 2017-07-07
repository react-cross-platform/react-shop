import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, Router } from "react-router";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import client from "./graphqlClient";
import history from "./history";
import { CATEGORY_QUERY } from "./modules/catalog/model";
import { FlatPageModal, FlatPages, Layout } from "./modules/layout/index";
import { Product, ProductModal } from "./modules/product/index";
import { CategoryPage, HomePage, ProductPage } from "./pages/index";
import store from "./store";

class FlatPageSwitch extends React.Component<any, any> {
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
    ); // not initial render
    return (
      <div>
        {isModal
          ? <Route path="/flatpage/:id" component={FlatPageModal} />
          : null}
      </div>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
class ProductsSwitch extends React.Component<any, any> {
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
    ); // not initial render
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/product/:id" component={ProductPage} />
        </Switch>
        {isModal
          ? <Route path="/product/:id" component={ProductModal} />
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
          <Route exact={true} path="/" component={HomePage} />
          <Route component={ProductsSwitch} />
          <Route component={FlatPageSwitch} />
        </Layout>
      </ConnectedRouter>
    </ApolloProvider>
  );
};

export default App;
