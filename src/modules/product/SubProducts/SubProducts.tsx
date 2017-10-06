import { List } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { Dispatch } from "../../../interfaces";
import { IRootReducer } from "../../../rootReducer";
import { Icon, Price } from "../../common/index";
import { ACTION_SELECT_SUB_PRODUCT } from "../constants";
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
    return subProduct.id === this.props.product.subProductId;
  };

  inCart = subProduct => {
    const { subProductIdsInCart } = this.props;
    return subProductIdsInCart.indexOf(parseInt(subProduct.id, 0)) !== -1;
  };

  selectSubProduct = id => {
    const { dispatch, product: { colorId } } = this.props;
    dispatch({
      type: ACTION_SELECT_SUB_PRODUCT,
      id,
      colorId
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
            onClick={() => this.selectSubProduct(subProduct.id)}
            thumb={
              this.isActive(subProduct)
                ? <Icon
                    className={styles.icon}
                    type={require("svg-sprite-loader!./circle-checked.svg")}
                    style={{
                      fill: this.inCart(subProduct) ? "green" : "orange"
                    }}
                  />
                : <Icon
                    className={styles.icon}
                    type={require("svg-sprite-loader!./circle.svg")}
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
