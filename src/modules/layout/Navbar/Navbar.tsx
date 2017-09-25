import { Flex, Icon, Modal } from "antd-mobile";
import * as React from "react";

import { CartTrigger } from "../../cart/index";

const styles = require("./styles.css");

interface INavbarProps {
  title: string;
  history: any;
}

class Navbar extends React.Component<INavbarProps, any> {
  goBack = e => {
    e.stopPropagation();
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { title } = this.props;
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
