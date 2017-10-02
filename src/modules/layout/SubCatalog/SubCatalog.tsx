import { Card, Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { Dispatch, IRouterReducer } from "../../../interfaces";
import { IRootReducer } from "../../../rootReducer";
import { PATH_NAMES } from "../../../routing";
import { ACTION_ADD_VIEWED_CATEGORY } from "../../catalog/constants";
import { ICatalogReducer } from "../../catalog/reducer";
import { ICategory } from "../../product/model";
import { ACTION_DISABLE_CATALOG } from "../constants";

const styles = require("./styles.css");

interface ConnectedProps {
  catalog: ICatalogReducer;
  router: IRouterReducer;
  dispatch: Dispatch;
}

interface OwnProps {
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

class SubCatalog extends React.Component<ConnectedProps & OwnProps, any> {
  onClick = (event, cat) => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION_ADD_VIEWED_CATEGORY, categoryId: cat.id });
    Promise.resolve(
      dispatch({ type: ACTION_DISABLE_CATALOG })
    ).then(response => {
      if (!this.isCurrentCategory(cat.id)) {
        const url = compile(PATH_NAMES.category)({ id: cat.id });
        dispatch(push(url));
      }
    });
  };

  isViewed(id) {
    const { catalog, categories } = this.props;
    return catalog.viewedCategoryIds.indexOf(id) !== -1;
  }

  isCurrentCategory = id => {
    const { router: { location: { pathname } } } = this.props;
    return pathname.search(`/category/${id}/`) !== -1;
  };

  render() {
    const { categories, isDrawer } = this.props;
    const height = window.innerWidth / 2;
    return (
      <div>
        {chunk(categories, 2).map((cats, i) =>
          <Flex justify="center" key={i}>
            {cats.map((cat, index) =>
              <Flex.Item
                className={styles.flexItem}
                key={`cat${index}`}
                style={{
                  borderColor: this.isViewed(cat.id) ? "orange" : "lightgrey"
                }}
                onClick={e => this.onClick(e, cat)}
              >
                <Card
                  className={styles.category}
                  style={{
                    opacity: this.isCurrentCategory(cat.id) ? 0.3 : 1,
                    justifyContent: "center"
                  }}
                >
                  <img className={styles.image} src={cat.image.src || ""} />
                  <div className={styles.name}>
                    {cat.name}
                  </div>
                </Card>
              </Flex.Item>
            )}
          </Flex>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => ({
  catalog: state.catalog,
  router: state.router
});

export default connect<ConnectedProps, {}, OwnProps>(mapStateToProps as any)(
  SubCatalog
);
