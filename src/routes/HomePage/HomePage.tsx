import { Catalog, Flatpages, HomeTrigger, Layout } from "@src/modules/layout";
import { ScrollToTop } from "@src/utils";
import * as React from "react";

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

  render() {
    const { location, history } = this.props;
    return (
      <ScrollToTop>
        <Layout
          location={location}
          history={history}
          {...this.getLayoutOptions()}
        >
          <div className={styles.HomePage}>
            <Catalog />
            <Flatpages />
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

export default HomePage;
