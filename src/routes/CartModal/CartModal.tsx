import * as React from "react";

import { Cart } from "../../modules/cart/index";
import { MyModal } from "../index";
import { IPage } from "../interfaces";

interface OwnProps extends IPage {}

class CartModal extends React.Component<OwnProps, {}> {
  render() {
    const { history, location } = this.props;
    return (
      <MyModal location={location} history={history}>
        <Cart history={history} isModal={true} />
      </MyModal>
    );
  }
}

export default CartModal;
