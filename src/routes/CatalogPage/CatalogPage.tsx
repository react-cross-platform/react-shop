import { Catalog } from "@src/modules/layout";
import { Layout } from "@src/modules/layout";
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
    const { location, history } = this.props;
    return (
      <Layout {...this.getLayoutOptions()}>
        <div className={styles.CatalogPage}>
          <Catalog />
        </div>
      </Layout>
    );
  }
}

export default CatalogPage;
