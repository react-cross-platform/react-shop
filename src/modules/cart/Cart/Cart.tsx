import { Price } from "@src/modules/common/index";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes/index";
import { IRouterReducer } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import gql from "graphql-tag";
import { History } from "history";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import LoadingMask from "../../layout/LoadingMask/LoadingMask";
import { getCartItemTotalPrice } from "../CartItem/CartItem";
import { CartItem, CheckoutForm, EmptyCart, FinishedCart } from "../index";
import { ICart } from "../model";
import { ICartReducer } from "../reducer";

const styles = require("./styles.css");

interface StateProps {
  cartReducer: ICartReducer;
  router: IRouterReducer;
}

export interface IDataCart extends QueryProps {
  cart?: ICart;
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
    cart.items.forEach(item => {
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
  handleClick = e => {
    e.stopPropagation();
    const { isModal, history } = this.props;
    if (isModal) {
      history.goBack();
    } else {
      history.push(PATH_NAMES.home);
    }
  };

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
      return finishedId ? <FinishedCart id={finishedId} /> : <EmptyCart />;
    }

    return (
      <Flex direction="column" justify="between" className={styles.Cart}>
        <div className={styles.section}>
          <div className={styles.title}>
            Итого к оплате: <Price price={getCartTotalPrice(cart)} />
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
        </div>
        <CheckoutForm data={data} />
      </Flex>
    );
  }
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
