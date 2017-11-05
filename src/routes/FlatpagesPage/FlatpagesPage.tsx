import { Flatpages } from "@src/modules/layout";
import { Layout } from "@src/modules/layout";
import { ScrollToTop } from "@src/utils";
import * as React from "react";

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

  render() {
    const { location, history } = this.props;
    return (
      <ScrollToTop>
        <Layout {...this.getLayoutOptions()}>
          <div className={styles.FlatpagesPage}>
            <Flatpages />
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

export default FlatpagesPage;
