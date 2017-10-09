import * as React from "react";

import { Product } from "../../modules/product/index";
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
