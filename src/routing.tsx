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
          <Route exact={true} path={PATH_NAMES.home} component={HomePage} />
          <Route path={PATH_NAMES.category} component={CategoryPage as any} />
          <Route path={PATH_NAMES.product} component={ProductPage as any} />
          <Route path={PATH_NAMES.cart} component={CartPage as any} />
        </Switch>

        {isModal
          ? <Flex direction="column" className="full-size">
              <Route path={PATH_NAMES.flatpage} component={FlatPageModal as any} />
              <Route path={PATH_NAMES.product} component={ProductModal as any} />
              <Route path={PATH_NAMES.cart} component={CartModal} />
            </Flex>
          : null}
      </Flex>
    );
  }
}

export default Routing;
