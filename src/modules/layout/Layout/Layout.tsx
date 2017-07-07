import * as React from "react";

import { Header, SidebarCatalog, SidebarMenu } from "../index";

class Layout extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        <SidebarMenu>
          <SidebarCatalog>
            <div>
              {this.props.children}
            </div>
          </SidebarCatalog>
        </SidebarMenu>
      </div>
    );
  }
}

export default Layout;
