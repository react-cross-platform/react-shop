import {
  Button,
  Card,
  Carousel,
  Flex,
  Icon,
  List,
  NavBar,
  WhiteSpace,
  WingBlank
} from "antd-mobile";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import client from "../../../graphqlClient";
import { ACTION_TOOTLE_CATALOG } from "../../layout/constants";
import { HEIGHT } from "../../layout/Header/Header";
import { Loading, utils } from "../../layout/index";
import { ILayout } from "../../layout/model";
import { ICategory } from "../../product/model";
import { Product, Products } from "../index";

const CATEGORY_QUERY = require("./category.gql");

// tslint:disable-next-line:no-var-requires
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
    // const category = client.readFragment({
    //   fragment: gql`
    //     fragment categoryName on CategoryType {
    //       name
    //     }
    //   `,
    //   id: `CategoryType:${id}`,
    // }) as ICategory;
    return (
      <div style={{ margin: "20px 10px" }}>
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
