import { Product } from "@src/modules/product";
import * as React from "react";

import { MyModal } from "../index";
import { IPage } from "../interfaces";

export interface OwnProps extends IPage {}

class ProductModal extends React.Component<OwnProps, {}> {
  render() {
    const { match, history, location } = this.props;
    return (
      <MyModal location={location} history={history}>
        <Product id={match.params.id} />
      </MyModal>
    );
  }
}

export default ProductModal;
