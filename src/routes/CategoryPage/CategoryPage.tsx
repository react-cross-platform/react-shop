import { Dispatch } from "@src/interfaces";
import { Filters, Nav, Product, SelectedFilters } from "@src/modules/catalog";
import { ACTION_SET_SCROLLED_PRODUCTS } from "@src/modules/catalog/constants";
import { IFilter, ISort } from "@src/modules/catalog/model";
import { getSelectedFilters } from "@src/modules/catalog/SelectedFilters/SelectedFilters";
import { MyIcon } from "@src/modules/common";
import { Aux } from "@src/modules/common/utils";
import { Layout, LoadingMask } from "@src/modules/layout";
import { ICategory, IProduct } from "@src/modules/product/model";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes/index";
import { IPage } from "@src/routes/interfaces";
import gql from "graphql-tag";
import update from "immutability-helper";
import { throttle } from "lodash";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
import * as React from "react";
import { graphql, OperationOption, QueryProps } from "react-apollo";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";
import { compose } from "redux";

import { IAllProducts } from "../../modules/catalog/model";

const styles = require("./styles.css");

const SALE_TITLE = "Скидки";

export const LIMIT = 20;

// miliseconds bettwen scroll event
// const SCROLL_THROTTLE = 250;
const SCROLL_THROTTLE = 500;

// px from bottom to start fetch more products
// const FETCH_MORE_THRESHOLD = window.innerHeight * 2;
const FETCH_MORE_THRESHOLD = window.innerHeight * 3;

interface IDataCategory extends QueryProps {
  category?: ICategory;
}

export interface IDataAllProduct extends QueryProps {
  allProducts: IAllProducts;
}

interface StateProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

export interface GraphQLProps {
  dataCategory: IDataCategory;
  dataAllProducts: IDataAllProduct;
}

interface OwnProps extends IPage {}

interface Props extends OwnProps, StateProps, DispatchProps, GraphQLProps {}

interface State {
  title: string;
  openFilters: boolean;
}

const hasMore = (allProducts: IAllProducts): boolean => {
  if (!allProducts) {
    return false;
  }
  return (
    allProducts.products.length % LIMIT === 0 &&
    allProducts.products.length >= LIMIT
  );
};

export const getPathName = (categoryId?) => {
  return categoryId
    ? compile(PATH_NAMES.category)({ id: categoryId })
    : PATH_NAMES.sale;
};

class CategoryPage extends React.Component<Props, State> {
  ref;

  bottomHeight: number;

  handleScrollThrottle: (event) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      title: !!props.match.params.id ? "" : SALE_TITLE,
      openFilters: false
    };
  }

  componentDidMount() {
    // tslint:disable-next-line:max-line-length
    // TODO: Bind to some element, but not window
    // https://stackoverflow.com/questions/36207398/not-getting-callback-after-adding-an-event-listener-for-scroll-event-in-react-js/36207913#36207913

    this.handleScrollThrottle = throttle(
      event => this.handleScroll(event),
      SCROLL_THROTTLE
    );
    this.addScrollListener();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dataCategory, dataAllProducts } = nextProps;

    if (
      this.props.match.params.id !== nextProps.match.params.id ||
      this.props.location.search !== nextProps.location.search
    ) {
      document.getElementById("js-content")!.scrollIntoView();
    }

    if (
      this.props.history.location.pathname !==
      nextProps.history.location.pathname
    ) {
      this.removeScrollListener();
    }

    if (nextProps.dataAllProducts.allProducts) {
      const loadedSubProducts = this.getSubProductsLength(
        nextProps.dataAllProducts.allProducts.products
      );
      // const loadedSubProducts = this.refineScrolledProducts(
      //   nextProps.dataAllProducts.allProducts.products.length
      // );
      if (
        !this.props.dataAllProducts.allProducts ||
        loadedSubProducts !==
          this.getSubProductsLength(
            this.props.dataAllProducts.allProducts.products
          )
      ) {
        const { allProducts } = this.props.dataAllProducts;
        this.props.dispatch({
          type: ACTION_SET_SCROLLED_PRODUCTS,
          value: loadedSubProducts
        });
      }
    }

    const title =
      dataCategory && !dataCategory.loading
        ? dataCategory.category!.name
        : "Скидки";
    if (title !== this.state.title) {
      this.setState({ title });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const {
      dataCategory,
      dataAllProducts,
      history,
      match: { params: { id } },
      location
    } = nextProps;

    if (this.props.location !== nextProps.history.location) {
      const nextUrl = nextProps.history.location.pathname;
      if (nextUrl === getPathName(id)) {
        this.addScrollListener();
      } else {
        this.removeScrollListener();
      }
      // Prevent main route re-render after modal route closed
      return false;
    }

    if (dataAllProducts.allProducts && !hasMore(dataAllProducts.allProducts)) {
      this.removeScrollListener();
    }

    if (
      (dataCategory && dataCategory.loading) ||
      dataAllProducts.loading ||
      !dataAllProducts.allProducts
    ) {
      return false;
    }

    // const pathname = compile(PATH_NAMES.category)({ id });
    // Fix nuka-carousel resize bag
    // https://github.com/FormidableLabs/nuka-carousel/issues/103
    // if (history.location.pathname === location.pathname) {
    //   setTimeout(() => {
    //     window.dispatchEvent(new Event("resize"));
    //   }, 0);
    // }

    // if (nextProps.dataAllProducts.loading || nextProps.dataCategory.loading) {
    //   return false;
    // }

    // if (history.location.pathname !== location.pathname) {
    //   // Prevent rerender cause two active routes (main and modal in RouteSwitch)
    //   return false;
    // }

    return true;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // if (!hasMore(this.props.dataAllProducts.allProducts as any)) {
    //   this.removeScrollListener();
    // }

    const { loading, allProducts } = this.props.dataAllProducts;
    if (!loading) {
      this.bottomHeight =
        this.ref.offsetTop +
        this.ref.clientHeight -
        window.innerHeight -
        FETCH_MORE_THRESHOLD;
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  render() {
    const {
      match: { params: { id } },
      location,
      history,
      dataCategory,
      dataAllProducts
    } = this.props;

    const gutter = 3;

    return (
      <Layout
        location={location}
        history={history}
        {...this.getLayoutOptions()}
      >
        {(dataCategory && dataCategory.loading) ||
        dataAllProducts.loading ||
        !dataAllProducts.allProducts
          ? <LoadingMask />
          : <Aux>
              <div className={styles.CategoryPage}>
                <Sidebar
                  rootClassName={`${styles.root} ${this.state.openFilters &&
                    styles.rootOpened}`}
                  sidebarClassName={styles.sidebar}
                  overlayClassName={styles.overlay}
                  contentClassName={styles.content}
                  pullRight={true}
                  touch={false}
                  shadow={true}
                  sidebar={
                    <Filters
                      dataAllProducts={dataAllProducts}
                      categoryId={id}
                      open={this.state.openFilters}
                      toggleFilters={this.toggleFilters}
                      history={history}
                    />
                  }
                  open={this.state.openFilters}
                  onSetOpen={this.toggleFilters}
                >
                  <div
                    id="js-content"
                    className={styles.sidebarContent}
                    ref={element => (this.ref = element)}
                  >
                    <Nav
                      history={history}
                      dataAllProducts={dataAllProducts}
                      categoryId={id}
                      toggleFilters={this.toggleFilters}
                    />
                    <SelectedFilters
                      openFilters={this.state.openFilters}
                      history={history}
                      categoryId={id}
                      filters={dataAllProducts.allProducts.filters}
                      style={{
                        flexDirection: this.state.openFilters ? "column" : "row"
                      }}
                    />
                    <div className={styles.Products}>
                      <MasonryInfiniteScroller
                        style={{
                          marginTop:
                            getSelectedFilters(
                              dataAllProducts.allProducts.filters
                            ).length > 0
                              ? "2.4rem"
                              : "0.2rem"
                        }}
                        pack={true}
                        packed="data-packed"
                        sizes={[{ columns: 2, gutter }]}
                        loadMore={() => ""}
                        ref={node => {
                          this.ref = node;
                        }}
                      >
                        {dataAllProducts.allProducts.products.map(
                          (product, i) => {
                            return (
                              <Product
                                attributeValueIds={this.getCheckedAttributeValueIds()}
                                key={i}
                                {...product}
                              />
                            );
                          }
                        )}
                      </MasonryInfiniteScroller>
                    </div>

                    {dataAllProducts.allProducts &&
                      hasMore(dataAllProducts.allProducts) &&
                      <MyIcon
                        type={require("!svg-sprite-loader!./loader.svg")}
                        size="lg"
                        className={styles.loading}
                      />}
                  </div>
                </Sidebar>
              </div>
            </Aux>}
      </Layout>
    );
  }

  getCheckedAttributeValueIds = () => {
    const { dataAllProducts: { allProducts: { filters } } } = this.props;
    let attributeValueIds: number[] = [];
    filters.forEach(filter => {
      if (filter.isColor) {
        attributeValueIds = filter.values
          .filter(value => value.isChecked)
          .map(value => value.id);
      }
    });
    return attributeValueIds;
  };

  refineScrolledProducts = scrolledProducts => {
    const { dataAllProducts } = this.props;
    const { fetchMore, allProducts } = dataAllProducts;
    const { products, found, total } = allProducts!;

    if (scrolledProducts < LIMIT) {
      scrolledProducts = LIMIT > found ? found : LIMIT;
    } else if (scrolledProducts > found) {
      scrolledProducts = found;
    }
    return scrolledProducts;
  };

  isLoading = () => {
    const { dataCategory, dataAllProducts } = this.props;
    return (dataCategory && dataCategory.loading) || dataAllProducts.loading;
  };

  getLayoutOptions = () => {
    return {
      header: {
        title: this.state.title
      }
    };
  };

  addScrollListener = () => {
    window.addEventListener("scroll", this.handleScrollThrottle, true);
  };

  removeScrollListener = () => {
    window.removeEventListener("scroll", this.handleScrollThrottle, true);
  };

  toggleFilters = () => {
    document.body.style.overflow = this.state.openFilters ? "scroll" : "hidden";
    this.setState({ openFilters: !this.state.openFilters }, () => {
      this.state.openFilters
        ? this.removeScrollListener()
        : this.addScrollListener();
    });
  };

  getScrolledProducts = scrollTop => {
    const { dataAllProducts } = this.props;
    return Math.round(
      scrollTop /
        this.bottomHeight *
        dataAllProducts.allProducts.products.length
    );
  };

  getSubProductsLength = (products: IProduct[]) => {
    let count = 0;
    products.forEach(product => {
      count += product.subProducts.length;
    });
    return count;
  };

  handleScroll = event => {
    const {
      location,
      match: { params: { id } },
      dataAllProducts: { allProducts, loading, fetchMore }
    } = this.props;
    console.log("handleScroll");
    const pathname = getPathName(id);
    if (!loading && location.pathname === pathname) {
      const { products } = allProducts;

      // Calculate scrolled products
      // const scrollTop = window.pageYOffset;
      const scrollTop = event.srcElement.scrollTop;

      // const scrolledProducts = this.getScrolledProducts(scrollTop);
      // this.props.dispatch({
      //   type: ACTION_SET_SCROLLED_PRODUCTS,
      //   value: scrolledProducts
      // });

      if (scrollTop > this.bottomHeight) {
        this.removeScrollListener();
        fetchMore({} as any).then(res => {
          // if (found !== total) {
          if (hasMore(res.data.allProducts)) {
            this.addScrollListener();
          }
        });
      }
    }
  };
}

const CATEGORY_QUERY = gql(require("./category.gql"));
const categoryOptions: OperationOption<OwnProps, GraphQLProps> = {
  options: props => ({
    skip: !props.match.params.id,
    fetchPolicy: "cache-first",
    variables: {
      id: parseInt(props.match.params.id, 0)
    }
  }),
  name: "dataCategory"
};

export const ALL_PRODUCTS_QUERY = gql(require("./allProducts.gql"));

export const allProductsOptions: OperationOption<OwnProps, GraphQLProps> = {
  options: ownProps => {
    const GET = queryString.parse(ownProps.location.search);
    const categoryId = ownProps.match.params.id;
    const variables = {
      filters: GET.filters,
      sorting: GET.sorting,
      first: LIMIT,
      offset: 0
    } as any;
    if (!!categoryId) {
      variables.categoryId = categoryId;
      variables.withDiscountOnly = false;
    } else {
      variables.withDiscountOnly = true; // sale page
      variables.categoryId = null;
    }
    return {
      fetchPolicy: "network-only", // it's important!
      variables
    };
  },
  props: (ownProps: any) => {
    const { data } = ownProps;
    const { allProducts, loading, fetchMore, refetch, variables } = data;
    return {
      dataAllProducts: {
        allProducts,
        loading,
        refetch,
        variables,
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
              offset: allProducts.products.length,
              total: allProducts.total
            }
          });
        }
      }
    };
  }
};

const mapStateToProps = (state: IRootReducer): StateProps => ({});

export default compose(
  connect<StateProps, DispatchProps, OwnProps>(mapStateToProps),
  graphql<GraphQLProps>(CATEGORY_QUERY, categoryOptions),
  graphql<GraphQLProps, OwnProps>(ALL_PRODUCTS_QUERY, allProductsOptions)
)(CategoryPage as any) as any;
