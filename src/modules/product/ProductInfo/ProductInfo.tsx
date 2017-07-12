import { Checkbox, Flex, Icon, Tabs, WhiteSpace, WingBlank } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";

import { ACTION_SELECT_COLOR } from "../constants";
import { SubProducts } from "../index";
import { ICurrentProduct, IProduct, ISubProduct } from "../model";

const styles = require("./styles.css");

const { TabPane } = Tabs;
const { AgreeItem, CheckboxItem } = Checkbox;

interface IConnectedProductInfoProps {
  product: ICurrentProduct;
  dispatch: any;
}

interface IProductInfoProps {
  dataProduct: IProduct;
  activeSubProduct: ISubProduct;
}

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

function createMarkup(html) {
  return { __html: html };
}

class ProductInfo extends React.Component<
  IConnectedProductInfoProps & IProductInfoProps,
  any
> {
  changeColor = colorId => {
    this.props.dispatch({ type: ACTION_SELECT_COLOR, colorId });
  };

  render() {
    const { dataProduct, product, activeSubProduct, dispatch } = this.props;
    const { brand, images, subProducts, attributes } = dataProduct;
    const { subProductId, colorId } = this.props.product;
    const activeImage =
      activeSubProduct.id === subProductId
        ? images.filter(image => image.id === colorId)[0]
        : images.filter(image => image.isTitle === true)[0];

    return (
      <div className={styles.tabPaneArea}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <h2 className={styles.productName}>
            {dataProduct.name} {brand.name}
          </h2>
        </WingBlank>

        {/* Select SubProduct */}
        {subProducts.length > 1
          ? <div>
              <SubProducts subProducts={subProducts} />
              <hr />
            </div>
          : ""}

        {/* Select Color */}
        <WingBlank>
          <Flex justify="between">
            <div className={styles.tabTitle}>Цвет</div>
            <div className={styles.tabIcons}>
              {images.filter(el => el.colorValue !== "").length > 1
                ? images.filter(el => el.colorValue !== "").map(
                    (e, i) =>
                      e.id === this.props.product.colorId
                        ? <Icon
                            className={styles.tabIcon}
                            key={i}
                            type={require("svg-sprite-loader!./circle-check_color.svg")}
                            style={{
                              fill: e.colorValue,
                              color: e.colorValue
                            }}
                          />
                        : <Icon
                            className={styles.tabIcon}
                            key={i}
                            onClick={() => this.changeColor(e.id)}
                            type={require("svg-sprite-loader!./icon-circle-for-colors.svg")}
                            style={{
                              fill: e.colorValue,
                              color: e.colorValue
                            }}
                          />
                  )
                : images.filter(el => el.colorValue !== "").map((e, i) =>
                    <Icon
                      className={styles.tabIcon}
                      key={i}
                      type={require("svg-sprite-loader!./check-circle.svg")}
                      style={{
                        fill: e.colorValue,
                        color: e.colorValue
                      }}
                    />
                  )}
            </div>
            <div className={styles.colorName}>
              {activeImage.colorName}
            </div>
          </Flex>
        </WingBlank>

        <hr />

        <WingBlank>
          <div className={styles.tabTitle}>Характеристики</div>
          {attributes.map((el, index) =>
            <Flex key={index} justify="between">
              <Flex className={styles.characteristicName}>
                {el.name}
              </Flex>
              <Flex className={styles.characteristicValue}>
                {el.values.map(v => v.name).join(", ")}
              </Flex>
            </Flex>
          )}

          {subProducts.length === 1
            ? subProducts.map((supProduct, i) =>
                <Flex key={i} justify="between">
                  <div className={styles.characteristi}>Размер, ШxВxГ</div>
                  <div className={styles.characteristicValue}>
                    {supProduct.attributes.length !== 0
                      ? supProduct.attributes
                          .slice(0, 3)
                          .map(e => e.values.map(v => v.value))
                          .join("x")
                      : supProduct.article}
                  </div>
                </Flex>
              )
            : ""}
        </WingBlank>
        {/* About Product */}
        <hr />
        <WingBlank>
          <div className={styles.tabTitle}>О товаре</div>
          <div
            className={styles.tabText}
            dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
          />
        </WingBlank>
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product
});

export default compose(
  connect<IConnectedProductInfoProps, {}, IProductInfoProps>(mapStateToProps)
)(ProductInfo);
