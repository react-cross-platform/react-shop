import * as React from "react";
import { Product } from "../../modules/product/index";

class ProductPage extends React.Component<any, any> {
  render() {
    const { match } = this.props;
    return <Product history={null} id={match.params.id} isModal={false} />;
  }
}

export default ProductPage;
