import gql from "graphql-tag";
import * as React from "react";
import { graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IRootReducer } from "../../../rootReducer";
import { PATH_NAMES } from "../../../routing";
import { SubCatalog } from "../../layout/index";
import { ICategory } from "../../product/model";

const styles = require("./styles.css");

interface IDataCategory extends QueryProps {
  categories: [ICategory];
}

interface ConnectedProps {
  router: IRouterReducer;
}

interface GraphQLProps {
  data: IDataCategory;
}

interface OwnProps {
  isDrawer: boolean;
}

class Catalog extends React.Component<
  ConnectedProps & GraphQLProps & OwnProps,
  {}
> {
  render() {
    const { isDrawer, data } = this.props;
    if (!data || data.loading) {
      return <div />;
    }
    const { loading, categories } = data;
    const startCats: ICategory[] = [];
    const childrenMap = {};
    for (const cat of categories) {
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
    const style = isDrawer
      ? { width: window.innerWidth * 0.9, padding: 5 }
      : {};
    return (
      <div className={styles.catalog} style={style}>
        {startCats.map((parent, i) =>
          <div key={i}>
            <h2>
              {parent.name}
            </h2>
            <SubCatalog
              key={i}
              categories={childrenMap[parent.id]}
              isDrawer={isDrawer}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => ({
  router: state.router
});

const CATEGORIES_QUERY = gql(require("./categories.gql"));
const options: OperationOption<OwnProps & ConnectedProps, GraphQLProps> = {
  options: ({ router }) => ({
    skip: !(router.location.pathname === PATH_NAMES.home)
  })
};

export default compose(
  connect<ConnectedProps, {}, OwnProps>(mapStateToProps),
  graphql<GraphQLProps, OwnProps>(CATEGORIES_QUERY, options)
)(Catalog as any) as any;
