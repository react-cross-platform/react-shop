import * as React from "react";
import { Category } from "../../modules/catalog/index";

const CategoryPage = props => {
  return <Category id={props.match.params.id} />;
};

export default CategoryPage;
