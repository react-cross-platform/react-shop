import * as React from "react";

import { Cart } from "../../modules/cart/index";
import { IPage } from "../interfaces";

interface ICartPageProps extends IPage {}

class CartPage extends React.Component<ICartPageProps, undefined> {
  render() {
    const { location, history } = this.props;
    return <Cart history={history} isModal={false} />;
  }
}

export default CartPage;
