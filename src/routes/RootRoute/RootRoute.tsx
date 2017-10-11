import { MyModal } from "@src/routes";
import { IPage } from "@src/routes/interfaces";
import * as React from "react";
import { Route, Switch } from "react-router";

import CartPage from "../CartPage/CartPage";
import CatalogPage from "../CatalogPage/CatalogPage";
import CategoryPage from "../CategoryPage/CategoryPage";
import FlatpagePage from "../FlatpagePage/FlatpagePage";
import FlatpagesPage from "../FlatpagesPage/FlatpagesPage";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";

export const PATH_NAMES = {
  home: "/",
  catalog: "/catalog/",
  category: "/category/:id/",
  product: "/product/:id/",
  cart: "/cart/",
  flatpages: "/flatpages/",
  flatpage: "/flatpage/:id/"
};

const styles = require("./styles.css");

interface Props extends IPage {}

const Container = ({ isModal, location, children }) => {
  return isModal
    ? <MyModal animated={location.state && location.state.animated}>
        {children}
      </MyModal>
    : <Switch location={location}>
        {children}
      </Switch>;
};

class RootRoute extends React.Component<Props, {}> {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps: Props) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  isModal = () => {
    const { location } = this.props;
    return !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
  };

  getLocation = () => {
    const { location } = this.props;
    return this.isModal() ? this.previousLocation : location;
  };

  render() {
    const { location } = this.props;
    const isModal = this.isModal();
    return (
      <div
        className={styles.RootRoute}
        style={{ display: isModal ? "none" : "block" }}
      >
        <Container
          isModal={isModal}
          location={isModal ? location : this.previousLocation}
        >
          <Route exact={true} path={PATH_NAMES.home} component={HomePage} />
          <Route path={PATH_NAMES.flatpages} component={FlatpagesPage} />
          <Route path={PATH_NAMES.flatpage} component={FlatpagePage} />
          <Route path={PATH_NAMES.catalog} component={CatalogPage} />
          <Route path={PATH_NAMES.category} component={CategoryPage} />
          <Route path={PATH_NAMES.product} component={ProductPage} />
          <Route path={PATH_NAMES.cart} component={CartPage} />
        </Container>
      </div>
    );
  }
}

export default RootRoute;
