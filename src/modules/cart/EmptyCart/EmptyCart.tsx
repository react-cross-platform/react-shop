import { Flex } from "antd-mobile";
import * as React from "react";

import { PATH_NAMES } from "../../../routing";

const styles = require("./styles.css");

export interface IEmptyCartProps {
  history: any;
  isModal: boolean;
}

class EmptyCart extends React.Component<IEmptyCartProps, {}> {
  handleClick = e => {
    const { isModal, history } = this.props;
    if (isModal) {
      history.goBack();
    } else {
      history.push(PATH_NAMES.home);
    }
  };

  render() {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        onClick={this.handleClick as any}
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
