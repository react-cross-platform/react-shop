import { CART_QUERY, IDataCart } from "@src/modules/cart/Cart/Cart";
import { ACTION_ADD_VIEWED_PRODUCT } from "@src/modules/catalog/constants";
import { Devider, MyIcon } from "@src/modules/common";
import { Aux, MyTouchFeedback } from "@src/modules/common/utils";
import { Layout, LoadingMask } from "@src/modules/layout";
import { Images, ProductToCart, SubProducts } from "@src/modules/product";
import { ACTION_SET_SUB_PRODUCT_ID } from "@src/modules/product/constants";
import { ACTION_RESET, ACTION_SET_ATTRIBUTE_VALUE_IDS } from "@src/modules/product/constants";
import { getImagesWithColor } from "@src/modules/product/Images/Images";
import { IProduct } from "@src/modules/product/model";
import { ISubProduct } from "@src/modules/product/model";
import { IProductReducer } from "@src/modules/product/reducer";
import { IRootReducer } from "@src/rootReducer";
import ScrollToTop from "@src/utils/ScrollToTop";
import { Flex, WhiteSpace, WingBlank } from "antd-mobile";
import { description } from "antd-mobile/lib/popover/demo/basic.native";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
import * as React from "react";
import { compose, graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PATH_NAMES } from "../index";
import { IPage } from "../interfaces";

const renderHTML = require("react-render-html");

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
  setSubProduct: (subProductId: number, attributeValueIds?: number[]) => void;
  setAttributeValueIds: (attributeValueIds: number[]) => void;
  unselectAll: () => void;
}

interface OwnProps extends IPage {
  id: string;
}

interface Props extends GraphQLProps, StateProps, DispatchProps, OwnProps {}

const getActiveSubProduct = (subProducts: ISubProduct[], subProductId: number): ISubProduct => {
  return subProducts.filter((sp) => parseInt(sp.id, 0) === subProductId)[0] || subProducts[0];
};

const getSubProductIdsInCart = (data: IDataCart): number[] => {
  const { cart, loading } = data;
  return !loading && cart && cart.items ? cart.items.map((item) => parseInt(item.subProduct.id, 0)) : [];
};

class Product extends React.Component<Props, {}> {
  state = {
    left: undefined,
    title: ""
  };

  componentWillMount() {
    const {
      match: {
        params: { id }
      },
      addViewedProduct
    } = this.props;
    addViewedProduct(parseInt(id, 0));
  }

  componentWillReceiveProps(nextProps: Props) {
    const { location, dataProduct } = nextProps;
    const { loading, product } = dataProduct;
    let subProductIds;
    if (!loading) {
      const { subProducts, category } = product!;
      let { subProductId, attributeValueIds } = nextProps.product;
      subProductIds = subProducts.map((sp) => parseInt(sp.id, 0));
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
                <MyIcon className={styles.headerLeftIcon} type={require("!svg-sprite-loader!./back.svg")} />
                {category.name}
              </Link>
            </MyTouchFeedback>
          ),
          title: ""
        });
      }

      if (!subProductId) {
        const imagesWithColor = getImagesWithColor(product!.images);
        const GET = queryString.parse(location.search);

        subProductId = GET.sub_product_id ? parseInt(GET.sub_product_id, 0) : subProductIds[0];

        if (!attributeValueIds && GET.attribute_value_ids) {
          attributeValueIds = GET.attribute_value_ids.split(",").map((id) => parseInt(id, 0));
        }
        if (!attributeValueIds) {
          const filtered = imagesWithColor.filter((image) => image.attributeValue);
          if (filtered.length > 0) {
            attributeValueIds = [filtered[0].attributeValue!.id];
          }
        }

        this.props.setSubProduct(subProductId!, attributeValueIds);
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState) {
    if (nextProps.dataCart.loading || nextProps.dataProduct.loading) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // Fix nuka-carousel resize bag
    // https://github.com/FormidableLabs/nuka-carousel/issues/103
    // if (history.location.pathname === location.pathname) {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  componentWillUnmount() {
    this.props.unselectAll();
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
    const { attributeValueIds, subProductId } = this.props.product;
    const { id, brand, description, attributes, images, subProducts } = product!;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId!);
    const activeImage =
      parseInt(activeSubProduct.id, 0) === subProductId
        ? images.filter(
            (image) =>
              image.attributeValue &&
              attributeValueIds &&
              attributeValueIds!.indexOf(image.attributeValue.id) !== -1
          )[0]
        : images.filter((image) => image.isTitle === true)[0];

    const subProductIdsInCart = getSubProductIdsInCart(dataCart);
    const { price, oldPrice } = activeSubProduct;

    const imagesWithColor = getImagesWithColor(images);
    const selectedImageIndex = this.getSelectedImageIndex();
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
                selectedImageIndex={selectedImageIndex}
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
            {subProducts.length > 1 && (
              <Aux>
                <SubProducts subProducts={subProducts} subProductIdsInCart={subProductIdsInCart} />
                <Devider />
              </Aux>
            )}

            {/* Select Color section */}
            {imagesWithColor.length > 0 && (
              <Aux>
                <WhiteSpace />
                <WingBlank>
                  <Flex justify="between">
                    <Flex align="center">
                      {imagesWithColor.map((image, i) =>
                        attributeValueIds &&
                        image.attributeValue &&
                        attributeValueIds.indexOf(image.attributeValue.id) !== -1 ? (
                          <MyIcon
                            key={i}
                            className={styles.colorIcon}
                            type={require("svg-sprite-loader!./checked-circle.svg")}
                            style={{
                              fill: image.attributeValue.value
                            }}
                          />
                        ) : (
                          <MyTouchFeedback key={i}>
                            <MyIcon
                              className={styles.colorIcon}
                              onClick={() => this.props.setAttributeValueIds([image.attributeValue!.id])}
                              type={require("svg-sprite-loader!./circle.svg")}
                              style={{
                                fill: image.attributeValue!.value
                              }}
                            />
                          </MyTouchFeedback>
                        )
                      )}
                    </Flex>
                    <div className={styles.colorName}>
                      {activeImage && activeImage.attributeValue && activeImage.attributeValue.name}
                    </div>
                  </Flex>
                </WingBlank>
                <WhiteSpace />
                <Devider />
              </Aux>
            )}

            {/* active SubProduct and Product params section */}
            {(attributes.length > 0 || activeSubProduct.attributes.length > 0) && (
              <Aux>
                <WhiteSpace />
                <WingBlank>
                  {activeSubProduct.attributes.map((el, index) => (
                    <Flex key={index} justify="between">
                      <Flex className={styles.paramName}>{el.name}</Flex>
                      <Flex className={styles.paramValue}>{el.values.map((v) => v.name).join(", ")}</Flex>
                    </Flex>
                  ))}
                  {attributes.map((el, index) => (
                    <Flex key={index} justify="between">
                      <Flex className={styles.paramName}>{el.name}</Flex>
                      <Flex className={styles.paramValue}>{el.values.map((v) => v.name).join(", ")}</Flex>
                    </Flex>
                  ))}
                </WingBlank>
                <WhiteSpace />
                <Devider />
              </Aux>
            )}

            {/* Product description section */}
            {description && (
              <Aux>
                <WhiteSpace />
                <WingBlank>
                  <div className={styles.description}>{renderHTML(description)}</div>
                </WingBlank>
                <WhiteSpace />
              </Aux>
            )}

            {/* Add to cart */}
            <ProductToCart
              subProductId={subProductId!}
              attributeValueIds={attributeValueIds}
              price={price}
              oldPrice={oldPrice}
              inCart={subProductIdsInCart.indexOf(subProductId!) !== -1}
            />
          </div>
        </Layout>
      </ScrollToTop>
    );
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

  getSelectedImageIndex = (): number | undefined => {
    const { images } = this.props.dataProduct.product!;
    const { attributeValueIds } = this.props.product;
    if (!attributeValueIds) {
      return 0;
    }
    const filtered = images
      .map((image, i) => ({
        attributeValue: image.attributeValue,
        index: i
      }))
      .filter(
        ({ attributeValue, index }) => attributeValue && attributeValueIds.indexOf(attributeValue.id) !== -1
      );
    if (filtered.length > 0) {
      return filtered[0].index;
    }
  };
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
  setSubProduct: (subProductId: number, attributeValueIds?: number[]) => {
    dispatch({
      type: ACTION_SET_SUB_PRODUCT_ID,
      subProductId,
      attributeValueIds
    });
  },
  setAttributeValueIds: (attributeValueIds: number[]) => {
    dispatch({ type: ACTION_SET_ATTRIBUTE_VALUE_IDS, attributeValueIds });
  },
  unselectAll: () => {
    dispatch({
      type: ACTION_RESET
    });
  }
});

const PRODUCT_QUERY = gql(require("./product.gql"));
const productOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataProduct",
  options: (props) => ({
    variables: {
      id: props.match.params.id
    }
  })
};

const cartOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataCart"
};

export default compose(
  connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps),
  graphql(CART_QUERY, cartOptions),
  graphql(PRODUCT_QUERY, productOptions)
)(Product);
