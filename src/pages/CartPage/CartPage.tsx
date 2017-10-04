import * as React from "react";

import { Cart } from "../../modules/cart/index";
import { IPage } from "../interfaces";

class CartPage extends React.Component<IPage, {}> {
  render() {
    const { location, history } = this.props;
    return <Cart history={history} isModal={false} />;
  }
}

export default CartPage;
