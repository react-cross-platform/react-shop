import { Flex } from "antd-mobile";
import * as React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { CartModal } from "./modules/cart/index";
import { FlatPageModal } from "./modules/layout/index";
import { ProductModal } from "./modules/product/index";
import { CartPage, CategoryPage, HomePage, ProductPage } from "./pages/index";

export const PATH_NAMES = {
  home: "/",
  category: "/category/:id/",
  product: "/product/:id/",
  cart: "/cart/",
  flatpage: "/flatpage/:id/"
};

class MyRoute extends React.Component<any, any> {
  render() {
    return <Route {...this.props} />;
  }
}

// tslint:disable-next-line:max-classes-per-file
class Routing extends React.Component<any, any> {
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
          <MyRoute exact={true} path={PATH_NAMES.home} component={HomePage} />
          <MyRoute path={PATH_NAMES.category} component={CategoryPage} />
          <MyRoute path={PATH_NAMES.product} component={ProductPage} />
          <MyRoute path={PATH_NAMES.cart} component={CartPage} />
        </Switch>

        {isModal
          ? <Flex direction="column" className="full-size">
              <MyRoute path={PATH_NAMES.flatpage} component={FlatPageModal} />
              <MyRoute path={PATH_NAMES.product} component={ProductModal} />
              <MyRoute path={PATH_NAMES.cart} component={CartModal} />
            </Flex>
          : null}
      </Flex>
    );
  }
}

export default Routing;
