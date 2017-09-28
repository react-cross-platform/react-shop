import { Flex } from "antd-mobile";
import * as React from "react";
import { Link } from "react-router-dom";

import { PATH_NAMES } from "../../../routing";
import { AddCartItem } from "../../cart/index";
import { Price } from "../../common/index";

const styles = require("./styles.css");

interface IConnectedProductToCartProps {}

interface IProductToCartProps {
  subProductId: number;
  price: number;
  oldPrice?: number;
  inCart: boolean;
}

interface IProductBuyState {}

class ProductToCart extends React.Component<
  IConnectedProductToCartProps & IProductToCartProps,
  IProductBuyState
> {
  render() {
    const { subProductId, price, oldPrice, inCart } = this.props;
    return (
      <Flex className={styles.productToCart} justify="center" align="center">
        <div className={styles.priceSection}>
          <Price price={price} oldPrice={oldPrice} />
        </div>
        <div
          className={styles.cartSection}
          style={{ background: inCart ? "green" : "orange" }}
        >
          {inCart
            ? <Link
                style={{ color: "white", display: "block" }}
                to={{
                  pathname: PATH_NAMES.cart,
                  state: { modal: true, title: "Корзина" }
                }}
              >
                В корзину
              </Link>
            : <AddCartItem subProductId={subProductId} />}
        </div>
      </Flex>
    );
  }
}

export default ProductToCart;
