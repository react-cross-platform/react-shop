import { Flatpages } from "@src/modules/layout";
import { Layout } from "@src/modules/layout";
import { getScrollableStyle } from "@src/modules/layout/utils";
import * as React from "react";

import { PATH_NAMES } from "../index";
import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class FlatpagesPage extends React.Component<OwnProps, {}> {
  getLayoutOptions = () => {
    const { history, location } = this.props;
    return {
      location,
      history,
      header: {
        title: "Инфо",
        right: null
      }
    };
  };

  isCurrentPage = () => {
    const { location } = this.props;
    return location.pathname === PATH_NAMES.flatpages;
  };

  render() {
    const { location, history } = this.props;
    return (
      <Layout {...this.getLayoutOptions()}>
        <div
          className={styles.FlatpagesPage}
          style={getScrollableStyle(this.isCurrentPage())}
        >
          <Flatpages />
        </div>
      </Layout>
    );
  }
}

export default FlatpagesPage;
