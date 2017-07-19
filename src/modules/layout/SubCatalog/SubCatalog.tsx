import { Card, Flex } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import { push } from "react-router-redux";
import { Dispatch } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { ACTION_ADD_VIEWED_CATEGORY } from "../../catalog/constants";
import { ICatalog } from "../../catalog/model";
import { ICategory } from "../../product/model";
import { ACTION_DISABLE_CATALOG } from "../constants";
import { ILayout } from "../model";

const styles = require("./styles.css");

interface IConnectedSubCatalogProps {
  catalog: ICatalog;
  layout: ILayout;
  dispatch: Dispatch<{}>;
  router: IRouterReducer;
}

interface ISubCatalogProps {
  categories: [ICategory];
  isDrawer: boolean;
}

function chunk(arr, len = 1) {
  const chunks: any = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

class SubCatalog extends React.Component<
  IConnectedSubCatalogProps & ISubCatalogProps,
  any
> {
  onClick = (event, cat) => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION_ADD_VIEWED_CATEGORY, categoryId: cat.id });
    Promise.resolve(
      dispatch({ type: ACTION_DISABLE_CATALOG })
    ).then(response => {
      if (!this.isCurrentCategory(cat.id)) {
        dispatch(push(`/category/${cat.id}`));
      }
    });
  };

  isViewed(id) {
    const { catalog, categories } = this.props;
    return catalog.viewedCategoryIds.indexOf(id) !== -1;
  }

  isCurrentCategory = id => {
    const { router: { location: { pathname } } } = this.props;
    return pathname.search(`/category/${id}`) !== -1;
  };

  render() {
    const { dispatch, categories, isDrawer } = this.props;
    const height = window.innerWidth / 2;
    return (
      <div>
        {chunk(categories, 2).map((cats, i) =>
          <Flex justify="center" key={i}>
            {cats.map((cat, index) =>
              <Flex.Item className={styles.flexItem} key={`cat${index}`}>
                <div
                  style={{
                    border: `1px solid ${this.isViewed(cat.id)
                      ? "orange"
                      : "lightgrey"}`
                  }}
                >
                  <Card>
                    <Ripples>
                      <div
                        className={styles.category}
                        style={{
                          opacity: this.isCurrentCategory(cat.id) ? 0.3 : 1
                        }}
                        onClick={e => this.onClick(e, cat)}
                      >
                        <img src={cat.image.src || ""} />
                        <div className={styles.name}>
                          {cat.name}
                        </div>
                      </div>
                    </Ripples>
                  </Card>
                </div>
              </Flex.Item>
            )}
          </Flex>
        )}
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog,
  layout: state.layout,
  router: state.router
});

export default compose(
  connect<IConnectedSubCatalogProps, {}, ISubCatalogProps>(mapStateToProps)
)(SubCatalog);
