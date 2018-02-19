import * as React from "react";

import CategoryPage from "../CategoryPage/CategoryPage";

class SalePage extends React.Component<{}, {}> {
  render() {
    return <CategoryPage {...this.props} />;
  }
}

export default SalePage;
