import { Icon, List } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Price } from "../../common/index";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { ICurrentProduct, ISubProduct } from "../model";

const styles = require("./styles.css");

const Item = List.Item;
const Brief = Item.Brief;

interface IConnectedSubProductsProps {
  dispatch: Dispatch<{}>;
  product: ICurrentProduct;
}

interface ISubProductsProps {
  subProducts: [ISubProduct];
  subProductIdsInCart: number[];
}

class SubProducts extends React.Component<
  IConnectedSubProductsProps & ISubProductsProps,
  any
> {
  onChangePrice = elId => {
    this.props.dispatch({
      colorId: this.props.product.colorId,
      subProductId: elId,
      type: ACTION_SELECT_SUBPRODUCT
    });
  };

  isActive = (subProduct: ISubProduct) => {
    return subProduct.id === this.props.product.subProductId;
  };

  inCart = subProduct => {
    const { subProductIdsInCart } = this.props;
    return subProductIdsInCart.indexOf(parseInt(subProduct.id, 0)) !== -1;
  };

  render() {
    const { subProducts } = this.props;
    return (
      <div>
        <List>
          {subProducts.map((subProduct, index) =>
            <Item
              key={index}
              onClick={() => this.onChangePrice(subProduct.id)}
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

const mapStateToProps: any = state => ({
  product: state.product
});

export default connect<IConnectedSubProductsProps, {}, ISubProductsProps>(
  mapStateToProps
)(SubProducts);
