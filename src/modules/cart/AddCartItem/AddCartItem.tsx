import gql from "graphql-tag";
import React from "react";
import { graphql } from "@apollo/client/react/hoc";

import { CART_QUERY, IDataCart } from "../Cart/Cart";
import { ICartItem } from "../model";
import { debug } from "console";

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
  attributeValueIds?: number[];
}

interface GraphQLProps {
  submit: () => IAddCartItem;
}

class AddCartItem extends React.Component<GraphQLProps & OwnProps, {}> {
  addCartItem = () => {
    const { submit } = this.props;
    submit();
  };

  render() {
    return <div onClick={this.addCartItem}>Купить</div>;
  }
}

const ADD_CART_ITEM_MUTATION = gql(require("./addCartItem.gql"));
const options = {
  props: ({ ownProps, mutate }) => {
    const { subProductId, attributeValueIds } = ownProps;
    return {
      submit: () => {
        mutate!({
          variables: {
            subProductId,
            attributeValueIds
          },
          update: (store, props: IAddCartItem) => {
            const {
              data: {
                addCartItem: { cartItem }
              }
            } = props;
            const data: IDataCart = store.readQuery({ query: CART_QUERY });
            if (!data.cart) {
              // FIXME: Refactor to hook to fix Error: Cannot assign to read only property 'cart' of object '#<Object>'
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

export default graphql<GraphQLProps, OwnProps>(ADD_CART_ITEM_MUTATION, options as any)(AddCartItem) as any;
