import { Flex, WingBlank } from "antd-mobile";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IData } from "../../../model";
import { ACTION_ADD_VIEWED_PRODUCT } from "../../catalog/constants";
import { HEIGHT } from "../../layout/Header/Header";
import { Loading } from "../../layout/index";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { Images, ProductInfo, ProductToCart } from "../index";
import { ICurrentProduct, IProduct, ISubProduct } from "../model";

const PRODUCT_QUERY = require("./product.gql");

const styles = require("./styles.css");

interface IDataProduct extends IData {
  product: IProduct;
}

interface IConnectedProductProps {
  data: IDataProduct;
  product: ICurrentProduct;
  dispatch: Dispatch<{}>;
  router: IRouterReducer;
}

interface IProductProps {
  id: string;
}

const getActiveSubProduct = (subProducts, subProductId): ISubProduct => {
  return subProducts.filter(sp => sp.id === subProductId)[0] || subProducts[0];
};

function createMarkup(html) {
  return { __html: html };
}

class Product extends React.Component<
  IConnectedProductProps & IProductProps,
  any
> {
  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: ACTION_ADD_VIEWED_PRODUCT, productId: id });
  }

  componentWillReceiveProps = nextProps => {
    const { data } = nextProps;
    const { loading, product } = data;
    if (loading === false) {
      const { subProducts } = product;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      const subProductColor = product.images.filter(
        el => el.colorValue !== ""
      )[0].id;
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
    const { data, router } = this.props;
    const { loading, product } = data;
    const { colorId } = this.props.product;
    const subProductId = parseInt(this.props.product.subProductId, 0);
    if (loading === true || subProductId === null) {
      return <Loading />;
    }
    const { id, brand, images, subProducts } = product;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);
    const { price, oldPrice } = activeSubProduct;

    return (
      <Flex direction="column" className={styles.product}>
        <div className={styles.productContent}>
          <Flex
            style={{ height: window.innerHeight - HEIGHT * 2 + 5 }}
            justify="around"
            direction="column"
            className={styles.productFirstScreen}
          >
            <Images images={images} />
            <WingBlank className={styles.productName}>
              {product.name}
              <br />
              {brand.name} {activeSubProduct.article}
            </WingBlank>
          </Flex>
          <ProductInfo
            dataProduct={product}
            activeSubProduct={activeSubProduct}
          />
        </div>
        <ProductToCart
          subProductId={subProductId}
          price={price}
          oldPrice={oldPrice}
        />
      </Flex>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product,
  router: state.router
});

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

export default compose(
  connect<IConnectedProductProps, {}, IProductProps>(mapStateToProps),
  graphql(gql(PRODUCT_QUERY), options)
)(Product);
