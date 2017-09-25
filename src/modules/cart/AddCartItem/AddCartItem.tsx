import update from "immutability-helper";
import React from "react";
import { gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { CART_QUERY } from "../Cart/Cart";

const styles = require("./styles.css");

interface IConnectedAddCartItemProps {
  submit: (subProductId: number) => void;
}

interface IAddCartItemProps {
  subProductId: number;
}

class AddCartItem extends React.Component<
  IConnectedAddCartItemProps & IAddCartItemProps,
  undefined
> {
  addCartItem = () => {
    const { submit, subProductId } = this.props;
    submit(subProductId);
  };

  render() {
    return <div onClick={this.addCartItem}>Купить</div>;
  }
}

const ADD_CART_ITEM_MUTATION = gql(require("./addCartItem.gql"));

export default compose(
  graphql(ADD_CART_ITEM_MUTATION, {
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
  })
)(AddCartItem) as any;
