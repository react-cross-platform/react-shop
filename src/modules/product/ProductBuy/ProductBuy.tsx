import { Flex, Toast } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

interface IConnectedProductBuyProps {}

interface IProductBuyProps {
  price: number;
  oldPrice?: number;
}

class ProductBuy extends React.Component<
  IConnectedProductBuyProps & IProductBuyProps,
  any
> {
  render() {
    const { price, oldPrice } = this.props;
    return (
      <Flex className={styles.buy}>
        <div className={styles.buyPrice}>
          {!!oldPrice
            ? <div>
                <div className={styles.currentPrice}>
                  {parseInt(String(price), 10)} грн
                </div>
                <div className={styles.oldPrice}>
                  {parseInt(String(oldPrice), 10)} грн
                </div>
              </div>
            : <div className={styles.price}>
                {parseInt(String(price), 10)} грн
              </div>}
        </div>
        <div
          onClick={e => Toast.info("To Be Continued...", 2)}
          className={styles.buyButton}
        >
          Купить
        </div>
      </Flex>
    );
  }
}

export default ProductBuy;
