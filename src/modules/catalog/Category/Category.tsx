import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IRootReducer } from "../../../rootReducer";
import { PATH_NAMES } from "../../../routing";
import { Loading } from "../../layout/index";
import { getScrollableStyle } from "../../layout/Modal/Modal";
import { ICategory } from "../../product/model";
import { Products } from "../index";

const CATEGORY_QUERY = gql(require("./category.gql"));

const styles = require("./styles.css");

interface IDataCategory extends QueryProps {
  category: ICategory;
}

interface ConnectedProps {
  router: IRouterReducer;
}

interface GraphQLProps {
  data: IDataCategory;
}

interface OwnProps {
  id: string;
}

class Category extends React.Component<
  ConnectedProps & GraphQLProps & OwnProps,
  {}
> {
  isCurrentPage = () => {
    const { id, router } = this.props;
    return router.location.pathname === compile(PATH_NAMES.category)({ id });
  };

  render() {
    const { id, data } = this.props;
    const { loading, category } = data;

    if (loading === true) {
      return <Loading />;
    }

    return (
      <div
        className={styles.category}
        style={getScrollableStyle(this.isCurrentPage())}
      >
        <div className={styles.categoryName}>
          {category.name}
        </div>
        <Products categoryId={id} />
      </div>
    );
  }
}

const options: OperationOption<OwnProps, GraphQLProps> = {
  options: props => ({
    fetchPolicy: "cache-first",
    variables: {
      id: props.id
    }
  })
};

const mapStateToProps = (state: IRootReducer) => ({
  router: state.router
});

export default compose(
  graphql<GraphQLProps, OwnProps>(CATEGORY_QUERY, options),
  connect<ConnectedProps, {}, OwnProps>(mapStateToProps)
)(Category);
