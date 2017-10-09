import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import { History } from "history";
import * as React from "react";

const styles = require("./styles.css");

export interface OwnProps {
  history: History;
  isModal: boolean;
}

class EmptyCart extends React.Component<OwnProps, {}> {
  handleClick = () => {
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
        onClick={this.handleClick}
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
