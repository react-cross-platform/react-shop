import { CartTrigger } from "@src/modules/cart";
import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { IPage } from "@src/routes/interfaces";
import { PATH_NAMES } from "@src/routes/RouteSwitch/RouteSwitch";
import { Flex } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

interface OwnProps extends IPage {
  left?: JSX.Element | string;
  title?: JSX.Element | string;
  right?: JSX.Element;
  onTop: boolean;
  style?: any;
}

interface StateProps {}

interface Props extends OwnProps, StateProps {}

class Header extends React.Component<Props, {}> {
  goBack = e => {
    e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  };

  isTransporant = () => {
    const { location, onTop } = this.props;
    return onTop && location.pathname.indexOf("product") !== -1;
  };

  render() {
    const { location, left, title, right, onTop, style } = this.props;
    return(
      <Flex
        className={styles.Header}
        justify="between"
        align="center"
        style={{
          ...style,
          background: this.isTransporant() ? "none" : "#2474cc"
        }}
      >
        {left === undefined
          ? <MyTouchFeedback
              style={{
                background: this.isTransporant() ? "lightgray" : "#19599e"
              }}
            >
              <MyIcon
                className={styles.left}
                style={{ fill: this.isTransporant() ? "black" : "white" }}
                type={
                  location.state && location.state.modal
                    ? require("!svg-sprite-loader!./close.svg")
                    : require("!svg-sprite-loader!./back.svg")
                }
                onClick={this.goBack}
              />
            </MyTouchFeedback>
          : <div
              style={{
                color: this.isTransporant() ? "black" : "white",
                fill: this.isTransporant() ? "black" : "white"
              }}
            >
              {left}
            </div>}

        <div
          style={{
            color: this.isTransporant() ? "black" : "white",
            opacity:
              location.pathname.indexOf("product") !== -1 &&
              this.isTransporant()
                ? 0
                : 1
          }}
          className={styles.title}
        >
          {(location.state && location.state.title) || title}
        </div>

        {right === null
          ? <div className={styles.right} />
          : <CartTrigger isTransporant={this.isTransporant()} />}
      </Flex>
    );
  }
}

export default Header;
