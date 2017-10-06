import { ActionSheet, Flex } from "antd-mobile";
import gql from "graphql-tag";
import update from "immutability-helper";
import React from "react";
import { graphql } from "react-apollo";
import { OperationOption } from "react-apollo/types";

import { Icon } from "../../common/index";
import { CART_QUERY, IDataCart } from "../Cart/Cart";

const styles = require("./styles.css");

// fix touch to scroll background page on iOS
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

const CONFIRM_OPTIONS = [
  {
    title: "УДАЛИТЬ",
    message: "",
    icon: (
      <Icon
        className={styles.optionIcon}
        type={require("!svg-sprite-loader!./remove.svg")}
      />
    )
  }
];

interface IRemoveCartItem {
  data: {
    removeCartItem: {
      totalPrice: number;
    };
  };
}

interface GraphQLProps {
  submit: (id: number) => IRemoveCartItem;
}

interface OwnProps {
  id: number;
}

class RemoveCartItem extends React.Component<GraphQLProps & OwnProps, {}> {
  removeCartItem = () => {
    const { submit, id } = this.props;
    const actions = [];
    (ActionSheet as any).showShareActionSheetWithOptions(
      {
        maskClosable: true,
        message: "",
        options: CONFIRM_OPTIONS,
        title: "",
        cancelButtonText: "",
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
const options: OperationOption<OwnProps, GraphQLProps> = {
  props: ({ ownProps, mutate }) => {
    return {
      submit: id => {
        return mutate!({
          variables: { id },
          update: (store, props: IRemoveCartItem) => {
            const data = store.readQuery({ query: CART_QUERY }) as IDataCart;
            if (data.cart) {
              data.cart.items = data.cart.items.filter(item => item.id !== id);
            }
            store.writeQuery({ query: CART_QUERY, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(
  REMOVE_CART_ITEM_MUTATION,
  options
)(RemoveCartItem);
