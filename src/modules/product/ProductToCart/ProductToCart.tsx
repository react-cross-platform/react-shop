import { AddCartItem } from "@src/modules/cart";
import { Price } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./styles.css");

interface IConnectedProductToCartProps {}

interface IProductToCartProps {
  subProductId: number;
  attributeValueIds?: number[];
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
    const {
      subProductId,
      attributeValueIds,
      price,
      oldPrice,
      inCart
    } = this.props;
    return (
      <Flex className={styles.ProductToCart} justify="center" align="center">
        <div className={styles.priceSection}>
          <Price isSinglePrice={true} price={price} oldPrice={oldPrice} />
        </div>
        <MyTouchFeedback>
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
              : <AddCartItem
                  subProductId={subProductId}
                  attributeValueIds={attributeValueIds}
                />}
          </div>
        </MyTouchFeedback>
      </Flex>
    );
  }
}

export default ProductToCart;
