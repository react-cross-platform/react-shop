import { Flatpages } from "@src/modules/layout";
import { Layout } from "@src/modules/layout";
import { getScrollableStyle } from "@src/modules/layout/utils";
import * as React from "react";

import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class FlatpagePage extends React.Component<OwnProps, {}> {
  getLayoutOptions = () => {
    const { history, location } = this.props;
    return {
      location,
      history,
      header: {
        title: "Инфо",
        right: null
      },
      footer: null
    };
  };

  isCurrentPage = () => {
    const { location } = this.props;
    return location.pathname.indexOf("flatpage") !== -1;
  };

  render() {
    const { location, history } = this.props;
    return (
      <Layout {...this.getLayoutOptions()}>
        <div
          className={styles.FlatpagePage}
          style={getScrollableStyle(this.isCurrentPage())}
        >
          {location.state.content}
        </div>
      </Layout>
    );
  }
}

export default FlatpagePage;
