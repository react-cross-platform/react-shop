import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";

import { Loading } from "../../layout/index";
import { ILayout } from "../../layout/model";
import { Products } from "../index";

const CATEGORY_QUERY = require("./category.gql");

const styles = require("./styles.css");

interface IConnectedCategoryProps {
  dispatch: any;
  layout: ILayout;
  data: any;
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
  any
> {
  render() {
    const { id, dispatch, layout, data } = this.props;

    const { loading, category } = data;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <div style={{ margin: "120px 10px 20px 10px" }}>
        {category
          ? <h2 className={styles.category}>
              {category.name}
            </h2>
          : ""}
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
