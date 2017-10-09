import { Price } from "@src/modules/common";
import { Flex, Toast } from "antd-mobile";
import React from "react";

const styles = require("./styles.css");

interface OwnProps {
  totalPrice: number;
}

class CheckoutTrigger extends React.Component<OwnProps, {}> {
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
