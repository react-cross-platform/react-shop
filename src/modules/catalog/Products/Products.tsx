import { Flex, Icon } from "antd-mobile";
import update from "immutability-helper";
import { throttle } from "lodash";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { connect } from "react-redux";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { Product, ProductsCounter } from "../index";
import { ALL_PRODUCTS_QUERY, IAllProduct, ICatalog } from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const LIMIT = 10;

// miliseconds bettwen scroll event
const SCROLL_THROTTLE = 500;

// px from bottom to start fetch more products
const FETCH_MORE_THRESHOLD = 1500;

interface IDataProducts extends IData {
  allProducts: IAllProduct;
}

interface IConnectedProductsProps {
  catalog: ICatalog;
  data: IDataProducts;
}

interface IProductsProps {
  categoryId: string;
}

const options = {
  options: props => ({
    fetchPolicy: "network-only",
    variables: {
      categoryId: props.categoryId,
      first: LIMIT,
      offset: 0
    }
  }),
  props({ data: { loading, allProducts, fetchMore } }) {
    if (!loading) {
      // This is temp hack to exclude products without subProducts
      // TODO: Should be solved in GraphQL server
      allProducts = update(allProducts, {
        products: {
          $set: allProducts.products.filter(p => p.subProducts.length !== 0)
        }
      });
    }
    return {
      data: {
        allProducts,
        loading,
        fetchMore() {
          return fetchMore({
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.allProducts) {
                return prev;
              }
              return update(prev, {
                allProducts: {
                  products: {
                    $push: fetchMoreResult.allProducts.products
                  }
                }
              });
            },
            variables: {
              offset: allProducts.products.length
            }
          });
        }
      }
    };
  }
};

class Products extends React.Component<
  IConnectedProductsProps & IProductsProps,
  any
> {
  ref;

  bottomHeight: number;

  state = {
    haveMoreProducts: true,
    scrolledProducts: 0
  };

  refineScrolledProducts = scrolledProducts => {
    const { data } = this.props;
    const { fetchMore, allProducts: { products, total } } = data;

    if (scrolledProducts < LIMIT) {
      scrolledProducts = LIMIT > total ? total : LIMIT;
    } else if (scrolledProducts > total) {
      scrolledProducts = total;
    }
    return scrolledProducts;
  };

  handleScroll = event => {
    const { data } = this.props;
    const { fetchMore, allProducts: { products, total } } = data;

    // Calculate scrolled products
    const { scrolledProducts, haveMoreProducts } = this.state;
    const scrolled = Math.round(
      event.srcElement.scrollTop / this.bottomHeight * products.length
    );
    this.setState({ scrolledProducts: scrolled });

    if (
      event.srcElement.scrollTop > this.bottomHeight &&
      haveMoreProducts === true
    ) {
      fetchMore();
    }
  };

  componentDidMount() {
    const { loading, allProducts } = this.props.data;
    window.addEventListener(
      "scroll",
      throttle(this.handleScroll, SCROLL_THROTTLE),
      true
    );
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { loading, allProducts } = this.props.data;
    if (loading === false) {
      this.bottomHeight =
        this.ref.offsetTop +
        this.ref.clientHeight -
        window.innerHeight -
        FETCH_MORE_THRESHOLD;
    }
  };

  componentWillReceiveProps = nextProps => {
    const { loading, allProducts } = nextProps.data;
    if (loading === false) {
      const { products, total } = allProducts;
      if (products.length >= total) {
        this.setState({
          haveMoreProducts: false
        });
      }
    }
  };

  render() {
    const { data, catalog: { showOnlyViewed, viewedProductIds } } = this.props;
    const { loading, allProducts, fetchMore } = data;

    if (loading === true) {
      return <Loading />;
    }
    const { products, total } = allProducts;
    const filteredProducts =
      showOnlyViewed === true
        ? products.filter(p => viewedProductIds.indexOf(p.id) !== -1)
        : products;

    let padding: number;
    let gutter: number;
    if (window.innerWidth <= 640) {
      padding = 4;
      gutter = 15;
    } else if (window.innerWidth <= 750) {
      padding = 8;
      gutter = 17;
    } else {
      padding = 10;
      gutter = 20;
    }

    return (
      <div style={{ padding }} ref={element => (this.ref = element)}>
        <MasonryInfiniteScroller
          className={styles.masonryInfiniteScroller}
          sizes={[{ columns: 2, gutter }]}
        >
          {filteredProducts.map((product, i) => {
            return <Product key={i} {...product} />;
          })}
        </MasonryInfiniteScroller>

        <div
          className={styles.icon}
          style={{
            display: this.state.haveMoreProducts ? "block" : "none"
          }}
        >
          <Icon type="loading" size="lg" />
        </div>

        <ProductsCounter
          scrolled={this.refineScrolledProducts(this.state.scrolledProducts)}
          total={total}
        />

        {/*<ShowOnlyViewed/>*/}
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog
});

export default compose(
  connect<IConnectedProductsProps, {}, IProductsProps>(mapStateToProps),
  graphql(ALL_PRODUCTS_QUERY, options as any)
)(Products);
