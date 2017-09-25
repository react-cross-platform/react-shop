import { Toast } from "antd-mobile";
import React from "react";

import { Price } from "../../common/index";

const styles = require("./styles.css");

interface IConnectedCheckoutTriggerProps {}

interface ICheckoutTriggerProps {
  totalPrice: number;
}

class CheckoutTrigger extends React.Component<
  IConnectedCheckoutTriggerProps & ICheckoutTriggerProps,
  undefined
> {
  render() {
    const { totalPrice } = this.props;
    return (
      <div className={styles.checkoutTrigger}>
        <div className={styles.totalPrice}>
          <Price price={totalPrice} />
        </div>
        <div
          onClick={() => Toast.success("To be continued...")}
          className={styles.checkout}
        >
          Оформить
        </div>
      </div>
    );
  }
}

export default CheckoutTrigger;
