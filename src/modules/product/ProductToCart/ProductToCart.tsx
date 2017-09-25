import { Flex } from "antd-mobile";
import * as React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { CART_QUERY, IDataCart } from "../../cart/Cart/Cart";
import { AddCartItem } from "../../cart/index";
import { Price } from "../../common/index";
import { Loading } from "../../layout/index";

const styles = require("./styles.css");

interface IConnectedProductToCartProps {
  data: IDataCart;
}

interface IProductToCartProps {
  subProductId: number;
  price: number;
  oldPrice?: number;
}

interface IProductBuyState {}

class ProductToCart extends React.Component<
  IConnectedProductToCartProps & IProductToCartProps,
  IProductBuyState
> {
  render() {
    const { subProductId, price, oldPrice, data } = this.props;
    const { loading, cart } = data;
    if (loading) {
      return <Loading />;
    }
    const inCart =
      cart &&
      cart.items &&
      cart.items.filter(
        item => parseInt(item.subProduct.id, 0) === subProductId
      ).length > 0;

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
                  pathname: "/cart/",
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

export default compose<IProductToCartProps & IConnectedProductToCartProps>(
  graphql(CART_QUERY)
)(ProductToCart) as any;
