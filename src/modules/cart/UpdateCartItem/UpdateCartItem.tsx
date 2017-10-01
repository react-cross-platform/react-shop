import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import { compose } from "redux";

const styles = require("./styles.css");

interface IConnectedUpdateCartItemProps {
  submit: (id: number, amount: number) => void;
}

interface IUpdateCartItemProps {
  id: number;
  amount: number;
}

class UpdateCartItem extends React.Component<
  IConnectedUpdateCartItemProps & IUpdateCartItemProps,
  {}
> {
  onChange = e => {
    const { id, submit } = this.props;
    submit(id, e.target.value);
  };

  render() {
    const { amount } = this.props;
    const options = new Array(10).keys();
    return (
      <select
        value={amount}
        onChange={this.onChange as any}
        className={styles.updateCartItem}
      >
        {[...Array(10).keys()].map(i =>
          <option key={i}>
            {i + 1}
          </option>
        )}
      </select>
    );
  }
}

const UPDATE_CART_ITEM_QUERY = gql(require("./updateCartItem.gql"));

export default compose(
  graphql(UPDATE_CART_ITEM_QUERY, {
    props: ({ ownProps, mutate }) => {
      return {
        submit(id: number, amount: number) {
          return (mutate as any)({ variables: { id, amount } });
        }
      };
    }
  })
)(UpdateCartItem as any) as any;
