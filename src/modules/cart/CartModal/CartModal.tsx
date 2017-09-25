import * as React from "react";

import { IData } from "../../../model";
import { Modal } from "../../layout/index";
import { getCartItemTotalPrice } from "../CartItem/CartItem";
import { Cart } from "../index";
import { ICart } from "../model";

const styles = require("./styles.css");

interface IConnectedCartModalProps {}

export interface ICartModalProps {
  history: any;
  location: any;
}

class CartModal extends React.Component<
  IConnectedCartModalProps & ICartModalProps,
  undefined
> {
  render() {
    const { history, location } = this.props;
    return (
      <Modal location={location} history={history}>
        <Cart history={history} isModal={true} />
      </Modal>
    );
  }
}

export default CartModal as any;
