import * as React from "react";

import { Button, Flex } from "antd-mobile";
import { Category, Products } from "../../modules/catalog/index";

const CategoryPage = props => {
  return <Category id={props.match.params.id} />;
};

export default CategoryPage;
