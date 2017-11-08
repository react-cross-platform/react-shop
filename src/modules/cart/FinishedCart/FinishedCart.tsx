import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { PATH_NAMES } from "@src/routes";
import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./styles.css");

interface OwnProps {
  id: number;
}

interface State {}

class FinishedCart extends React.Component<OwnProps, State> {
  render() {
    const { id } = this.props;

    return (
      <MyTouchFeedback>
        <Link to={PATH_NAMES.home} className={styles.FinishedCart}>
          <MyIcon
            className={styles.icon}
            type={require("!svg-sprite-loader!./circle-checked.svg")}
          />
          <div className={styles.title}>Заказ принят!</div>
          <div className={styles.continue}>
            номер заказа — {id}
          </div>
        </Link>
      </MyTouchFeedback>
    );
  }
}

export default FinishedCart;
