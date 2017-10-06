import { Checkbox, Flex, WhiteSpace, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { IRootReducer } from "../../../rootReducer";
import { Icon } from "../../common/index";
import { Devider } from "../../layout/index";
import { ACTION_SELECT_COLOR } from "../constants";
import { SubProducts } from "../index";
import { IProduct, ISubProduct } from "../model";
import { IProductReducer } from "../reducer";

const styles = require("./styles.css");

const { AgreeItem, CheckboxItem } = Checkbox;

interface StateProps {
  product: IProductReducer;
}

interface DispatcProps {
  changeColor: (colorId: number) => void;
}

interface OwnProps {
  dataProduct: IProduct;
  activeSubProduct: ISubProduct;
  subProductIdsInCart: number[];
}

function createMarkup(html) {
  return { __html: html };
}

class ProductInfo extends React.Component<
  StateProps & DispatcProps & OwnProps,
  {}
> {
  render() {
    const {
      dataProduct,
      product,
      activeSubProduct,
      subProductIdsInCart
    } = this.props;
    const { brand, images, subProducts, attributes } = dataProduct;
    const { subProductId, colorId } = this.props.product;
    const activeImage =
      activeSubProduct.id === subProductId
        ? images.filter(image => image.id === colorId)[0]
        : images.filter(image => image.isTitle === true)[0];

    return (
      <div className={styles.productInfo}>
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
            <div className={styles.colors}>
              {images.filter(el => el.colorValue !== "").length > 1
                ? images.filter(el => el.colorValue !== "").map(
                    (e, i) =>
                      e.id === this.props.product.colorId
                        ? <Icon
                            className={styles.colorIcon}
                            key={i}
                            type={require("svg-sprite-loader!./circle-check_color.svg")}
                            style={{
                              fill: e.colorValue
                            }}
                          />
                        : <Icon
                            className={styles.colorIcon}
                            key={i}
                            onClick={() => this.props.changeColor(e.id)}
                            type={require("svg-sprite-loader!./icon-circle-for-colors.svg")}
                            style={{
                              fill: e.colorValue
                            }}
                          />
                  )
                : images.filter(el => el.colorValue !== "").map((e, i) =>
                    <Icon
                      key={i}
                      type={require("svg-sprite-loader!./check-circle.svg")}
                      style={{
                        fill: e.colorValue
                      }}
                    />
                  )}
            </div>
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
            dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
          />
        </WingBlank>
        <WhiteSpace />
        <Devider />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  product: state.product
});

const mapDispatchToProps = (dispatch): DispatcProps => {
  return {
    changeColor: (colorId: number) => {
      dispatch({ type: ACTION_SELECT_COLOR, colorId });
    }
  };
};

export default connect<StateProps, DispatcProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfo);
