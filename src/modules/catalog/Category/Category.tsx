import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { ILayout } from "../../layout/model";
import { ICategory } from "../../product/model";
import { Products } from "../index";

const CATEGORY_QUERY = require("./category.gql");

const styles = require("./styles.css");

interface IDataCategory extends IData {
  category: ICategory;
}

interface IConnectedCategoryProps {
  dispatch: Dispatch<{}>;
  layout: ILayout;
  data: IDataCategory;
}

interface ICategoryProps {
  id: string;
}

const options = {
  options: props => ({
    fetchPolicy: "cache-first",
    variables: {
      id: props.id
    }
  })
};

class Category extends React.Component<
  IConnectedCategoryProps & ICategoryProps,
  null
> {
  render() {
    const { id, dispatch, layout, data } = this.props;

    const { loading, category } = data;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div className={styles.category}>
        <div className={styles.categoryName}>{category.name}</div>
        <Products categoryId={id} />
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose(
  connect<IConnectedCategoryProps, {}, ICategoryProps>(mapStateToProps),
  graphql(gql(CATEGORY_QUERY), options)
)(Category);
