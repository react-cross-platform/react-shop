import { Flex } from "antd-mobile";
import * as React from "react";
import { gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IData } from "../../../model";
import { Price } from "../../common/index";
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
  router: IRouterReducer;
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
    const { data, isModal, router } = this.props;
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
    return (
      <Flex direction="column" className={styles.cart}>
        <div className={styles.content}>
          <div className={styles.title}>
            Итого к оплате: <Price price={totalPrice} />
          </div>
          <div className={styles.items}>
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
          <div className={styles.footer} />
        </div>
        <CheckoutTrigger totalPrice={totalPrice} />
      </Flex>
    );
  }
}

const mapStateToProps: any = state => ({
  router: state.router
});

export default compose<IConnectedCartProps>(
  connect<IConnectedCartProps, {}, ICartProps>(mapStateToProps),
  graphql<IConnectedCartProps, ICartProps>(CART_QUERY)
)(Cart) as any;
