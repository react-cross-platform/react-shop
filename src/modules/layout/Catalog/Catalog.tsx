import gql from "graphql-tag";
import * as React from "react";
import { graphql, QueryProps } from "react-apollo";

import { SubCatalog } from "../../layout/index";
import { ICategory } from "../../product/model";

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
      return <div />;
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
      <div className={styles.catalog}>
        {startCats.map((parent, i) =>
          <div key={i}>
            <h2>
              {parent.name}
            </h2>
            <SubCatalog key={i} categories={childrenMap[parent.id]} />
          </div>
        )}
      </div>
    );
  }
}

const CATEGORIES_QUERY = gql(require("./categories.gql"));

export default graphql(CATEGORIES_QUERY)(Catalog);
