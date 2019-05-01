import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { Modal } from "antd-mobile";
import gql from "graphql-tag";
import update from "immutability-helper";
import React from "react";
import { graphql } from "react-apollo";

import { DataCart } from "../Cart/Cart";
import cartQuery from "../Cart/cartQuery.gql";

const styles = require("./styles.css");

interface IRemoveCartItem {
  data: {
    removeCartItem: {
      totalPrice: number;
    };
  };
}

interface GraphQLProps {}

interface OwnProps {
  submit: (id: number) => IRemoveCartItem;
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
// const options: OperationOption<OwnProps, GraphQLProps> = {
const options = {
  props: ({ ownProps, mutate }) => {
    return {
      submit: id => {
        return mutate!({
          variables: { id },
          update: (store, props: IRemoveCartItem) => {
            const data = store.readQuery({ query: cartQuery }) as DataCart;
            if (data.cart) {
              data.cart.items = data.cart.items.filter(item => item.id !== id);
            }
            store.writeQuery({ query: cartQuery, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(REMOVE_CART_ITEM_MUTATION, options as any)(
  RemoveCartItem as any
) as any;
