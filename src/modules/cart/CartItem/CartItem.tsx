import { Devider, Price } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import React from "react";
import { Link } from "react-router-dom";

import { RemoveCartItem, UpdateCartItem } from "../index";
import { ICartItem } from "../model";

const styles = require("./styles.css");

export const getCartItemTotalPrice = (price: number, amount: number) => {
  return price * amount;
};

interface OwnProps extends ICartItem {}

class CartItem extends React.Component<OwnProps, {}> {
  handleNavigation = (navigation, id, name) => {
    navigation.navigate("Product", { id, name });
  };

  getName = () => {
    const { subProduct } = this.props;
    const { product, article } = subProduct;
    return `${product.brand.name} ${article}`;
  };

  render() {
    const { id, subProduct, price, amount } = this.props;
    const { product } = subProduct;
    const linkProps = {
      to: {
        pathname: compile(PATH_NAMES.product)({ id: product.id }),
        state: {
          modal: true,
          title: this.getName()
        }
      }
    };
    const totalPrice = getCartItemTotalPrice(price, amount);
    return (
      <div className={styles.CartItem}>
        <RemoveCartItem id={id} />
        <Flex justify="between" className={styles.container}>
          <MyTouchFeedback>
            <Link className={styles.imageContainer} {...linkProps}>
              <img
                className={styles.image}
                src={subProduct.product.images[0].src}
              />
            </Link>
          </MyTouchFeedback>
          <Flex
            align="start"
            direction="column"
            justify="between"
            className={styles.info}
          >
            <Flex className={styles.section} justify="between" align="start">
              {product.name}
              <br />
              {product.brand.name} {subProduct.article}
            </Flex>
            <Flex justify="between" className={styles.section}>
              <UpdateCartItem id={id} amount={amount} />
              <Price
                price={price * amount}
                oldPrice={(subProduct.oldPrice || 0) * amount}
              />
            </Flex>
          </Flex>
        </Flex>
        <Devider />
      </div>
    );
  }
}

export default CartItem;
