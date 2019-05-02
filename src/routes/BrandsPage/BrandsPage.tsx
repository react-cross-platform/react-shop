import { BrandsQuery } from "@src/generated/graphql";
import Cards from "@src/modules/common/Cards/Cards";
import { Layout } from "@src/modules/layout";
import { ScrollToTop } from "@src/utils";
import * as React from "react";
import { graphql, QueryResult } from "react-apollo";

import { IPage } from "../interfaces";
import brandsQuery from "./brandsQuery.gql";

const styles = require("./styles.css");

interface DataBrands extends BrandsQuery.Query, QueryResult {}

interface GraphQLProps {
  data: DataBrands;
}

interface Props extends GraphQLProps, IPage {}

class BrandsPage extends React.Component<Props> {
  getLayoutOptions = () => {
    const { history, location } = this.props;
    return {
      location,
      history,
      header: {
        title: "Бренды",
        right: null
      }
    };
  };

  render() {
    window.scrollTo(0, 0);
    const { location, history, data } = this.props;
    const { brands } = data;
    return (
      <ScrollToTop>
        <Layout {...this.getLayoutOptions()}>
          <div className={styles.CatalogPage}>
            <Cards items={brands! as any}/>
          </div>
        </Layout>
      </ScrollToTop>
    );
  }
}

const BrandContainerPage = graphql(brandsQuery)(BrandsPage);
export default BrandContainerPage;
