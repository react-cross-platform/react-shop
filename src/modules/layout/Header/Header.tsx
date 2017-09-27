import { Flex, Icon } from "antd-mobile";
import * as React from "react";
import Ripples from "react-ripples";

import { CartTrigger } from "../../cart/index";
import { CatalogTrigger, HomeTrigger } from "../index";

const styles = require("./styles.css");

export const HEIGHT = 40;

class Header extends React.Component<any, any> {
  render() {
    return (
      <Flex
        className={styles.header}
        justify="between"
        align="center"
      >
        <CatalogTrigger height={HEIGHT} />
        <HomeTrigger height={HEIGHT} />
        <CartTrigger />
      </Flex>
    );
  }
}

export default Header;
