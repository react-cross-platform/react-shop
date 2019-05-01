import { CartQuery } from "@src/generated/graphql";
import { Price } from "@src/modules/common";
import { LoadingMask } from "@src/modules/layout";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { IRouterReducer } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import { History } from "history";
import * as React from "react";
import { graphql, QueryResult } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { CartItem, CheckoutForm, EmptyCart, FinishedCart } from "..";
import { getCartItemTotalPrice } from "../CartItem/CartItem";
import { CartReducer } from "../reducer";
import cartQuery from "./cartQuery.gql";

const styles = require("./styles.css");

interface StateProps {
  cartReducer: CartReducer;
  router: IRouterReducer;
}

export interface DataCart extends QueryResult, CartQuery.Query {}

interface GraphQLProps {
  data: DataCart;
}

interface OwnProps {
  history: History;
  isModal: boolean;
}

const getCartTotalPrice = (cart: CartQuery.Cart): number => {
  let totalPrice = 0;
  if (cart && cart.items) {
    cart.items.forEach(item => {
      const { price, amount } = item;
      totalPrice += getCartItemTotalPrice(price, amount);
    });
  }
  return totalPrice;
};

export const getCartAmount = (cart?: CartQuery.Cart): number => {
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

    const cart: CartQuery.Cart = data.cart;
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

  handleClick = e => {
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

export default compose(
  graphql<GraphQLProps, OwnProps>(cartQuery),
  connect<StateProps, {}, OwnProps>(mapStateToProps)
)(Cart) as any;
