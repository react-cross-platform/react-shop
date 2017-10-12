import { CART_QUERY, IDataCart } from "@src/modules/cart/Cart/Cart";
import { ACTION_ADD_VIEWED_PRODUCT } from "@src/modules/catalog/constants";
import { Devider, Loading, MyIcon } from "@src/modules/common";
import { Layout } from "@src/modules/layout";
import { Images, ProductToCart, SubProducts } from "@src/modules/product";
import { ACTION_SELECT_SUB_PRODUCT } from "@src/modules/product/constants";
import { IProduct } from "@src/modules/product/model";
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

import { ACTION_SELECT_COLOR } from "../../modules/product/constants";
import { ISubProduct } from "../../modules/product/model";
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
  addViewedSubProduct: (id: string) => void;
  selectSubProduct: (id: string, color: number) => void;
  changeColor: (colorId: number) => void;
}

interface OwnProps extends IPage {
  id: string;
  activeSubProduct: ISubProduct;
  subProductIdsInCart: number[];
}

interface Props extends GraphQLProps, StateProps, DispatchProps, OwnProps {}

const getActiveSubProduct = (
  subProducts,
  subProductId: string
): ISubProduct => {
  return subProducts.filter(sp => sp.id === subProductId)[0] || subProducts[0];
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

  getCurrentImageNumber = (): number | undefined => {
    const { images } = this.props.dataProduct.product!;
    const { colorId } = this.props.product;
    if (!colorId) {
      return;
    }
    const filtered = images
      .map((image, i) => ({
        colorId: image.id,
        number: i
      }))
      .filter(data => data.colorId === colorId);
    if (filtered.length > 0) {
      return filtered[0].number;
    }
  };

  render() {
    const { location, history, dataProduct, dataCart } = this.props;
    if (dataProduct.loading || !this.props.product.subProductId) {
      return (
        <Layout {...this.getLayoutOptions()}>
          <Loading />
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
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);
    const activeImage =
      activeSubProduct.id === subProductId
        ? images.filter(image => image.id === colorId)[0]
        : images.filter(image => image.isTitle === true)[0];

    const subProductIdsInCart = getSubProductIdsInCart(dataCart);
    const { price, oldPrice } = activeSubProduct;

    return (
      <Layout {...this.getLayoutOptions()}>
        <div className={styles.ProductPage}>
          {/* First screen info */}
          <Flex
            style={{ height: window.innerHeight - 37 * 2 }}
            justify="around"
            direction="column"
            className={styles.firstScreen}
          >
            <Images
              defaultHeight={window.innerHeight * 0.65}
              images={images}
              currentImageNumber={this.getCurrentImageNumber()}
              dotWidth={13}
            />
            <WingBlank className={styles.name}>
              {product!.name}
              <br />
              {brand.name} {activeSubProduct.article}
            </WingBlank>
          </Flex>

          {/* Select SubProduct section */}
          {subProducts.length > 1
            ? <div>
                <Devider />
                <SubProducts
                  subProducts={subProducts}
                  subProductIdsInCart={subProductIdsInCart}
                />
              </div>
            : ""}

          <Devider />
          <WhiteSpace />

          {/* Select Color section */}
          <WingBlank>
            <Flex justify="between">
              <Flex align="center">
                {images.filter(el => el.colorValue !== "").length > 1
                  ? images.filter(el => el.colorValue !== "").map(
                      (e, i) =>
                        e.id === this.props.product.colorId
                          ? <MyIcon
                              className={styles.colorIcon}
                              key={i}
                              type={require("svg-sprite-loader!./checked-circle.svg")}
                              style={{
                                fill: e.colorValue
                              }}
                            />
                          : <MyIcon
                              className={styles.colorIcon}
                              key={i}
                              onClick={() => this.props.changeColor(e.id)}
                              type={require("svg-sprite-loader!./circle.svg")}
                              style={{
                                fill: e.colorValue
                              }}
                            />
                    )
                  : images.filter(el => el.colorValue !== "").map((e, i) =>
                      <MyIcon
                        key={i}
                        type={require("svg-sprite-loader!./checked-circle.svg")}
                        className={styles.colorIcon}
                        style={{
                          fill: e.colorValue
                        }}
                      />
                    )}
              </Flex>
              <div className={styles.colorName}>
                {activeImage.colorName}
              </div>
            </Flex>
          </WingBlank>

          <WhiteSpace />
          <Devider />
          <WhiteSpace />

          {/* Product params section */}
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
          <WhiteSpace />

          {/* Product description section */}
          <WingBlank>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={createMarkup(description)}
            />
          </WingBlank>
          <WhiteSpace />

          {/* Add to cart */}
          <ProductToCart
            subProductId={parseInt(subProductId, 0)}
            price={price}
            oldPrice={oldPrice}
            inCart={
              subProductIdsInCart.indexOf(parseInt(subProductId, 0)) !== -1
            }
          />
        </div>
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
  },
  changeColor: (colorId: number) => {
    dispatch({ type: ACTION_SELECT_COLOR, colorId });
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
