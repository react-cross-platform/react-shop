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
    return (
      <div className={styles.price}>
        {!!oldPrice
          ? <div>
              <div>
                {prettyPrice(price)} {currency}
              </div>
              <div className={styles.oldValue}>
                {prettyPrice(oldPrice)} {currency}
              </div>
            </div>
          : <div className={styles.value}>
              {prettyPrice(price)} {currency}
            </div>}
      </div>
    );
  }
}

export default Price;
