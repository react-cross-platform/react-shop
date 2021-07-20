import { MyTouchFeedback } from "@src/modules/common/utils";
import gql from "graphql-tag";
import React from "react";
import { graphql } from "@apollo/client/react/hoc";

import { ICartItem } from "../model";

const styles = require("./styles.css");

interface IUpdateCartItem {
  data: {
    updateCartItem: {
      cartItem: ICartItem;
    };
  };
}

interface GraphQLProps {
  submit: (id: number, amount: number) => IUpdateCartItem;
}

interface OwnProps {
  id: number;
  amount: number;
}

class UpdateCartItem extends React.Component<GraphQLProps & OwnProps, {}> {
  onChange = (e) => {
    const { id, submit } = this.props;
    submit(id, e.target.value);
  };

  render() {
    const { amount } = this.props;
    const options = new Array(10).keys();
    return (
      <MyTouchFeedback>
        <select value={amount} onChange={this.onChange} className={styles.UpdateCartItem}>
          {[...Array(10).keys()].map((i) => (
            <option key={i}>{i + 1}</option>
          ))}
        </select>
      </MyTouchFeedback>
    );
  }
}

const UPDATE_CART_ITEM_MUTATION = gql(require("./updateCartItem.gql"));

const options = {
  props: ({ ownProps, mutate }) => {
    return {
      submit: (id: number, amount: number) => {
        return mutate!({ variables: { id, amount } });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(
  UPDATE_CART_ITEM_MUTATION,
  options as any
)(UpdateCartItem) as any;
