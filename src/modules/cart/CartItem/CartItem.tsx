import { Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import React from "react";
import { Link } from "react-router-dom";

import { PATH_NAMES } from "../../../routing";
import { Price } from "../../common/index";
import { Devider } from "../../layout/index";
import { RemoveCartItem, UpdateCartItem } from "../index";
import { ICartItem } from "../model";

const styles = require("./styles.css");

export const getCartItemTotalPrice = (price: number, amount: number) => {
  return price * amount;
};

class CartItem extends React.Component<ICartItem, {}> {
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
        pathname: compile(PATH_NAMES.product)({ id }),
        state: {
          modal: true,
          title: this.getName()
        }
      }
    };
    const totalPrice = getCartItemTotalPrice(price, amount);
    return (
      <div>
        <RemoveCartItem id={id} />
        <Flex justify="between" className={styles.cartItem}>
          <Link className={styles.imageContainer} {...linkProps}>
            <img
              className={styles.image}
              src={subProduct.product.images[0].src}
            />
          </Link>
          <Flex
            align="start"
            direction="column"
            justify="between"
            className={styles.info}
          >
            <Flex
              className={styles.nameSection}
              justify="between"
              align="start"
            >
              <Link className={styles.name} {...linkProps}>
                {product.name}
                <br />
                {product.brand.name} {subProduct.article}
              </Link>
            </Flex>
            <Flex justify="between" className={styles.amountAndPriceSection}>
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
