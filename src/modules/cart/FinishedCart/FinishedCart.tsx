import { Icon } from "@src/modules/common";
import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./styles.css");

export interface OwnProps {
  id: number;
}

class FinishedCart extends React.Component<OwnProps, {}> {
  render() {
    const { id } = this.props;

    return (
      <Link to={PATH_NAMES.home} className={styles.finishCart}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          className={styles.emptyCart}
        >
          <Icon
            className={styles.icon}
            type={require("!svg-sprite-loader!./circle-checked.svg")}
          />
          <div className={styles.title}>Заказ принят!</div>
          <div className={styles.continue}>
            номер заказа — {id}
          </div>
        </Flex>
      </Link>
    );
  }
}

export default FinishedCart;
