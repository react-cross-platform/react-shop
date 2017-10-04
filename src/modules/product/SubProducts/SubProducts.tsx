import { Icon, List } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { IRootReducer } from "../../../rootReducer";
import { Price } from "../../common/index";
import { ACTION_SELECT_SUB_PRODUCT } from "../constants";
import { ISubProduct } from "../model";
import { IProductReducer } from "../reducer";

const styles = require("./styles.css");

const Item = List.Item;
const Brief = Item.Brief;

interface StateProps {
  product: IProductReducer;
}

interface DispatchProps {
  _selectSubProduct: (id: string, colorId: number) => void;
}

interface MergedProps {
  selectSubProduct: (id: string) => void;
}

interface OwnProps {
  subProducts: [ISubProduct];
  subProductIdsInCart: number[];
}

interface Props extends StateProps, MergedProps, OwnProps {}

class SubProducts extends React.Component<Props, {}> {
  isActive = (subProduct: ISubProduct) => {
    return subProduct.id === this.props.product.subProductId;
  };

  inCart = subProduct => {
    const { subProductIdsInCart } = this.props;
    return subProductIdsInCart.indexOf(parseInt(subProduct.id, 0)) !== -1;
  };

  render() {
    const { subProducts, selectSubProduct } = this.props;
    return (
      <div>
        <List>
          {subProducts.map((subProduct, index) =>
            <Item
              key={index}
              onClick={() => selectSubProduct(subProduct.id)}
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

const mapStateToProps = (state: IRootReducer): StateProps => ({
  product: state.product
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  _selectSubProduct: (id, colorId) => {
    dispatch({
      type: ACTION_SELECT_SUB_PRODUCT,
      id,
      colorId
    });
  }
});

const mergeProps = (
  stateProps: StateProps,
  dispatchProps,
  ownProps: OwnProps
): Props => {
  return {
    ...ownProps,
    ...stateProps,
    selectSubProduct: id =>
      dispatchProps._selectSubProduct(id, stateProps.product.colorId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SubProducts
);
