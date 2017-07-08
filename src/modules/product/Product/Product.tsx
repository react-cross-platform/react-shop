import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";

import { IData } from "../../../model";
import { ACTION_ADD_VIEWED_PRODUCT } from "../../catalog/constants";
import { Loading } from "../../layout/index";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { Images, ProductBuy, ProductInfo } from "../index";
import { ICurrentDataProduct, IProduct } from "../model";

const PRODUCT_QUERY = require("./product.gql");

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IDataProduct extends IData {
  product: IProduct;
}

interface IConnectedProductProps {
  data: IDataProduct;
  product: ICurrentDataProduct;
  dispatch: any;
}

interface IProductProps {
  id: string;
}

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

const getActiveSubProduct = (subProducts, subProductId) => {
  return subProducts.filter(sp => sp.id === subProductId)[0] || subProducts[0];
};

function createMarkup(html) {
  return { __html: html };
}

class Product extends React.Component<
  IConnectedProductProps & IProductProps,
  any
> {
  constructor(props) {
    super(props);
    const { dispatch, id } = props;
    dispatch({ type: ACTION_ADD_VIEWED_PRODUCT, productId: id });
  }

  componentWillReceiveProps = nextProps => {
    const { data } = nextProps;
    const { loading, product } = data;
    if (loading === false) {
      const { subProducts } = product;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      const subProductColor = product.images[0].id;
      if (subProductIds.indexOf(subProductId) === -1) {
        this.props.dispatch({
          colorId: subProductColor,
          subProductId: subProductIds[0],
          type: ACTION_SELECT_SUBPRODUCT
        });
      }
    }
  };

  render() {
    const { data } = this.props;
    const { loading, product } = data;
    const { subProductId, colorId } = this.props.product;
    if (loading === true || subProductId === null) {
      return <Loading />;
    }
    const { images, subProducts } = product;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);
    const { price, oldPrice } = activeSubProduct;

    return (
      <div className={styles.product}>
        <Images images={images} />
        <ProductInfo
          dataProduct={product}
          activeSubProduct={activeSubProduct}
        />
        <ProductBuy price={price} oldPrice={oldPrice} />
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product
});

export default compose(
  connect<IConnectedProductProps, {}, IProductProps>(mapStateToProps),
  graphql(gql(PRODUCT_QUERY), options)
)(Product);
