import { Flex } from "antd-mobile";
import * as React from "react";

import { Header, SidebarCatalog } from "../index";

const styles = require("./styles.css");

class Layout extends React.Component<any, any> {
  render() {
    return (
      <Flex direction="column" className={styles.layout}>
        <Header />
        <SidebarCatalog>
          <div className={styles.layoutContent}>
            {this.props.children}
          </div>
        </SidebarCatalog>
      </Flex>
    );
  }
}

export default Layout;
