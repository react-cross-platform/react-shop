import { CategoriesQuery } from "@src/generated/graphql";
import { SubCatalog } from "@src/modules/layout";
import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryResult } from "react-apollo";

import LoadingMask from "../LoadingMask/LoadingMask";
import categoriesQuery from "./categoriesQuery.gql";

const styles = require("./styles.css");

interface IDataCategory extends QueryResult {
  categories?: CategoriesQuery.Categories[];
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
    const startCats: CategoriesQuery.Categories[] = [];
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
        {startCats.map((parent, i) => (
          <div key={i}>
            <div className={styles.header}>{parent.name}</div>
            <SubCatalog key={i} categories={childrenMap[parent.id]} />
          </div>
        ))}
      </div>
    );
  }
}

export default graphql(categoriesQuery)(Catalog);
