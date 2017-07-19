import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IData } from "../../../model";
import { SubCatalog } from "../../layout/index";
import { ICategory } from "../../product/model";
import { ILayout } from "../model";

const CATEGORIES_QUERY = require("./categories.gql");
const styles = require("./styles.css");

interface ICatalogData extends IData {
  categories: [ICategory];
}

interface IConnectedCatalogProps {
  data: ICatalogData;
  dispatch: Dispatch<{}>;
  layout: ILayout;
  router: IRouterReducer;
}

interface ICatalogProps {
  isDrawer: boolean;
}

class Catalog extends React.Component<
  IConnectedCatalogProps & ICatalogProps,
  null
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
      ? { width: window.innerWidth * 0.9, padding: 10 }
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

const mapStateToProps: any = state => ({
  layout: state.layout,
  router: state.router
});

export default compose(
  connect<IConnectedCatalogProps, {}, ICatalogProps>(mapStateToProps),
  graphql(
    gql(CATEGORIES_QUERY),
    {
      options: ({ layout, router }) => ({
        skip: !(router.location.pathname === "/" || layout.openCatalog)
      })
    } as any
  )
)(Catalog as any);
