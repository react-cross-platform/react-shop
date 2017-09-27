import { ActionSheet, Flex, Icon } from "antd-mobile";
import update from "immutability-helper";
import React from "react";
import { gql, graphql } from "react-apollo";
import { compose } from "redux";

import { CART_QUERY, IDataCart } from "../Cart/Cart";

const styles = require("./styles.css");

let wrapProps;
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => {
      e.preventDefault();
    }
  };
}

const CONFIRM_OPTIONS = [
  <Flex align="center" justify="center">
    <Icon
      className={styles.optionIcon}
      type={require("!svg-sprite-loader!./remove.svg")}
    />Удалить
  </Flex>
];

interface IConnectedRemoveCartItemProps {
  submit: (id: number) => void;
}

interface IRemoveCartItemProps {
  id: number;
}

class RemoveCartItem extends React.Component<
  IConnectedRemoveCartItemProps & IRemoveCartItemProps,
  undefined
> {
  removeCartItem = () => {
    const { submit, id } = this.props;

    const actions = [];
    (ActionSheet.showActionSheetWithOptions as any)(
      {
        options: CONFIRM_OPTIONS,
        cancelButtonIndex: actions.length - 1,
        destructiveButtonIndex: actions.length - 2,
        title: "",
        message: "",
        maskClosable: true,
        wrapProps
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          submit(id);
        }
      }
    );
  };

  render() {
    return (
      <Icon
        className={styles.icon}
        type={require("!svg-sprite-loader!./remove.svg")}
        onClick={this.removeCartItem}
      />
    );
  }
}

const REMOVE_CART_ITEM_MUTATION = gql(require("./removeCartItem.gql"));

export default compose(
  graphql(REMOVE_CART_ITEM_MUTATION, {
    props: ({ ownProps, mutate }) => {
      return {
        submit(id) {
          return (mutate as any)({
            variables: { id },
            update: (store, { removeCartItem }) => {
              const data = store.readQuery({ query: CART_QUERY }) as IDataCart;
              data.cart.items = data.cart.items.filter(item => item.id !== id);
              store.writeQuery({ query: CART_QUERY, data });
            }
          });
        }
      };
    }
  })
)(RemoveCartItem) as any;
