import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { IRouterReducer } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import * as React from "react";
import { graphql, QueryResult } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

import { getCartAmount } from "../Cart/Cart";
import cartQuery from "../Cart/cartQuery.gql";
import { DataCart } from "../Cart/DataCart";

interface OwnProps {
  isTransporant: boolean;
}

interface StateProps {
  router: IRouterReducer;
}

interface GraphQLProps extends QueryResult {
  data: DataCart;
}

interface Props extends OwnProps, StateProps, GraphQLProps {}

const styles = require("./styles.css");

class CartTrigger extends React.Component<Props> {
  isCartPage = () => {
    const { router } = this.props;
    return router.location.pathname === PATH_NAMES.cart;
  };

  render() {
    const { data, router, isTransporant } = this.props;
    const { loading, cart } = data;
    const amount = getCartAmount(cart!);
    return (
      <MyTouchFeedback
        style={{
          background: isTransporant ? "lightgray" : "#19599e"
        }}
      >
        <Link
          className={styles.CartTrigger}
          style={{ visibility: this.isCartPage() ? "hidden" : "visible" }}
          to={{
            pathname: PATH_NAMES.cart,
            state: { modal: true, title: "Корзина" }
          }}
        >
          {!loading && amount > 0 ? (
            <Flex justify="center" align="center" className={styles.amount}>
              {amount}
            </Flex>
          ) : null}
          <MyIcon
            style={{ fill: isTransporant ? "black" : "white" }}
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
  graphql<GraphQLProps, OwnProps>(cartQuery),
  connect<StateProps, {}, OwnProps>(mapStateToProps)
)(CartTrigger) as any;
