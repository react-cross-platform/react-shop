import { Products } from "@src/modules/catalog";
import { Loading } from "@src/modules/common";
import { Layout } from "@src/modules/layout";
import { ICategory } from "@src/modules/product/model";
import gql from "graphql-tag";
import { compile } from "path-to-regexp";
import * as React from "react";
import { graphql, OperationOption, QueryProps } from "react-apollo";

import { IPage, IRouterReducer } from "../interfaces";
import { PATH_NAMES } from "../RouteSwitch/RouteSwitch";

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

interface State {
  title: string;
}

class CategoryPage extends React.Component<Props, State> {
  state = { title: "" };

  componentWillReceiveProps(nextProps: Props) {
    const { loading, category } = nextProps.data;
    if (!loading) {
      this.setState({ title: category!.name });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // FIXME: Temp hack https://github.com/FormidableLabs/nuka-carousel/issues/103
    const {
      data: { loading },
      history,
      match: { params: { id } },
      location
    } = nextProps;

    if (history.location.pathname !== location.pathname) {
      // Prevent rerender cause two active routes (main and modal in RouteSwitch)
      return false;
    }

    const pathname = compile(PATH_NAMES.category)({ id });
    if (!loading && history.location.pathname === location.pathname) {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    }
    return true;
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
  CategoryPage as any
) as any;
