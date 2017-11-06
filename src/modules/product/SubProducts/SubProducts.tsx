import { Dispatch } from "@src/interfaces";
import { MyIcon, Price } from "@src/modules/common";
import { IRootReducer } from "@src/rootReducer";
import { List } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { ACTION_SET_SUB_PRODUCT_ID } from "../constants";
import { ISubProduct } from "../model";
import { IProductReducer } from "../reducer";

const styles = require("./styles.css");

interface StateProps {
  product: IProductReducer;
}

interface DispatchProps {
  dispatch: Dispatch;
}

interface OwnProps {
  subProducts: [ISubProduct];
  subProductIdsInCart: number[];
}

interface Props extends StateProps, DispatchProps, OwnProps {}

class SubProducts extends React.Component<Props, {}> {
  isActive = (subProduct: ISubProduct) => {
    return parseInt(subProduct.id, 0) === this.props.product.subProductId;
  };

  inCart = (subProduct: ISubProduct) => {
    const { subProductIdsInCart } = this.props;
    return subProductIdsInCart.indexOf(parseInt(subProduct.id, 0)) !== -1;
  };

  selectSubProduct = (id: number) => {
    const { dispatch, product: { attributeValueIds } } = this.props;
    dispatch({
      type: ACTION_SET_SUB_PRODUCT_ID,
      subProductId: id,
      attributeValueIds
    });
  };

  render() {
    const { subProducts } = this.props;
    return (
      <List>
        {subProducts.map((subProduct, index) =>
          <List.Item
            key={index}
            platform="android"
            onClick={() => this.selectSubProduct(parseInt(subProduct.id, 0))}
            thumb={
              this.isActive(subProduct)
                ? <MyIcon
                    className={styles.icon}
                    type={require("svg-sprite-loader!./checked-circle.svg")}
                    style={{
                      fill: this.inCart(subProduct) ? "green" : "orange"
                    }}
                  />
                : <MyIcon
                    className={styles.icon}
                    type={require("svg-sprite-loader!./empty-circle.svg")}
                    style={{
                      fill: this.inCart(subProduct) ? "green" : "gray"
                    }}
                  />
            }
            extra={
              <span
                style={{
                  color: this.isActive(subProduct) ? "orange" : "grey"
                }}
              >
                <Price
                  price={subProduct.price}
                  oldPrice={subProduct.oldPrice}
                  style={{
                    fontWeight: this.isActive(subProduct) ? "bold" : "normal",
                    alignItems: "flex-end"
                  }}
                />
              </span>
            }
          >
            {subProduct.article}
          </List.Item>
        )}
      </List>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  product: state.product
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)(
  SubProducts
);
