import { MyTouchFeedback } from "@src/modules/common/utils";
import { PATH_NAMES } from "@src/routes";
import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./styles.css");

interface OwnProps {}

interface State {
  imageSize: number;
}

const initialImageSize = 170;

class EmptyCart extends React.Component<OwnProps, State> {
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
    return (
      <MyTouchFeedback>
        <Link to={PATH_NAMES.home} className={styles.EmptyCart}>
          <img
            style={{ width: this.state.imageSize }}
            className={styles.icon}
            src={require("./sad_smile.png")}
          />
          <div className={styles.title}>Корзина пуста</div>
          <div className={styles.continue}>нажмите чтобы продолжить</div>
        </Link>
      </MyTouchFeedback>
    );
  }
}

export default EmptyCart;
