import { Flex, Icon } from "antd-mobile";
import * as React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { PATH_NAMES } from "../../../routing";
import { CART_QUERY, getCartAmount, IDataCart } from "../Cart/Cart";

interface IConnectedCartTriggerProps {
  data: IDataCart;
  router: IRouterReducer;
}

const styles = require("./styles.css");

class CartTrigger extends React.Component<IConnectedCartTriggerProps, {}> {
  render() {
    const { data, router } = this.props;
    const { loading, cart } = data;
    const amount = getCartAmount(cart);
    return (
      <Link
        disabled={router.location.pathname === PATH_NAMES.cart}
        className={styles.cartTrigger}
        to={{
          pathname: PATH_NAMES.cart,
          state: { modal: true, title: "Корзина" } as any
        }}
      >
        {!loading && amount > 0
          ? <Flex justify="center" align="center" className={styles.amount}>
              {amount}
            </Flex>
          : null}
        <Icon
          className={styles.icon}
          type={require("!svg-sprite-loader!./cart.svg")}
          size="md"
        />
      </Link>
    );
  }
}

const mapStateToProps: any = state => ({
  router: state.router
});

export default compose(
  connect<IConnectedCartTriggerProps, {}, {}>(mapStateToProps),
  graphql(CART_QUERY)
)(CartTrigger as any) as any;
