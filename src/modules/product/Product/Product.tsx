import { IRouterReducer } from "@src/interfaces";
import { CART_QUERY, IDataCart } from "@src/modules/cart/Cart/Cart";
import { ACTION_ADD_VIEWED_PRODUCT } from "@src/modules/catalog/constants";
import { Loading } from "@src/modules/common";
import { getScrollableStyle } from "@src/modules/layout/utils";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { Flex, WingBlank } from "antd-mobile";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { compose, graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";

import { ACTION_SELECT_SUB_PRODUCT } from "../constants";
import { Images, ProductInfo, ProductToCart } from "../index";
import { IProduct, ISubProduct } from "../model";
import { IProductReducer } from "../reducer";

const styles = require("./styles.css");

interface IDataProduct extends QueryProps {
  product?: IProduct;
}

interface GraphQLProps {
  dataProduct: IDataProduct;
  dataCart: IDataCart;
}

interface StateProps {
  product: IProductReducer;
  router: IRouterReducer;
}

interface DispatchProps {
  addViewedSubProduct: (id: string) => void;
  selectSubProduct: (id: string, color: number) => void;
}

interface OwnProps {
  id: string;
}

interface Props extends GraphQLProps, StateProps, DispatchProps, OwnProps {}

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

class Product extends React.Component<Props, {}> {
  componentWillMount() {
    const { id, addViewedSubProduct } = this.props;
    addViewedSubProduct(id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dataProduct } = nextProps;
    const { loading, product } = dataProduct;
    if (!loading) {
      const { subProducts } = product!;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      const subProductColor = product!.images.filter(
        el => el.colorValue !== ""
      )[0].id;
      if (subProductIds.indexOf(subProductId!) === -1) {
        this.props.selectSubProduct(subProductIds[0], subProductColor);
      }
    }
  }

  isCurrentPage = (id: string) => {
    const { router } = this.props;
    return router.location.pathname === compile(PATH_NAMES.product)({ id });
  };

  render() {
    const { dataProduct, dataCart, router } = this.props;
    const { product } = dataProduct;
    const { colorId } = this.props.product;
    if (dataProduct.loading || !this.props.product.subProductId) {
      return <Loading />;
    }
    const subProductId = parseInt(this.props.product.subProductId, 0);
    const { id, brand, images, subProducts } = product!;
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
            style={{ height: window.innerHeight - 40 * 2 + 5 }}
            justify="around"
            direction="column"
            className={styles.productFirstScreen}
          >
            <Images images={images} />
            <WingBlank className={styles.productName}>
              {product!.name}
              <br />
              {brand.name} {activeSubProduct.article}
            </WingBlank>
          </Flex>
          <ProductInfo
            dataProduct={product!}
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

const mapStateToProps = (state: IRootReducer): StateProps => ({
  product: state.product,
  router: state.router
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  addViewedSubProduct: id => {
    dispatch({
      type: ACTION_ADD_VIEWED_PRODUCT,
      subProductId: id
    });
  },
  selectSubProduct: (id, colorId) => {
    dispatch({
      type: ACTION_SELECT_SUB_PRODUCT,
      id,
      colorId
    });
  }
});

const PRODUCT_QUERY = gql(require("./product.gql"));
const productOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataProduct",
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

const cartOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataCart"
};

export default compose(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(PRODUCT_QUERY, productOptions),
  graphql(CART_QUERY, cartOptions)
)(Product);
