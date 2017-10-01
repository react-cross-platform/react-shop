import { Flex, Toast } from "antd-mobile";
import React from "react";

import { Price } from "../../common/index";

const styles = require("./styles.css");

interface ICheckoutTriggerProps {
  totalPrice: number;
}

class CheckoutTrigger extends React.Component<ICheckoutTriggerProps, {}> {
  render() {
    const { totalPrice } = this.props;
    return (
      <Flex justify="center" align="center" className={styles.checkoutTrigger}>
        <div className={styles.totalPrice}>
          <Price price={totalPrice} />
        </div>
        <div
          onClick={() => Toast.success("To be continued...")}
          className={styles.checkout}
        >
          Оформить
        </div>
      </Flex>
    );
  }
}

export default CheckoutTrigger;
