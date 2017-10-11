import { IPage } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import * as React from "react";

import { Footer, Header } from "../index";

const styles = require("./styles.css");

interface OwnProps extends IPage {
  header?: {
    title?: JSX.Element | string;
  };
  footer?: any;
}

class Layout extends React.Component<OwnProps, {}> {
  render() {
    const { history, location, header, footer } = this.props;
    return (
      <Flex direction="column" className="full-size">
        <Header {...header} location={location} history={history} />
        <Flex direction="column" className="full-size">
          {this.props.children}
        </Flex>
        {footer === null
          ? null
          : <Footer location={location} history={history} />}
      </Flex>
    );
  }
}

export default Layout;
