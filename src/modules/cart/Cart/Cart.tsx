import { Flex } from 'antd-mobile';
import gql from 'graphql-tag';
import { History } from 'history';
import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { IRouterReducer } from '../../../interfaces';
import { IRootReducer } from '../../../rootReducer';
import { PATH_NAMES } from '../../../routing';
import { Price } from '../../common/index';
import { Loading } from '../../layout/index';
import { getScrollableStyle } from '../../layout/Modal/Modal';
import { getCartItemTotalPrice } from '../CartItem/CartItem';
import { CartItem, CheckoutTrigger, EmptyCart } from '../index';
import { ICart } from '../model';

const styles = require('./styles.css');

interface StateProps {
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

  isCurrentPage = () => {
    const { router } = this.props;
    return router.location.pathname === PATH_NAMES.cart;
  };

  render() {
    const { data, isModal, router, history } = this.props;
    const { loading } = data;
    if (loading === true) {
      return <Loading />;
    }

    const cart = data.cart as ICart;
    const amount = getCartAmount(cart);
    if (amount === 0) {
      return <EmptyCart history={history} isModal={isModal} />;
    }

    const totalPrice = getCartTotalPrice(cart);
    return (
      <Flex direction='column' className={styles.cart}>
        <div
          className={styles.content}
          style={getScrollableStyle(this.isCurrentPage())}
        >
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

const mapStateToProps = (state: IRootReducer): StateProps => ({
  router: state.router
});

export const CART_QUERY = gql(require('./cart.gql'));

export default compose(
  graphql<GraphQLProps, OwnProps>(CART_QUERY),
  connect<StateProps, {}, OwnProps>(mapStateToProps)
)(Cart);
