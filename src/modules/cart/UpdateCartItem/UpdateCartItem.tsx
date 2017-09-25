import { Stepper } from "antd-mobile";
import update from "immutability-helper";
import React from "react";
import { gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

const styles = require("./styles.css");

interface IConnectedUpdateCartItemProps {
  submit: (id: number, amount: number) => void;
}

interface IUpdateCartItemProps {
  id: number;
  amount: number;
}

interface IUpdateCartItemState {
  amount: number;
}

class UpdateCartItem extends React.Component<
  IConnectedUpdateCartItemProps & IUpdateCartItemProps,
  IUpdateCartItemState
> {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount
    };
  }

  onChange = (amount: number) => {
    const { id, submit } = this.props;
    this.setState({ amount });
    submit(id, amount);
  };

  render() {
    const { amount } = this.props;
    return (
      <Stepper
        className={styles.updateCartItem}
        showNumber={true}
        max={10}
        min={1}
        value={this.state.amount}
        onChange={this.onChange}
      />
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
)(UpdateCartItem) as any;
