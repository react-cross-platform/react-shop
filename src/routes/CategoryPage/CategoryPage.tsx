import { Category } from "@src/modules/catalog";
import * as React from "react";

import { IPage } from "../interfaces";

class CategoryPage extends React.Component<IPage, {}> {
  render() {
    const { match } = this.props;
    return <Category id={match.params.id} />;
  }
}

export default CategoryPage;
