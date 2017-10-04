import gql from "graphql-tag";
import update from "immutability-helper";
import React from "react";
import { graphql, OperationOption } from "react-apollo";

import { CART_QUERY, IDataCart } from "../Cart/Cart";
import { ICartItem } from "../model";

const styles = require("./styles.css");

interface IAddCartItem {
  data: {
    addCartItem: {
      cartItem: ICartItem;
    };
  };
}

interface OwnProps {
  subProductId: number;
}

interface GraphQLProps {
  submit: (subProductId: number) => IAddCartItem;
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
      submit: (subProductId: number) => {
        mutate!({
          variables: { subProductId },
          update: (store, props: IAddCartItem) => {
            const { data: { addCartItem: { cartItem } } } = props;
            const data: IDataCart = store.readQuery({ query: CART_QUERY });
            if (!data.cart) {
              data.cart = cartItem.cart;
              data.cart!.items = [];
            }
            data.cart!.items.push(cartItem);
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
