import { Layout } from "@src/modules/layout";
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

  render() {
    const { location, history } = this.props;
    return (
      <Layout {...this.getLayoutOptions()}>
        <div className={styles.FlatpagePage}>
          {location.state.content}
        </div>
      </Layout>
    );
  }
}

export default FlatpagePage;
