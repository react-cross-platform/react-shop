import { Flex } from "antd-mobile";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import client from "./graphqlClient";
import history from "./history";
import { CartModal } from "./modules/cart/index";
import { FlatPageModal, Header, Layout } from "./modules/layout/index";
import { ProductModal } from "./modules/product/index";
import { CartPage, CategoryPage, HomePage, ProductPage } from "./pages/index";
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
      <Flex direction="column" className="full-size">
        <Switch location={_location}>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/" component={CartPage} />
        </Switch>

        {isModal
          ? <Flex direction="column" className="full-size">
              <Route path="/flatpage/:id" component={FlatPageModal} />
              <Route path="/product/:id" component={ProductModal} />
              <Route path="/cart/" component={CartModal} />
            </Flex>
          : null}
      </Flex>
    );
  }
}

const App = () => {
  return (
    <ApolloProvider store={store} client={client}>
      <ConnectedRouter history={history}>
        <Layout header={<Header />}>
          <Route component={ModalSwitch} />
        </Layout>
      </ConnectedRouter>
    </ApolloProvider>
  );
};

export default App;
