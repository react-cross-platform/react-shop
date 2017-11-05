import { Dispatch } from "@src/interfaces";
import { ICatalogReducer } from "@src/modules/catalog/reducer";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { ICategory } from "@src/modules/product/model";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { IRouterReducer } from "@src/routes/interfaces";
import { Card, Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    return viewedCategoryIds.indexOf(parseInt(category.id, 0)) !== -1;
  }

  getPath(category: ICategory) {
    return compile(PATH_NAMES.category)({
      id: category.id,
    });
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
            to={{
              pathname: this.getPath(category),
            }}
            className={styles.categoryContainer}
            style={{
              borderColor: this.isViewed(category) ? "orange" : "lightgrey",
              width:
                categories.length % 2 !== 0 && i + 1 === categories.length
                  ? "100%"
                  : "50%"
            }}
          >
            <MyTouchFeedback>
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
            </MyTouchFeedback>
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
