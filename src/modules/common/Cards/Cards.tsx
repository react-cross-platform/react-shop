import { CategoriesQuery, CategoryQuery } from "@src/generated/graphql";
import { Dispatch } from "@src/interfaces";
import { ICatalogReducer } from "@src/modules/catalog/reducer";
import { MyTouchFeedback } from "@src/modules/common/utils";
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
  items: CategoriesQuery.Categories[];
}

class Cards extends React.Component<StateProps & OwnProps, {}> {
  isViewed(category: CategoryQuery.Category) {
    const {
      catalog: { viewedCategoryIds }
    } = this.props;
    return viewedCategoryIds.indexOf(parseInt(category.id, 0)) !== -1;
  }

  getPath(category: CategoryQuery.Category) {
    return compile(PATH_NAMES.category)({
      id: category.id
    });
  }

  isCurrentCategory = (category: CategoryQuery.Category) => {
    const {
      router: {
        location: { pathname }
      }
    } = this.props;
    return pathname === this.getPath(category);
  };

  render() {
    const { items } = this.props;
    const height = window.innerWidth / 2;
    return (
      <Flex wrap="wrap">
        {items.map((item, i) => (
          <Link
            key={`cat${i}`}
            to={{
              pathname: this.getPath(item)
            }}
            className={styles.categoryContainer}
            style={{
              borderColor: this.isViewed(item) ? "orange" : "lightgrey",
              width: items.length % 2 !== 0 && i + 1 === items.length ? "100%" : "50%"
            }}
          >
            <MyTouchFeedback>
              <Card
                className={styles.category}
                style={{
                  opacity: this.isCurrentCategory(item) ? 0.3 : 1,
                  justifyContent: "center"
                }}
              >
                <img className={styles.image} src={item.image!.src || ""} />
                <div className={styles.name}>{item.name}</div>
              </Card>
            </MyTouchFeedback>
          </Link>
        ))}
      </Flex>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog,
  router: state.router
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Cards);
