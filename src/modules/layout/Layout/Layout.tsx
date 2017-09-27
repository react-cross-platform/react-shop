import { Flex } from "antd-mobile";
import * as React from "react";

import { Header } from "../index";

const styles = require("./styles.css");

interface ILayouProps {
  header: any;
}

class Layout extends React.Component<ILayouProps, undefined> {
  render() {
    const { header } = this.props;
    return (
      <Flex direction="column" className="full-size">
        {header}
        <Flex direction="column" className="full-size">
          {this.props.children}
        </Flex>
      </Flex>
    );
  }
}

export default Layout;
