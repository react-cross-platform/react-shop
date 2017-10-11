import { Catalog, Flatpages } from "@src/modules/layout";
import { HomeTrigger, Layout } from "@src/modules/layout";
import { getScrollableStyle } from "@src/modules/layout/utils";
import { WhiteSpace } from "antd-mobile";
import * as React from "react";

import { PATH_NAMES } from "../index";
import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class HomePage extends React.Component<OwnProps, {}> {
  getLayoutOptions = () => {
    return {
      header: {
        title: <HomeTrigger />
      }
    };
  };

  isCurrentPage = () => {
    const { location } = this.props;
    return location.pathname === PATH_NAMES.home;
  };

  render() {
    const { location, history } = this.props;
    return (
      <Layout
        location={location}
        history={history}
        {...this.getLayoutOptions()}
      >
        <div className={styles.HomePage} style={{ ...getScrollableStyle(this.isCurrentPage()) }}>
          <Catalog />
          <WhiteSpace size="lg" />
          <Flatpages />
        </div>
      </Layout>
    );
  }
}

export default HomePage;
