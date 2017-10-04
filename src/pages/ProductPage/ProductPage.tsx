import * as React from "react";
import { Product } from "../../modules/product/index";
import { IPage } from "../interfaces";

interface IProductPageProps extends IPage {}

class ProductPage extends React.Component<IProductPageProps, {}> {
  render() {
    const { match } = this.props;
    return <Product id={match.params.id} />;
  }
}

export default ProductPage;
