import { Flex } from "antd-mobile";
import { History } from "history";
import * as React from "react";

import { CartTrigger } from "../../cart/index";
import { Icon } from "../../common/index";

const styles = require("./styles.css");

interface OwnProps {
  title: string;
  history: History;
}

class Navbar extends React.Component<OwnProps, {}> {
  goBack = e => {
    // e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { title, history } = this.props;
    return (
      <Flex className={styles.navbar} justify="between" align="center">
        <Icon
          className={styles.back}
          type={require("!svg-sprite-loader!./back.svg")}
          onClick={this.goBack}
        />
        <div className={styles.title} onClick={this.goBack}>
          {title}
        </div>
        <CartTrigger />
      </Flex>
    );
  }
}

export default Navbar;
