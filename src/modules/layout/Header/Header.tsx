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
}

class Header extends React.Component<OwnProps, {}> {
  goBack = e => {
    e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { location, left, title, right } = this.props;
    return (
      <Flex className={styles.Header} justify="between" align="center">
        {left === undefined
          ? <MyTouchFeedback>
              <MyIcon
                className={styles.left}
                type={
                  location.state && location.state.modal
                    ? require("!svg-sprite-loader!./close.svg")
                    : require("!svg-sprite-loader!./back.svg")
                }
                onClick={this.goBack}
              />
            </MyTouchFeedback>
          : left}
        <div className={styles.title}>
          {(location.state && location.state.title) || title}
        </div>
        {right === null ? <div className={styles.right} /> : <CartTrigger />}
      </Flex>
    );
  }
}

export default Header;
