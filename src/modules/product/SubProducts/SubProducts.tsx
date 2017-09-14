import { Icon, List, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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

  isActive = subProductId => {
    return subProductId === this.props.product.subProductId;
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
                this.isActive(subProduct.id)
                  ? <Icon
                      className={styles.checkIcon}
                      type={require("svg-sprite-loader!./check-circle.svg")}
                    />
                  : <Icon type={require("svg-sprite-loader!./circle.svg")} />
              }
              extra={
                <span
                  style={{
                    color: this.isActive(subProduct.id) ? "orange" : "grey"
                  }}
                >
                  {subProduct.price} грн
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
