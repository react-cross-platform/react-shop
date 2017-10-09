import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { graphql, OperationOption, QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { IRootReducer } from "../../../rootReducer";
import { PATH_NAMES } from "../../../routes";
import { Loading } from "../../layout/index";
import { getScrollableStyle } from "../../layout/utils";
import { ICategory } from "../../product/model";
import { Products } from "../index";

const CATEGORY_QUERY = gql(require("./category.gql"));

const styles = require("./styles.css");

interface IDataCategory extends QueryProps {
  category?: ICategory;
}

interface StateProps {
  router: IRouterReducer;
}

interface GraphQLProps {
  data: IDataCategory;
}

interface OwnProps {
  id: string;
}

class Category extends React.Component<
  StateProps & GraphQLProps & OwnProps,
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
        <div className={styles.name}>
          {category!.name}
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

const mapStateToProps = (state: IRootReducer): StateProps => ({
  router: state.router
});

export default compose(
  graphql<GraphQLProps, OwnProps>(CATEGORY_QUERY, options),
  connect<StateProps, {}, OwnProps>(mapStateToProps)
)(Category);
