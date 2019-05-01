import { CartQuery } from "@src/generated/graphql";
import update from "immutability-helper";
import React from "react";
import { graphql } from "react-apollo";

import { DataCart } from "../Cart/Cart";
import cartQuery from "../Cart/cartQuery.gql";
import addCartItemMutation from "./addCartItemMutation.gql";

const styles = require("./styles.css");

interface OwnProps {
  subProductId: number;
  attributeValueIds?: number[];
}

interface GraphQLProps {
  submit: () => CartQuery.Items;
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

// const options: OperationOption<OwnProps, GraphQLProps> = {
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
          update: (
            store,
            // props: IAddCartItem
            props: any // FIXME
          ) => {
            const {
              data: {
                addCartItem: { cartItem }
              }
            } = props;
            const data: DataCart = store.readQuery({ query: cartQuery });
            if (!data.cart) {
              data.cart = cartItem.cart;
              data.cart!.items = [];
            }
            data.cart!.items.push(cartItem);
            store.writeQuery({ query: cartQuery, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(addCartItemMutation, options as any)(AddCartItem) as any;
