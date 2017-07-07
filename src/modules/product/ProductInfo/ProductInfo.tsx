import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";

import { ACTION_SELECT_COLOR, ACTION_SELECT_SUBPRODUCT } from "../constants";

import {
  Button,
  Checkbox,
  Flex,
  Icon,
  List,
  Radio,
  Table,
  Tabs,
  WhiteSpace,
  WingBlank
} from "antd-mobile";

import { Loading } from "../../layout/index";
import { Images, SelectSize } from "../index";
import { ICurrentDataProduct, IProduct, ISubProduct } from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const { TabPane } = Tabs;
const { AgreeItem, CheckboxItem } = Checkbox;

interface IConnectedProductInfoProps {
  product: ICurrentDataProduct;
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
    const activeImage = images.filter(image => image.id === colorId)[0];
    return (
      <div className={styles.tabPaneArea}>
        <WhiteSpace size="lg" />
        <WingBlank>
          <div className={styles.tabProductName}>
            {dataProduct.name} {brand.name}
          </div>
        </WingBlank>

        {/* Select Sizes */}
        {subProducts.length > 1 ? <SelectSize subProducts={subProducts} /> : ""}

        {/* Select Colors*/}
        <hr />
        <WingBlank>
          <Flex justify="between">
            <div className={styles.tabTitle}>Цвет</div>
            <div className={styles.tabIcons}>
              {images.filter(el => el.colorValue !== "").length > 1
                ? images
                    .filter(el => el.colorValue !== "")
                    .map(
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
          <WhiteSpace size="sm" />
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
            ? subProducts.map((el, i) =>
                <Flex key={i} justify="between">
                  <div className={styles.characteristi}>Размер, ШxВxГ</div>
                  <div className={styles.characteristicValue}>
                    {el.attributes.length !== 0
                      ? el.attributes
                          .slice(0, 3)
                          .map(e => e.values.map(v => v.value))
                          .join("x")
                      : el.article}
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
