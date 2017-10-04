import { Card, Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";

import { Dispatch, IRouterReducer } from "../../../interfaces";
import { IRootReducer } from "../../../rootReducer";
import { PATH_NAMES } from "../../../routing";
import { ACTION_ADD_VIEWED_CATEGORY } from "../../catalog/constants";
import { ICatalogReducer } from "../../catalog/reducer";
import { ICategory } from "../../product/model";
import { ACTION_DISABLE_CATALOG } from "../constants";

const styles = require("./styles.css");

interface StateProps {
  catalog: ICatalogReducer;
  router: IRouterReducer;
  dispatch?: Dispatch;
}

interface OwnProps {
  categories: [ICategory];
}

class SubCatalog extends React.Component<StateProps & OwnProps, {}> {
  isViewed(category: ICategory) {
    const { catalog: { viewedCategoryIds } } = this.props;
    return viewedCategoryIds.indexOf(category.id) !== -1;
  }

  getPath(category: ICategory) {
    return compile(PATH_NAMES.category)({ id: category.id });
  }

  isCurrentCategory = (category: ICategory) => {
    const { router: { location: { pathname } } } = this.props;
    return pathname === this.getPath(category);
  };

  render() {
    const { categories } = this.props;
    const height = window.innerWidth / 2;
    return (
      <Flex wrap="wrap">
        {categories.map((category, i) =>
          <Link
            key={`cat${i}`}
            to={this.getPath(category)}
            className={styles.flexItem}
            style={{
              borderColor: this.isViewed(category) ? "orange" : "lightgrey",
              width:
                categories.length % 2 !== 0 && i + 1 === categories.length
                  ? "100%"
                  : "50%"
            }}
          >
            <Card
              className={styles.category}
              style={{
                opacity: this.isCurrentCategory(category) ? 0.3 : 1,
                justifyContent: "center"
              }}
            >
              <img className={styles.image} src={category.image.src || ""} />
              <div className={styles.name}>
                {category.name}
              </div>
            </Card>
          </Link>
        )}
      </Flex>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog,
  router: state.router
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(SubCatalog);
