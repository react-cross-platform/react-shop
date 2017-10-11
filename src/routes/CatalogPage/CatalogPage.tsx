import { Catalog } from "@src/modules/layout";
import { Layout } from "@src/modules/layout";
import { getScrollableStyle } from "@src/modules/layout/utils";
import * as React from "react";

import { PATH_NAMES } from "../index";
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

  isCurrentPage = () => {
    const { location } = this.props;
    return location.pathname === PATH_NAMES.catalog;
  };

  render() {
    const { location, history } = this.props;
    return (
      <Layout {...this.getLayoutOptions()}>
        <div
          className={styles.CatalogPage}
          style={getScrollableStyle(this.isCurrentPage())}
        >
          <Catalog />
        </div>
      </Layout>
    );
  }
}

export default CatalogPage;
