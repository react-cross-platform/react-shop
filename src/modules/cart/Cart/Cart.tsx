import { Price } from "@src/modules/common/index";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes/index";
import { IRouterReducer } from "@src/routes/interfaces";
import { Button, Flex } from "antd-mobile";
import gql from "graphql-tag";
import { History } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";

import LoadingMask from "../../layout/LoadingMask/LoadingMask";
import { getCartItemTotalPrice } from "../CartItem/CartItem";
import { CartItem, EmptyCart, FinishedCart, CheckoutForm } from "../index";
import { ICart } from "../model";
import { ICartReducer } from "../reducer";
import { compose } from "recompose";

const styles = require("./styles.css");

interface StateProps {
  cartReducer: ICartReducer;
  router: IRouterReducer;
}

export interface IDataCart {
  cart?: ICart;
  loading?: any;
}

interface GraphQLProps {
  data: IDataCart;
}

interface OwnProps {
  history: History;
  isModal: boolean;
}

const getCartTotalPrice = (cart: ICart): number => {
  let totalPrice = 0;
  if (cart && cart.items) {
    cart.items.forEach((item) => {
      const { price, amount } = item;
      totalPrice += getCartItemTotalPrice(price, amount);
    });
  }
  return totalPrice;
};

export const getCartAmount = (cart?: ICart): number => {
  return cart && cart.items ? cart.items.length : 0;
};

class Cart extends React.Component<StateProps & GraphQLProps & OwnProps, {}> {
  render() {
    const {
      data,
      isModal,
      router,
      history,
      cartReducer: { finishedId }
    } = this.props;
    const { loading } = data;
    if (loading === true) {
      return <LoadingMask />;
    }

    const cart = data.cart as ICart;
    const amount = getCartAmount(cart);
    if (amount === 0) {
      return finishedId ? <FinishedCart id={finishedId} /> : <EmptyCart history={history} />;
    }

    return (
      <Flex direction="column" justify="between" className={styles.Cart}>
        <div className={styles.section}>
          <div className={styles.title}>
            Итого к оплате: <Price isSinglePrice={true} price={getCartTotalPrice(cart)} />
          </div>
          <div className={styles.items}>
            {cart.items.map((item, index) => (
              <CartItem
                key={index}
                id={item.id}
                subProduct={item.subProduct}
                attributeValues={item.attributeValues}
                price={item.price}
                amount={item.amount}
              />
            ))}
          </div>
        </div>

        <CheckoutForm />
      </Flex>
    );
  }

  handleClick = (e) => {
    e.stopPropagation();
    const { isModal, history } = this.props;
    if (isModal) {
      history.goBack();
    } else {
      history.push(PATH_NAMES.home);
    }
  };
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  cartReducer: state.cart,
  router: state.router
});

export const CART_QUERY = gql(require("./cart.gql"));

export default compose(
  graphql<GraphQLProps, OwnProps>(CART_QUERY),
  connect<StateProps, {}, OwnProps>(mapStateToProps)
)(Cart);
