import { Flex } from "antd-mobile";
import * as React from "react";

import { prettyPrice } from "../utils";

const styles = require("./styles.css");

interface OwnProps {
  price: number;
  oldPrice?: number;
  currency?: string;
  style?: React.CSSProperties | any;
}

class Price extends React.Component<OwnProps, any> {
  render() {
    const { price, oldPrice, style } = this.props;
    const currency = this.props.currency || "грн";
    return !!oldPrice
      ? <Flex
          style={style}
          className={styles.Price}
          direction="column"
          justify="center"
        >
          <div className={styles.currentValue}>
            {prettyPrice(price)} {currency}
          </div>
          <div className={styles.oldValue}>
            {prettyPrice(oldPrice)} {currency}
          </div>
        </Flex>
      : <span className={styles.singleValue} style={style}>
          {prettyPrice(price)} {currency}
        </span>;
  }
}

export default Price;
