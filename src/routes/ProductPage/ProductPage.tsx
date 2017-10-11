import { CART_QUERY, IDataCart } from "@src/modules/cart/Cart/Cart";
import { ACTION_ADD_VIEWED_PRODUCT } from "@src/modules/catalog/constants";
import { Loading, MyIcon } from "@src/modules/common";
import { Layout } from "@src/modules/layout";
import { getScrollableStyle } from "@src/modules/layout/utils";
import { Images, ProductInfo, ProductToCart } from "@src/modules/product";
import { ACTION_SELECT_SUB_PRODUCT } from "@src/modules/product/constants";
import { IProduct } from "@src/modules/product/model";
import { IProductReducer } from "@src/modules/product/reducer";
import { IRootReducer } from "@src/rootReducer";
import { Flex, WingBlank } from "antd-mobile";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { compose, graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ISubProduct } from "../../modules/product/model";
import { PATH_NAMES } from "../index";
import { IPage, IRouterReducer } from "../interfaces";

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
}

interface DispatchProps {
  addViewedSubProduct: (id: string) => void;
  selectSubProduct: (id: string, color: number) => void;
}

interface OwnProps extends IPage {
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
  state = {
    left: undefined,
    title: ""
  };

  componentWillMount() {
    const { id, addViewedSubProduct } = this.props;
    addViewedSubProduct(id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { location, dataProduct } = nextProps;
    const { loading, product } = dataProduct;
    if (!loading) {
      const { subProducts, category } = product!;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      const subProductColor = product!.images.filter(
        el => el.colorValue !== ""
      )[0].id;
      if (location.state && location.state.modal) {
        this.setState({
          title: product!.name
        });
      } else {
        this.setState({
          left: (
            <Link
              className={styles.headerLeft}
              to={compile(PATH_NAMES.category)({ id: category.id })}
            >
              <MyIcon
                className={styles.headerLeftIcon}
                type={require("!svg-sprite-loader!./back.svg")}
              />
              {category.name}
            </Link>
          ),
          title: ""
        });
      }

      if (subProductIds.indexOf(subProductId!) === -1) {
        this.props.selectSubProduct(subProductIds[0], subProductColor);
      }
    }
  }

  getLayoutOptions = () => {
    const { location, history } = this.props;
    return {
      location,
      history,
      header: {
        left: this.state.left,
        title: this.state.title
      },
      footer: null
    };
  };

  isCurrentPage = (id: string) => {
    const { location: { pathname } } = this.props;
    return pathname === compile(PATH_NAMES.product)({ id });
  };

  render() {
    const { location, history, dataProduct, dataCart } = this.props;
    const { product } = dataProduct;
    const { colorId } = this.props.product;
    if (dataProduct.loading || !this.props.product.subProductId) {
      return (
        <Layout {...this.getLayoutOptions()}>
          <Loading />
        </Layout>
      );
    }

    const subProductId = parseInt(this.props.product.subProductId, 0);
    const { id, brand, images, subProducts } = product!;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);
    const { price, oldPrice } = activeSubProduct;
    const subProductIdsInCart = getSubProductIdsInCart(dataCart);
    return (
      <Layout {...this.getLayoutOptions()}>
        <Flex direction="column" className={styles.ProductPage}>
          <div
            className={styles.content}
            style={getScrollableStyle(this.isCurrentPage(id))}
          >
            <Flex
              style={{ height: window.innerHeight - 40 * 2 }}
              justify="around"
              direction="column"
              className={styles.firstScreen}
            >
              <Images images={images} />
              <WingBlank className={styles.name}>
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
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  product: state.product
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
      id: props.match.params.id
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
