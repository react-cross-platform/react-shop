import { Catalog } from "@src/modules/layout";
import { Layout } from "@src/modules/layout";
import { ScrollToTop } from "@src/utils";
import * as React from "react";

import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface OwnProps extends IPage {}

class CatalogPage extends React.Component<OwnProps, {}> {
  getLayoutOptions = () => {
    const { history, location } = this.props;
    return {
      location,
      history,
      header: {
        title: "Каталог",
        right: null
      }
    };
  };

  render() {
    window.scrollTo(0, 0);
    const { location, history } = this.props;
    return (
      <ScrollToTop>
        <Layout {...this.getLayoutOptions()}>
          <div className={styles.CatalogPage}>
            <Catalog />
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

export default CatalogPage;
