import { SubCatalog } from "@src/modules/layout";
import { ICategory } from "@src/modules/product/model";
import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";

import LoadingMask from "../LoadingMask/LoadingMask";

const styles = require("./styles.css");

interface IDataCategory extends QueryProps {
  categories?: [ICategory];
}

interface GraphQLProps {
  data: IDataCategory;
}

class Catalog extends React.Component<GraphQLProps, {}> {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <LoadingMask />;
    }
    const { loading, categories } = data;
    const startCats: ICategory[] = [];
    const childrenMap = {};
    for (const cat of categories!) {
      if (cat.parent) {
        const key = cat.parent.id;
        if (!(key in childrenMap)) {
          childrenMap[key] = [];
        }
        childrenMap[key].push(cat);
      } else {
        startCats.push(cat);
      }
    }
    return (
      <div className={styles.Catalog}>
        {startCats.map((parent, i) =>
          <div key={i}>
            <div className={styles.header}>
              {parent.name}
            </div>
            <SubCatalog key={i} categories={childrenMap[parent.id]} />
          </div>
        )}
      </div>
    );
  }
}

const CATEGORIES_QUERY = gql(require("./categories.gql"));

export default graphql(CATEGORIES_QUERY)(Catalog);
