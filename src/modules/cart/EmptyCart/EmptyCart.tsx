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
        className={styles.EmptyCart}
      >
        <img
          className={styles.icon}
          src={require("./sad_smile.png")}
        />
        <div className={styles.title}>Корзина пуста</div>
        <div className={styles.continue}>нажмите чтобы продолжить</div>
      </Flex>
    );
  }
}

export default EmptyCart;
