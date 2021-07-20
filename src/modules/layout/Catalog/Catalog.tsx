import { SubCatalog } from "@src/modules/layout";
import { ICategory } from "@src/modules/product/model";
import gql from "graphql-tag";
import * as React from "react";
import { useQuery } from "@apollo/client";
import LoadingMask from "../LoadingMask/LoadingMask";

const styles = require("./styles.css");

interface IDataCategory {
  categories?: [ICategory];
}

interface GraphQLProps {
  data: IDataCategory;
}

const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      alias
      parent {
        id
      }
      image {
        src
      }
    }
  }
`;

interface Props {}

const Catalog: React.FC<Props> = (props) => {
  const { data, loading } = useQuery(GET_CATEGORIES);
  if (loading) {
    return <LoadingMask />;
  }
  const { categories } = data;
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
      {startCats.map((parent, i) => (
        <div key={i}>
          <div className={styles.header}>{parent.name}</div>
          <SubCatalog key={i} categories={childrenMap[parent.id]} />
        </div>
      ))}
    </div>
  );
};

export default Catalog;
