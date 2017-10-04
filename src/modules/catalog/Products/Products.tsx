import { Icon } from 'antd-mobile';
import update from 'immutability-helper';
import { throttle } from 'lodash';
import * as React from 'react';
import {
  compose,
  gql,
  graphql,
  OperationOption,
  QueryProps
} from 'react-apollo';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import { connect } from 'react-redux';

import { IRouterReducer } from '../../../interfaces';
import { IRootReducer } from '../../../rootReducer';
import { Loading } from '../../layout/index';
import { Product, ProductsCounter } from '../index';
import { IAllProduct } from '../model';
import { ICatalogReducer } from '../reducer';

const styles = require('./styles.css');

const LIMIT = 10;

// miliseconds bettwen scroll event
const SCROLL_THROTTLE = 250;

// px from bottom to start fetch more products
const FETCH_MORE_THRESHOLD = 750;

interface IDataProducts extends QueryProps {
  allProducts?: IAllProduct;
}

interface GraphQLProps {
  data: IDataProducts;
}

interface StateProps {
  catalog: ICatalogReducer;
  router: IRouterReducer;
}

interface OwnProps {
  categoryId: string;
}

interface State {
  haveMoreProducts?: boolean;
  scrolledProducts?: number;
}

interface Props extends StateProps, GraphQLProps, OwnProps {}

class Products extends React.Component<Props, State> {
  ref;

  bottomHeight: number;

  handleScrollThrottle: (event) => void;

  state = {
    haveMoreProducts: true,
    scrolledProducts: 0
  };

  refineScrolledProducts = scrolledProducts => {
    const { data } = this.props;
    const { fetchMore, allProducts } = data;
    const { products, total } = allProducts!;

    if (scrolledProducts < LIMIT) {
      scrolledProducts = LIMIT > total ? total : LIMIT;
    } else if (scrolledProducts > total) {
      scrolledProducts = total;
    }
    return scrolledProducts;
  };

  handleScroll = event => {
    const { router, data } = this.props;
    if (router.location.pathname.search('category') !== -1) {
      const { fetchMore, allProducts } = data;
      const { products, total } = allProducts!;

      // Calculate scrolled products
      const scrollTop = event.srcElement.scrollTop;
      // const scrollTop = document.body.scrollTop;
      const { scrolledProducts, haveMoreProducts } = this.state;
      const scrolled = Math.round(
        scrollTop / this.bottomHeight * products.length
      );
      this.setState({ scrolledProducts: scrolled });

      if (scrollTop > this.bottomHeight && haveMoreProducts === true) {
        fetchMore({} as any);
      }
    }
  };

  componentDidMount() {
    this.handleScrollThrottle = throttle(
      event => this.handleScroll(event),
      SCROLL_THROTTLE
    );

    // tslint:disable-next-line:max-line-length
    // TODO: Bind to some element, but not window
    // https://stackoverflow.com/questions/36207398/not-getting-callback-after-adding-an-event-listener-for-scroll-event-in-react-js/36207913#36207913
    window.addEventListener('scroll', this.handleScrollThrottle, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollThrottle, true);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { loading, allProducts } = this.props.data;
    if (loading === false) {
      this.bottomHeight =
        this.ref.offsetTop +
        this.ref.clientHeight -
        window.innerHeight -
        FETCH_MORE_THRESHOLD;
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { loading, allProducts } = nextProps.data;
    if (loading === false) {
      const { products, total } = allProducts!;
      if (products.length >= total) {
        this.setState({
          haveMoreProducts: false
        });
      }
    }
  }

  render() {
    const { data, catalog: { showOnlyViewed, viewedProductIds } } = this.props;
    const { loading, allProducts, fetchMore } = data;

    if (loading === true) {
      return <Loading />;
    }
    const { products, total } = allProducts!;
    const filteredProducts =
      showOnlyViewed === true
        ? products.filter(p => viewedProductIds.indexOf(p.id) !== -1)
        : products;

    let padding: number;
    let gutter: number;
    if (window.innerWidth <= 320) {
      padding = 2;
      gutter = 7;
    } else if (window.innerWidth <= 375) {
      padding = 4;
      gutter = 8;
    } else {
      padding = 5;
      gutter = 10;
    }
    return (
      <div style={{ padding }} ref={element => (this.ref = element)}>
        <MasonryInfiniteScroller
          className={styles.masonryInfiniteScroller}
          sizes={[{ columns: 2, gutter }]}
          loadMore={() => ''}
        >
          {filteredProducts.map((product, i) => {
            return <Product key={i} {...product} />;
          })}
        </MasonryInfiniteScroller>

        <div
          className={styles.icon}
          style={{
            display: this.state.haveMoreProducts ? 'block' : 'none'
          }}
        >
          <Icon type='loading' size='lg' />
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

const ALL_PRODUCTS_QUERY = gql(require('./allProducts.gql'));

const options: OperationOption<OwnProps, GraphQLProps> = {
  options: ownProps => ({
    fetchPolicy: 'network-only',
    variables: {
      categoryId: ownProps.categoryId,
      first: LIMIT,
      offset: 0
    }
  }),
  props: (props: any) => {
    const { data } = props;
    const { loading, fetchMore } = data;
    let allProducts;
    if (!loading) {
      // This is temp hack to exclude products without subProducts
      // TODO: Should be solved in GraphQL server
      allProducts = update(data.allProducts, {
        products: {
          $set: data.allProducts.products.filter(
            p => p.subProducts.length !== 0
          )
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

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog,
  router: state.router
});

export default compose(
  graphql<GraphQLProps, OwnProps>(ALL_PRODUCTS_QUERY, options),
  connect<StateProps, {}, OwnProps>(mapStateToProps)
)(Products);
