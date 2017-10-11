import { Products } from "@src/modules/catalog";
import { Loading } from "@src/modules/common";
import { Layout } from "@src/modules/layout";
import { ICategory } from "@src/modules/product/model";
import gql from "graphql-tag";
import * as React from "react";
import { graphql, OperationOption, QueryProps } from "react-apollo";

import { IPage, IRouterReducer } from "../interfaces";

const styles = require("./styles.css");

interface IDataCategory extends QueryProps {
  category?: ICategory;
}

interface StateProps {
  router: IRouterReducer;
}

export interface GraphQLProps {
  data: IDataCategory;
}

interface OwnProps extends IPage {}

interface Props extends OwnProps, GraphQLProps {}

class CategoryPage extends React.Component<OwnProps & GraphQLProps, any> {
  state = { title: "" };

  componentWillReceiveProps(nextProps: Props) {
    const { loading, category } = nextProps.data;
    if (!loading) {
      this.setState({ title: category!.name });
    }
  }

  getLayoutOptions = () => {
    const { location, data: { category } } = this.props;
    return {
      header: {
        title: this.state.title
      }
    };
  };

  render() {
    const {
      match: { params: { id } },
      location,
      history,
      data: { loading }
    } = this.props;
    return (
      <Layout
        location={location}
        history={history}
        {...this.getLayoutOptions()}
      >
        {loading
          ? <Loading />
          : <div className={styles.CategoryPage}>
              <Products categoryId={id} />
            </div>}
      </Layout>
    );
  }
}

const CATEGORY_QUERY = gql(require("./category.gql"));
const options: OperationOption<OwnProps, GraphQLProps> = {
  options: props => ({
    fetchPolicy: "cache-first",
    variables: {
      id: props.match.params.id
    }
  })
};

export default graphql<GraphQLProps, any>(CATEGORY_QUERY, options)(
  CategoryPage
);
