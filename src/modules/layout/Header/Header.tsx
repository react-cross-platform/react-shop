import { CartTrigger } from "@src/modules/cart";
import { Flex } from "antd-mobile";
import * as React from "react";

import { HomeTrigger } from "../index";

const styles = require("./styles.css");

class Header extends React.Component<{}, {}> {
  render() {
    return (
      <Flex className={styles.Header} justify="between" align="center">
        <div style={{ width: 40 }} />
        <HomeTrigger />
        <CartTrigger />
      </Flex>
    );
  }
}

export default Header;
