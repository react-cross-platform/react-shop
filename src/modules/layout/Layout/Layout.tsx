import { IPage } from "@src/routes/interfaces";
import * as React from "react";
import { withRouter } from "react-router";

import { Footer, Header } from "../index";

const styles = require("./styles.css");

interface OwnProps extends IPage {
  header?: {
    left?: JSX.Element;
    title?: JSX.Element | string;
  };
  footer?: JSX.Element | null;
}

class Layout extends React.Component<OwnProps, {}> {
  render() {
    const { history, location, header, footer } = this.props;
    return (
      <div className={styles.Layout}>
        <Header {...header} location={location} history={history} />
        <div
          className={styles.layoutContent}
          style={{ padding: `2.8rem 0 ${footer === null ? 0 : "2.8rem"}` }}
        >
          {this.props.children}
        </div>
        {footer !== null && <Footer location={location} history={history} />}
      </div>
    );
  }
}

export default Layout;
