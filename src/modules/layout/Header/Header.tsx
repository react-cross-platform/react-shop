import { CartTrigger } from "@src/modules/cart";
import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { IPage } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

interface OwnProps extends IPage {
  left?: JSX.Element | string;
  title?: JSX.Element | string;
  right?: JSX.Element;
  onTop: boolean;
}

interface StateProps {}

interface Props extends OwnProps, StateProps {}

class Header extends React.Component<Props, {}> {
  goBack = e => {
    e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { location, left, title, right, onTop } = this.props;
    return (
      <Flex
        className={styles.Header}
        justify="between"
        align="center"
        style={{
          background: onTop ? "none" : "#2474cc"
        }}
      >
        {left === undefined
          ? <MyTouchFeedback>
              <MyIcon
                className={styles.left}
                style={{ fill: onTop ? "black" : "white" }}
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
                color: onTop ? "black" : "white",
                fill: onTop ? "black" : "white"
              }}
            >
              {left}
            </div>}

        <div
          style={{
            color: onTop ? "black" : "white",
            opacity:
              location.pathname.indexOf("product") !== -1 && onTop ? 0 : 1
          }}
          className={styles.title}
        >
          {(location.state && location.state.title) || title}
        </div>

        {right === null
          ? <div className={styles.right} />
          : <CartTrigger onTop={onTop} />}
      </Flex>
    );
  }
}

export default Header;
