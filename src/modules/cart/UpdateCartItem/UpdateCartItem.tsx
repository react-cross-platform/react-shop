import gql from "graphql-tag";
import React from "react";
import { graphql, OperationOption } from "react-apollo";

const styles = require("./styles.css");

interface GraphQLProps {
  submit: (id: number, amount: number) => void;
}

interface OwnProps {
  id: number;
  amount: number;
}

class UpdateCartItem extends React.Component<GraphQLProps & OwnProps, {}> {
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

const options: OperationOption<OwnProps, GraphQLProps> = {
  props: ({ ownProps, mutate }) => {
    return {
      submit(id: number, amount: number) {
        return (mutate as any)({ variables: { id, amount } });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(UPDATE_CART_ITEM_QUERY, options)(
  UpdateCartItem
);
