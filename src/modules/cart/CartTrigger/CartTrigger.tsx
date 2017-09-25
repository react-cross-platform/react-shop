import { Flex, Icon } from "antd-mobile";
import * as React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { CART_QUERY, getCartAmount, IDataCart } from "../Cart/Cart";

interface IConnectedCartTriggerProps {
  data: IDataCart;
  router: IRouterReducer;
}

interface ICartTriggerProps {}

const styles = require("./styles.css");

class CartTrigger extends React.Component<
  IConnectedCartTriggerProps & ICartTriggerProps,
  undefined
> {
  render() {
    const { data, router } = this.props;
    const { loading, cart } = data;
    const amount = getCartAmount(cart);
    const pathname = "/cart/";
    return (
      <Link
        disabled={router.location.pathname === pathname}
        className={styles.cartTrigger}
        to={{
          pathname,
          state: { modal: true, title: "Корзина" }
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
  connect<IConnectedCartTriggerProps, {}, ICartTriggerProps>(mapStateToProps),
  graphql(CART_QUERY)
)(CartTrigger as any);
