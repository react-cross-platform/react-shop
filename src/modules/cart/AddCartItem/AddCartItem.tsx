import gql from "graphql-tag";
import update from "immutability-helper";
import React from "react";
import { graphql, OperationOption } from "react-apollo";

import { CART_QUERY } from "../Cart/Cart";

const styles = require("./styles.css");

interface GraphQLProps {
  submit: (subProductId: number) => void;
}

interface OwnProps {
  subProductId: number;
}

class AddCartItem extends React.Component<GraphQLProps & OwnProps, {}> {
  addCartItem = () => {
    const { submit, subProductId } = this.props;
    submit(subProductId);
  };

  render() {
    return <div onClick={this.addCartItem}>Купить</div>;
  }
}

const ADD_CART_ITEM_MUTATION = gql(require("./addCartItem.gql"));

const options: OperationOption<OwnProps, GraphQLProps> = {
  props: ({ ownProps, mutate }) => {
    return {
      submit(subProductId: number) {
        return (mutate as any)({
          variables: { subProductId },
          update: (store, { data: { addCartItem: { cartItem } } }) => {
            const data = store.readQuery({ query: CART_QUERY });
            if (!data.cart) {
              data.cart = cartItem.cart;
              data.cart.items = [];
            }
            data.cart.items.push(cartItem);
            store.writeQuery({ query: CART_QUERY, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(ADD_CART_ITEM_MUTATION, options)(
  AddCartItem
);
