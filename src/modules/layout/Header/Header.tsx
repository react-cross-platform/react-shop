import {
  Button,
  Card,
  Flex,
  Icon,
  List,
  NavBar,
  NoticeBar,
  WingBlank
} from "antd-mobile";
import * as React from "react";
import Ripples from "react-ripples";
import { Link } from "react-router-dom";
import { CatalogTrigger, HomeTrigger, MenuTrigger } from "../index";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

export const HEIGHT = 80;

class Header extends React.Component<any, any> {
  render() {
    return (
      <Flex
        className={styles.root}
        justify="between"
        align="center"
        style={{ height: `${HEIGHT}px` }}
      >
        <HomeTrigger height={HEIGHT} />
        <MenuTrigger height={HEIGHT} />
        <CatalogTrigger height={HEIGHT} />
        <Icon
          type={require("!svg-sprite-loader!./cart.svg")}
          size="md"
          style={{
            height: HEIGHT,
            padding: `0 ${HEIGHT / 3}px`
          }}
        />
      </Flex>
    );
  }
}

export default Header;
