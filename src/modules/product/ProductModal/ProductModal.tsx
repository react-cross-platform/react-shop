import * as React from "react";

import { Modal } from "../../layout/index";
import { Product } from "../index";

const styles = require("./styles.css");

export interface IProductModalProps {
  location: any;
  history: any;
  match: any;
}

class ProductModal extends React.Component<IProductModalProps, {}> {
  render() {
    const { match, history, location } = this.props;
    return (
      <Modal location={location} history={history}>
        <Product id={match.params.id} />
      </Modal>
    );
  }
}

export default ProductModal;
