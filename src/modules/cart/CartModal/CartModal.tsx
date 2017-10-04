import * as React from "react";

import { IPage } from "../../../pages/interfaces";
import { Modal } from "../../layout/index";
import { Cart } from "../index";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class CartModal extends React.Component<OwnProps, {}> {
  render() {
    const { history, location } = this.props;
    return (
      <Modal location={location} history={history}>
        <Cart history={history} isModal={true} />
      </Modal>
    );
  }
}

export default CartModal;
