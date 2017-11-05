import { CART_QUERY, IDataCart } from "@src/modules/cart/Cart/Cart";
import { ACTION_ADD_VIEWED_PRODUCT } from "@src/modules/catalog/constants";
import { Devider, Loading, MyIcon } from "@src/modules/common";
import { Aux, MyTouchFeedback } from "@src/modules/common/utils";
import { Layout, LoadingMask } from "@src/modules/layout";
import { Images, ProductToCart, SubProducts } from "@src/modules/product";
import {
  ACTION_SELECT_COLOR,
  ACTION_UNSELECT_ALL
} from "@src/modules/product/constants";
import { ACTION_SELECT_SUB_PRODUCT } from "@src/modules/product/constants";
import { getImagesWithColor } from "@src/modules/product/Images/Images";
import { ISubProduct } from "@src/modules/product/model";
import { IProductReducer } from "@src/modules/product/reducer";
import { IRootReducer } from "@src/rootReducer";
import { Flex, WhiteSpace, WingBlank } from "antd-mobile";
import { description } from "antd-mobile/lib/popover/demo/basic.native";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { compose, graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { IProduct } from "@src/modules/product/model";
import ScrollToTop from "@src/utils/ScrollToTop";
import { PATH_NAMES } from "../index";
import { IPage } from "../interfaces";

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
  addViewedProduct: (id: number) => void;
  selectSubProduct: (id: number, color?: number) => void;
  selectColor: (colorId: number) => void;
  unselectAll: () => void;
}

interface OwnProps extends IPage {
  id: string;
  activeSubProduct: ISubProduct;
  subProductIdsInCart: number[];
}

interface Props extends GraphQLProps, StateProps, DispatchProps, OwnProps {}

const getActiveSubProduct = (
  subProducts: ISubProduct[],
  subProductId: number
): ISubProduct => {
  return (
    subProducts.filter(sp => parseInt(sp.id, 0) === subProductId)[0] ||
    subProducts[0]
  );
};

const getSubProductIdsInCart = (data: IDataCart): number[] => {
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
    const { match: { params: { id } }, addViewedProduct } = this.props;
    addViewedProduct(parseInt(id, 0));
  }

  componentWillUnmount() {
    this.props.unselectAll();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { location, dataProduct } = nextProps;
    const { loading, product } = dataProduct;
    if (!loading) {
      const { subProducts, category } = product!;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => parseInt(sp.id, 0));
      if (location.state && location.state.modal) {
        this.setState({
          title: product!.name
        });
      } else {
        this.setState({
          left: (
            <MyTouchFeedback>
              <Link
                className={styles.headerLeft}
                to={compile(PATH_NAMES.category)({
                  id: category.id
                })}
              >
                <MyIcon
                  className={styles.headerLeftIcon}
                  type={require("!svg-sprite-loader!./back.svg")}
                />
                {category.name}
              </Link>
            </MyTouchFeedback>
          ),
          title: ""
        });
      }

      // if (subProductIds.indexOf(subProductId!) === -1) {
      if (!subProductId) {
        const imagesWithColor = getImagesWithColor(product!.images);
        const subProductColor =
          imagesWithColor.length === 0
            ? undefined
            : parseInt(imagesWithColor[0].id, 0);
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

  getselectedImageIndex = (): number | undefined => {
    const { images } = this.props.dataProduct.product!;
    const { colorId } = this.props.product;
    if (!colorId) {
      return;
    }
    const filtered = images
      .map((image, i) => ({
        colorId: parseInt(image.id, 0),
        number: i
      }))
      .filter(data => data.colorId === colorId);
    if (filtered.length > 0) {
      return filtered[0].number;
    }
  };

  shouldComponentUpdate(nextProps: Props, nextState) {
    if (nextProps.dataCart.loading || nextProps.dataProduct.loading) {
      return false;
    }
    return true;
  }

  render() {
    const { location, history, dataProduct, dataCart } = this.props;
    if (dataProduct.loading || !this.props.product.subProductId) {
      return (
        <Layout {...this.getLayoutOptions()}>
          <LoadingMask />
        </Layout>
      );
    }

    const { product } = dataProduct;
    const { colorId, subProductId } = this.props.product;
    const {
      id,
      brand,
      description,
      attributes,
      images,
      subProducts
    } = product!;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId!);
    const activeImage =
      parseInt(activeSubProduct.id, 0) === subProductId
        ? images.filter(image => parseInt(image.id, 0) === colorId)[0]
        : images.filter(image => image.isTitle === true)[0];

    const subProductIdsInCart = getSubProductIdsInCart(dataCart);
    const { price, oldPrice } = activeSubProduct;

    const imagesWithColor = getImagesWithColor(images);
    return (
      <ScrollToTop>
        <Layout {...this.getLayoutOptions()}>
          <div className={styles.ProductPage}>
            {/* First screen info */}
            <Flex
              style={{ height: window.innerHeight - 37 }}
              justify="center"
              direction="column"
              className={styles.firstScreen}
            >
              <Images
                containerHeight={window.innerHeight * 0.78}
                images={images}
                selectedImageIndex={this.getselectedImageIndex()}
                dotHeight={13}
              />
              <WingBlank className={styles.name}>
                {product!.name}
                <br />
                {brand.name} {activeSubProduct.article}
              </WingBlank>
            </Flex>
            <Devider />

            {/* Select SubProduct section */}
            {subProducts.length > 1 &&
              <Aux>
                <SubProducts
                  subProducts={subProducts}
                  subProductIdsInCart={subProductIdsInCart}
                />
                <Devider />
              </Aux>}

            {/* Select Color section */}
            {imagesWithColor.length > 0 &&
              <Aux>
                <WhiteSpace />
                <WingBlank>
                  <Flex justify="between">
                    <Flex align="center">
                      {imagesWithColor.map(
                        (image, i) =>
                          parseInt(image.id, 0) === this.props.product.colorId
                            ? <MyIcon
                                key={i}
                                className={styles.colorIcon}
                                type={require("svg-sprite-loader!./checked-circle.svg")}
                                style={{
                                  fill: image.colorValue
                                }}
                              />
                            : <MyTouchFeedback key={i}>
                                <MyIcon
                                  className={styles.colorIcon}
                                  onClick={() =>
                                    this.props.selectColor(
                                      parseInt(image.id, 0)
                                    )}
                                  type={require("svg-sprite-loader!./circle.svg")}
                                  style={{
                                    fill: image.colorValue
                                  }}
                                />
                              </MyTouchFeedback>
                      )}
                    </Flex>
                    <div className={styles.colorName}>
                      {activeImage && activeImage.colorName}
                    </div>
                  </Flex>
                </WingBlank>
                <WhiteSpace />
                <Devider />
              </Aux>}

            {/* Product params section */}
            {(attributes.length > 0 || subProducts.length === 1) &&
              <Aux>
                <WhiteSpace />
                <WingBlank>
                  {attributes.map((el, index) =>
                    <Flex key={index} justify="between">
                      <Flex className={styles.paramtName}>
                        {el.name}
                      </Flex>
                      <Flex className={styles.paramValue}>
                        {el.values.map(v => v.name).join(", ")}
                      </Flex>
                    </Flex>
                  )}
                  {subProducts.length === 1
                    ? subProducts.map((supProduct, i) =>
                        <Flex key={i} justify="between">
                          <div className={styles.paramtName}>Размер, ШxВxГ</div>
                          <div className={styles.paramValue}>
                            {supProduct.attributes.length !== 0
                              ? supProduct.attributes
                                  .slice(0, 3)
                                  .map(e => e.values.map(v => v.value))
                                  .join("x")
                              : supProduct.article}
                          </div>
                        </Flex>
                      )
                    : null}
                </WingBlank>
                <WhiteSpace />
                <Devider />
              </Aux>}

            {/* Product description section */}
            {description &&
              <Aux>
                <WhiteSpace />
                <WingBlank>
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={createMarkup(description)}
                  />
                </WingBlank>
                <WhiteSpace />
              </Aux>}

            {/* Add to cart */}
            <ProductToCart
              subProductId={subProductId!}
              price={price}
              oldPrice={oldPrice}
              inCart={subProductIdsInCart.indexOf(subProductId!) !== -1}
            />
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  product: state.product
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  addViewedProduct: (id: number) => {
    dispatch({
      type: ACTION_ADD_VIEWED_PRODUCT,
      id
    });
  },
  selectSubProduct: (id: number, colorId?: number) => {
    dispatch({
      type: ACTION_SELECT_SUB_PRODUCT,
      id,
      colorId
    });
  },
  selectColor: (colorId: number) => {
    dispatch({ type: ACTION_SELECT_COLOR, colorId });
  },
  unselectAll: () => {
    dispatch({
      type: ACTION_UNSELECT_ALL
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
  graphql(CART_QUERY, cartOptions),
  graphql(PRODUCT_QUERY, productOptions)
)(Product);
