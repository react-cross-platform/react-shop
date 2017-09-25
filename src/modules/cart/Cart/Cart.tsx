import { Flex } from "antd-mobile";
import * as React from "react";
import { gql, graphql } from "react-apollo";
import { compose } from "redux";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { getCartItemTotalPrice } from "../CartItem/CartItem";
import { CartItem, CheckoutTrigger, EmptyCart } from "../index";
import { ICart } from "../model";

const styles = require("./styles.css");

export const CART_QUERY = gql(require("./cart.gql"));

export interface IDataCart extends IData {
  cart: ICart;
}

interface IConnectedCartProps {
  data: IDataCart;
}

export interface ICartProps {
  history: any;
  isModal: boolean;
}

const getCartTotalPrice = (cart: ICart): number => {
  let totalPrice = 0;
  if (cart && cart.items) {
    cart.items.forEach(item => {
      const { price, amount } = item;
      totalPrice += getCartItemTotalPrice(price, amount);
    });
  }
  return totalPrice;
};

export const getCartAmount = (cart: ICart): number => {
  return cart && cart.items ? cart.items.length : 0;
};

class Cart extends React.Component<
  IConnectedCartProps & ICartProps,
  undefined
> {
  handleClick = e => {
    e.stopPropagation();
    const { isModal, history } = this.props;
    if (isModal) {
      history.goBack();
    } else {
      history.push("/");
    }
  };

  render() {
    const { data, isModal } = this.props;
    const { loading } = data;
    if (loading === true) {
      return <Loading />;
    }
    const cart = data.cart as ICart;
    const totalPrice = getCartTotalPrice(cart);
    const amount = getCartAmount(cart);

    if (amount === 0) {
      return <EmptyCart history={history} isModal={isModal} />;
    }

    const style =
      amount <= 2
        ? {
            overflow: "hidden",
            position: "fixed"
          }
        : {};
    return (
      <Flex direction="column" className={styles.cart} style={style}>
        <div className={styles.cartItems}>
          {cart.items.map((item, index) =>
            <CartItem
              key={index}
              id={item.id}
              subProduct={item.subProduct}
              price={item.price}
              amount={item.amount}
            />
          )}
        </div>
        <CheckoutTrigger totalPrice={totalPrice} />
      </Flex>
    );
  }
}

export default compose<IConnectedCartProps>(
  graphql<IConnectedCartProps, ICartProps>(CART_QUERY)
)(Cart) as any;
