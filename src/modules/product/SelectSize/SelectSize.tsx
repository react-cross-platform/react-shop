import * as React from "react";
import { connect } from "react-redux";

import {
  Checkbox,
  Flex,
  Icon,
  List,
  Radio,
  WhiteSpace,
  WingBlank
} from "antd-mobile";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { ICurrentDataProduct, ISubProduct } from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IConnectedSubProductsProps {
  dispatch: any;
  product: ICurrentDataProduct;
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

  render() {
    const { subProducts } = this.props;

    return (
      <div>
        <hr />
        <WingBlank>
          <div className={styles.title}>Модификации</div>
          <List>
            {subProducts.map((el, index) =>
              <List.Item
                className={styles.item}
                key={index}
                onClick={() => this.onChangePrice(el.id)}
                thumb={
                  el.id === this.props.product.subProductId
                    ? <Icon
                        className={styles.checkIcon}
                        type={require("svg-sprite-loader!./check-circle.svg")}
                      />
                    : <Icon type={require("svg-sprite-loader!./circle.svg")} />
                }
              >
                {el.attributes.length !== 0
                  ? el.attributes
                      .slice(0, 3)
                      .map(e => e.values.map(i => i.value))
                      .join("x") +
                    " " +
                    el.attributes
                      .slice(5, 6)
                      .map(e => e.values.map(i => i.name))
                  : el.article}
              </List.Item>
            )}
          </List>
        </WingBlank>
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
