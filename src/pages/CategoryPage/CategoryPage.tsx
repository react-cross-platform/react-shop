import * as React from "react";

import { Category } from "../../modules/catalog/index";
import { IPage } from "../interfaces";

interface ICategoryPageProps extends IPage {}

class CategoryPage extends React.Component<ICategoryPageProps, undefined> {
  render() {
    const { match } = this.props;
    return <Category id={match.params.id} />;
  }
}

export default CategoryPage;
