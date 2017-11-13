import { Devider, MyIcon, Price } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
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
    const { id, subProduct, price, amount, attributeValues } = this.props;
    const { product } = subProduct;

    const linkProps = {
      to: {
        pathname: compile(PATH_NAMES.product)({ id: product.id }),
        search: queryString.stringify({
          sub_product_id: subProduct.id,
          attribute_value_ids:
            attributeValues && attributeValues.length > 0
              ? attributeValues[0].id
              : ""
        }),
        state: {
          modal: true,
          title: this.getName()
        }
      }
    };
    const totalPrice = getCartItemTotalPrice(price, amount);
    let titleImage;
    if (attributeValues) {
      const filtered = subProduct.product.images.filter(
        image =>
          image.attributeValue &&
          attributeValues &&
          attributeValues.length > 0 &&
          image.attributeValue.id === attributeValues[0].id
      );
      titleImage = filtered[0];
    }
    if (!titleImage) {
      titleImage = subProduct.product.images[0];
    }
    const color = attributeValues ? attributeValues[0] : null;
    return (
      <div className={styles.CartItem}>
        <RemoveCartItem id={id} />
        <Flex justify="between" className={styles.container}>
          <MyTouchFeedback>
            <Link className={styles.imageContainer} {...linkProps}>
              <img className={styles.image} src={titleImage.src} />
            </Link>
          </MyTouchFeedback>
          <Flex
            align="start"
            direction="column"
            // justify="between"
            justify="start"
            className={styles.info}
          >
            <Flex
              className={styles.section}
              style={{ width: "90%", marginBottom: "0.5rem" }}
              justify="between"
              align="start"
            >
              {product.name}
              <br />
              {product.brand.name} {subProduct.article}
            </Flex>
            <Flex justify="between" className={styles.section}>
              <UpdateCartItem id={id} amount={amount} />
              {color &&
                <MyIcon
                  className={styles.icon}
                  type={require("svg-sprite-loader!./checked-circle.svg")}
                  style={{
                    fill: color.value
                  }}
                />}
              <Price
                price={price * amount}
                oldPrice={(subProduct.oldPrice || 0) * amount}
                isSinglePrice={true}
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
