import { Flex } from "antd-mobile";
import * as React from "react";
import { prettyPrice } from "../utils";

const styles = require("./styles.css");

interface IPriceProps {
  price: number;
  oldPrice?: number;
  currency?: string;
}

class Price extends React.Component<IPriceProps, any> {
  render() {
    const { price, oldPrice } = this.props;
    const currency = this.props.currency || "грн";
    return !!oldPrice
      ? <Flex className={styles.Price} direction="column" justify="center">
          <div className={styles.value}>
            {prettyPrice(price)} {currency}
          </div>
          <div className={styles.oldValue}>
            {prettyPrice(oldPrice)} {currency}
          </div>
        </Flex>
      : <span className={styles.value}>
          {prettyPrice(price)} {currency}
        </span>;
  }
}

export default Price;
