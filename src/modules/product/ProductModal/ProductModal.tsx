import * as React from "react";

import { Modal } from "../../layout/index";
import { Product } from "../index";

const styles = require("./styles.css");

class ProductModal extends React.Component<any, any> {
  render() {
    const { match, history } = this.props;
    return (
      <Modal>
        <Product history={history} id={match.params.id} isModal={true} />
      </Modal>
    );
  }
}

export default ProductModal;
