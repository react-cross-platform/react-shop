import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { PATH_NAMES } from "@src/routes";
import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./styles.css");

interface OwnProps {
  id: number;
}

interface State {
  imageSize: number;
}

const initialImageSize = 170;

class FinishedCart extends React.Component<OwnProps, State> {
  state = {
    imageSize: initialImageSize
  };

  handleScroll = event => {
    this.setState({ imageSize: initialImageSize + window.pageYOffset });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }

  render() {
    const { id } = this.props;

    return (
      <MyTouchFeedback>
        <Link to={PATH_NAMES.home} className={styles.FinishedCart}>
          <MyIcon
            className={styles.icon}
            style={{
              width: this.state.imageSize,
              height: this.state.imageSize
            }}
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
