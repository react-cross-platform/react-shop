import { Flex } from "antd-mobile";
import * as React from "react";
import { gql, graphql } from "react-apollo";
import { compose } from "redux";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { getCartItemTotalPrice } from "../CartItem/CartItem";
import { ICart } from "../model";

const styles = require("./styles.css");

export interface IEmptyCartProps {
  history: any;
  isModal: boolean;
}

class EmptyCart extends React.Component<IEmptyCartProps, undefined> {
  handleClick = e => {
    e.stopPropagation();
    const { isModal, history } = this.props;
    if (isModal) {
      history.goBack();
    } else {
      history.push("/");
    }
  };

  render() {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        onPress={this.handleClick}
        className={styles.emptyCart}
      >
        <img
          className={styles.emptyCartImage}
          src={require("./sad_smile.png")}
        />
        <div className={styles.emptyCartTitle}>Корзина пуста</div>
        <div className={styles.emptyCartContinue}>нажмите чтобы продолжить</div>
      </Flex>
    );
  }
}

export default EmptyCart;
