import { Icon, List } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { IRootReducer } from "../../../rootReducer";
import { Price } from "../../common/index";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { ISubProduct } from "../model";
import { IProductReducer } from "../reducer";

const styles = require("./styles.css");

const Item = List.Item;
const Brief = Item.Brief;

interface IConnectedSubProductsProps {
  product: IProductReducer;
}

interface IDispatchedSubProductsProps {
  changePrice: (subProductId: string) => void;
}

interface ISubProductsProps {
  subProducts: [ISubProduct];
  subProductIdsInCart: number[];
}

class SubProducts extends React.Component<
  IConnectedSubProductsProps & IDispatchedSubProductsProps & ISubProductsProps,
  {}
> {
  isActive = (subProduct: ISubProduct) => {
    return subProduct.id === this.props.product.subProductId;
  };

  inCart = subProduct => {
    const { subProductIdsInCart } = this.props;
    return subProductIdsInCart.indexOf(parseInt(subProduct.id, 0)) !== -1;
  };

  render() {
    const { subProducts, changePrice } = this.props;
    return (
      <div>
        <List>
          {subProducts.map((subProduct, index) =>
            <Item
              key={index}
              onClick={() => changePrice(subProduct.id)}
              thumb={
                this.isActive(subProduct)
                  ? <Icon
                      className={styles.icon}
                      type={require("svg-sprite-loader!./check-circle.svg")}
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
            </Item>
          )}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer, ownProps: ISubProductsProps) => ({
  product: state.product
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePrice: subProductId => {
      dispatch({
        subProductId,
        colorId: ownProps.product.colorId,
        type: ACTION_SELECT_SUBPRODUCT
      });
    }
  };
};

export default connect<
  IConnectedSubProductsProps,
  IDispatchedSubProductsProps,
  ISubProductsProps
>(mapStateToProps, mapDispatchToProps)(SubProducts);
