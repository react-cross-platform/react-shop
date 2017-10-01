import { Flex, WingBlank } from "antd-mobile";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IData } from "../../../model";
import { PATH_NAMES } from "../../../routing";
import { CART_QUERY, IDataCart } from "../../cart/Cart/Cart";
import { ACTION_ADD_VIEWED_PRODUCT } from "../../catalog/constants";
import { HEIGHT } from "../../layout/Header/Header";
import { Loading } from "../../layout/index";
import { getScrollableStyle } from "../../layout/Modal/Modal";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { Images, ProductInfo, ProductToCart } from "../index";
import { ICurrentProduct, IProduct, ISubProduct } from "../model";

const PRODUCT_QUERY = gql(require("./product.gql"));

const styles = require("./styles.css");

interface IDataProduct extends IData {
  product: IProduct;
}

interface IConnectedProductProps {
  dataProduct: IDataProduct;
  dataCart: IDataCart;
  product: ICurrentProduct;
  dispatch: Dispatch<{}>;
  router: IRouterReducer;
}

interface IProductProps {
  id: string;
}

const getActiveSubProduct = (subProducts, subProductId): ISubProduct => {
  return (
    subProducts.filter(sp => parseInt(sp.id, 0) === subProductId)[0] ||
    subProducts[0]
  );
};

const getSubProductIdsInCart = (data: IDataCart) => {
  const { cart, loading } = data;
  return !loading && cart && cart.items
    ? cart.items.map(item => parseInt(item.subProduct.id, 0))
    : [];
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

  componentWillReceiveProps(nextProps) {
    const { dataProduct } = nextProps;
    const { loading, product } = dataProduct;
    if (!loading) {
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

  isCurrentPage = (id: string) => {
    const { router } = this.props;
    return router.location.pathname === compile(PATH_NAMES.product)({ id });
  };

  render() {
    const { dataProduct, dataCart, router } = this.props;
    const { product } = dataProduct;
    const { colorId } = this.props.product;
    const subProductId = parseInt(this.props.product.subProductId, 0);
    if (dataProduct.loading || !subProductId) {
      return <Loading />;
    }

    const { id, brand, images, subProducts } = product;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);
    const { price, oldPrice } = activeSubProduct;
    const subProductIdsInCart = getSubProductIdsInCart(dataCart);
    return (
      <Flex direction="column" className={styles.product}>
        <div
          className={styles.productContent}
          style={getScrollableStyle(this.isCurrentPage(id))}
        >
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
            subProductIdsInCart={subProductIdsInCart}
          />
        </div>
        <ProductToCart
          subProductId={subProductId}
          price={price}
          oldPrice={oldPrice}
          inCart={subProductIdsInCart.indexOf(subProductId) !== -1}
        />
      </Flex>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product,
  router: state.router
});

const productOptions = {
  name: "dataProduct",
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

const cartOptions = {
  name: "dataCart"
};

export default compose(
  connect<IConnectedProductProps, {}, IProductProps>(mapStateToProps),
  graphql(PRODUCT_QUERY, productOptions),
  graphql(CART_QUERY, cartOptions)
)(Product) as any;
