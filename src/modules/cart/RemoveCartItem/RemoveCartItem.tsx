import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { Modal } from "antd-mobile";
import gql from "graphql-tag";
import update from "immutability-helper";
import React from "react";
import { graphql } from "@apollo/client/react/hoc";

import { CART_QUERY, IDataCart } from "../Cart/Cart";

const styles = require("./styles.css");

interface IRemoveCartItem {
  data: {
    removeCartItem: {
      totalPrice: number;
    };
  };
}

interface GraphQLProps {
  submit: (id: number) => IRemoveCartItem;
}

interface OwnProps {
  id: number;
}

class RemoveCartItem extends React.Component<GraphQLProps & OwnProps, {}> {
  removeCartItem = () => {
    const { submit, id } = this.props;
    Modal.alert(<div style={{ marginTop: "1rem" }}>Удалить из корзины?</div>, "", [
      { text: "Нет", onPress: () => null },
      { text: "Да", onPress: () => submit(id) }
    ]);
  };

  render() {
    return (
      <MyTouchFeedback>
        <MyIcon
          className={styles.RemoveCartItem}
          type={require("!svg-sprite-loader!./remove.svg")}
          onClick={this.removeCartItem}
        />
      </MyTouchFeedback>
    );
  }
}

const REMOVE_CART_ITEM_MUTATION = gql(require("./removeCartItem.gql"));
const options = {
  props: ({ ownProps, mutate }) => {
    return {
      submit: (id) => {
        return mutate!({
          variables: { id },
          update: (store, props: IRemoveCartItem) => {
            const data = store.readQuery({ query: CART_QUERY }) as IDataCart;
            if (data.cart) {
              data.cart.items = data.cart.items.filter((item) => item.id !== id);
            }
            store.writeQuery({ query: CART_QUERY, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(
  REMOVE_CART_ITEM_MUTATION,
  options as any
)(RemoveCartItem) as any;
