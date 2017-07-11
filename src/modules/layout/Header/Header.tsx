import { Flex, Icon, Toast } from "antd-mobile";
import * as React from "react";
import Ripples from "react-ripples";

import { CatalogTrigger, HomeTrigger } from "../index";

const styles = require("./styles.css");

export const HEIGHT = 80;

class Header extends React.Component<any, any> {
  handleCart = () => {
    return Toast.info("To Be Continued...", 2);
  };

  render() {
    return (
      <Flex
        className={styles.header}
        justify="between"
        align="center"
        style={{ height: `${HEIGHT}px` }}
      >
        <CatalogTrigger height={HEIGHT} />
        <HomeTrigger height={HEIGHT} />
        <Ripples style={{ height: HEIGHT }}>
          <Icon
            type={require("!svg-sprite-loader!./cart.svg")}
            size="md"
            style={{
              height: HEIGHT,
              padding: `0 ${HEIGHT / 3}px`
            }}
            onClick={this.handleCart}
          />
        </Ripples>
      </Flex>
    );
  }
}

export default Header;
