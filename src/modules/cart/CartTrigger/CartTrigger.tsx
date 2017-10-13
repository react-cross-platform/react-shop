import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { IRouterReducer } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import * as React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { CART_QUERY, getCartAmount, IDataCart } from "../Cart/Cart";

interface StateProps {
  router: IRouterReducer;
}

interface GraphQLProps {
  data: IDataCart;
}

const styles = require("./styles.css");

class CartTrigger extends React.Component<StateProps & GraphQLProps, {}> {
  isCartPage = () => {
    const { router } = this.props;
    return router.location.pathname === PATH_NAMES.cart;
  };

  render() {
    const { data, router } = this.props;
    const { loading, cart } = data;
    const amount = getCartAmount(cart);
    return (
      <MyTouchFeedback>
        <Link
          className={styles.CartTrigger}
          style={{ visibility: this.isCartPage() ? "hidden" : "visible" }}
          to={{
            pathname: PATH_NAMES.cart,
            state: { modal: true, title: "Корзина" }
          }}
        >
          {!loading && amount > 0
            ? <Flex justify="center" align="center" className={styles.amount}>
                {amount}
              </Flex>
            : null}
          <MyIcon
            className={styles.icon}
            type={require("!svg-sprite-loader!./cart.svg")}
            size="md"
          />
        </Link>
      </MyTouchFeedback>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  router: state.router
});

export default compose(
  graphql<GraphQLProps, {}>(CART_QUERY),
  connect<StateProps, {}, {}>(mapStateToProps)
)(CartTrigger);
