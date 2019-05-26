import { AllProductsQuery, BrandQuery, CategoryQuery } from "@src/generated/graphql";
import { Dispatch } from "@src/interfaces";
import { Filters, Nav, Product, SelectedFilters } from "@src/modules/catalog";
import { ACTION_SET_SCROLLED_PRODUCTS } from "@src/modules/catalog/constants";
import { getSelectedFilters } from "@src/modules/catalog/SelectedFilters/SelectedFilters";
import { Aux } from "@src/modules/common/utils";
import { Layout, LoadingMask } from "@src/modules/layout";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { IPage } from "@src/routes/interfaces";
import update from "immutability-helper";
import { throttle } from "lodash";
import Lottie from "lottie-react-web";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
import * as React from "react";
import { graphql, OperationOption, QueryResult } from "react-apollo";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";
import { compose } from "redux";

import allProductsQuery from "./allProductsQuery.gql";
import brandQuery from "./brandQuery.gql";
import categoryQuery from "./categoryQuery.gql";

const styles = require("./styles.css");

const SALE_TITLE = "Скидки";

export const LIMIT = 20;

// miliseconds bettwen scroll event
// const SCROLL_THROTTLE = 250;
const SCROLL_THROTTLE = 500;

// px from bottom to start fetch more products
// const FETCH_MORE_THRESHOLD = window.innerHeight * 2;
const FETCH_MORE_THRESHOLD = window.innerHeight * 3;

interface DataCategory extends QueryResult, CategoryQuery.Query {}
interface DataBrand extends QueryResult, BrandQuery.Query {}

export interface DataAllProduct extends QueryResult, AllProductsQuery.Query {}

interface StateProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

export interface GraphQLProps {
  dataCategory: DataCategory;
  dataBrand: DataBrand;
  dataAllProducts: DataAllProduct;
}

interface OwnProps extends IPage {}

interface Props extends OwnProps, StateProps, DispatchProps, GraphQLProps {}

interface State {
  title: string;
  openFilters: boolean;
}

const getPageType = (props: Props): "category" | "brand" | "discount" => {
  const { match } = props;
  if (!match.params.id) {
    return "discount";
  } else if (match.path.indexOf("/category") !== -1) {
    return "category";
  } else {
    return "brand";
  }
};

const hasMore = (allProducts: AllProductsQuery.AllProducts): boolean => {
  if (!allProducts) {
    return false;
  }
  return allProducts!.products!.length % LIMIT === 0 && allProducts.products.length >= LIMIT;
};

export const getPathName = (id?) => {
  return id ? compile(PATH_NAMES.category)({ id }) : PATH_NAMES.sale;
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

    this.handleScrollThrottle = throttle(event => this.handleScroll(event), SCROLL_THROTTLE);
    this.addScrollListener();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dataCategory, dataBrand, dataAllProducts } = nextProps;

    if (
      this.props.match.params.id !== nextProps.match.params.id ||
      this.props.location.search !== nextProps.location.search
    ) {
      document.getElementById("js-content")!.scrollIntoView();
    }

    if (this.props.history.location.pathname !== nextProps.history.location.pathname) {
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
          this.getSubProductsLength(this.props.dataAllProducts.allProducts.products)
      ) {
        const { allProducts } = this.props.dataAllProducts;
        this.props.dispatch({
          type: ACTION_SET_SCROLLED_PRODUCTS,
          value: loadedSubProducts
        });
      }
    }

    if (dataCategory.category || dataBrand.brand) {
      const title = this._getTitle(nextProps);
      if (title !== this.state.title) {
        this.setState({ title });
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const {
      dataCategory,
      dataBrand,
      dataAllProducts,
      match: {
        params: { id }
      }
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
      (dataBrand && dataBrand.loading) ||
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
        this.ref.offsetTop + this.ref.clientHeight - window.innerHeight - FETCH_MORE_THRESHOLD;
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  render() {
    const {
      match: {
        params: { id }
      },
      location,
      history,
      dataCategory,
      dataBrand,
      dataAllProducts
    } = this.props;

    const gutter = 3;

    return (
      <Layout location={location} history={history} {...this._getLayoutOptions()}>
        {(dataCategory && dataCategory.loading) ||
        dataAllProducts.loading ||
        !dataAllProducts.allProducts ? (
          this._renderLoading()
        ) : (
          <Aux>
            <div className={styles.CategoryPage}>
              <Sidebar
                rootClassName={`${styles.root} ${this.state.openFilters && styles.rootOpened}`}
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
                          getSelectedFilters(dataAllProducts.allProducts.filters).length > 0
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
                      {dataAllProducts.allProducts.products.map((product, i) => {
                        return (
                          <Product
                            attributeValueIds={this.getCheckedAttributeValueIds()}
                            key={i}
                            {...product as any} // FIXME: any wasn't
                          />
                        );
                      })}
                    </MasonryInfiniteScroller>
                  </div>

                  {dataAllProducts.allProducts && hasMore(dataAllProducts.allProducts) && (
                    <LoadingMask centered={false} />
                  )}
                </div>
              </Sidebar>
            </div>
          </Aux>
        )}
      </Layout>
    );
  }

  getCheckedAttributeValueIds = () => {
    const { dataAllProducts } = this.props;
    let attributeValueIds: number[] = [];
    dataAllProducts.allProducts!.filters.forEach(filter => {
      if (filter.isColor) {
        attributeValueIds = filter.values.filter(value => value.isChecked).map(value => value.id);
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

  addScrollListener = () => {
    window.addEventListener("scroll", this.handleScrollThrottle, true);
  };

  removeScrollListener = () => {
    window.removeEventListener("scroll", this.handleScrollThrottle, true);
  };

  toggleFilters = () => {
    document.body.style.overflow = this.state.openFilters ? "scroll" : "hidden";
    this.setState({ openFilters: !this.state.openFilters }, () => {
      this.state.openFilters ? this.removeScrollListener() : this.addScrollListener();
    });
  };

  getScrolledProducts = scrollTop => {
    const { dataAllProducts } = this.props;
    return Math.round(
      (scrollTop / this.bottomHeight) * dataAllProducts.allProducts!.products.length
    );
  };

  getSubProductsLength = (products: AllProductsQuery.Products[]) => {
    let count = 0;
    products.forEach(product => {
      count += product.subProducts.length;
    });
    return count;
  };

  handleScroll = event => {
    const {
      location,
      match: {
        params: { id }
      },
      dataAllProducts: { allProducts, loading, fetchMore }
    } = this.props;
    const pathname = getPathName(id);
    if (!loading && location.pathname === pathname) {
      const { products } = allProducts!;

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

  private _renderLoading = () => {
    if (this.props.location.pathname === "/sale") {
      return (
        <div style={{ marginTop: window.innerHeight / 2 - 150 }}>
          <Lottie
            options={{
              animationData: require("./sale.json")
            }}
          />
        </div>
      );
    }
    return <LoadingMask />;
  };

  private _getLayoutOptions = () => {
    return {
      header: {
        title: this.state.title
      }
    };
  };

  private _getTitle = (props: Props) => {
    const { dataCategory, dataBrand } = props;
    const pageType = getPageType(props);
    if (pageType === "brand") {
      return dataBrand.brand ? dataBrand.brand!.name : "";
    } else if (pageType === "category") {
      return dataCategory.category ? dataCategory.category!.name : "";
    } else {
      return "Скидки";
    }
  };
}

const categoryOptions: OperationOption<OwnProps, GraphQLProps> = {
  options: (props: Props) => {
    const skip = !props.match.params.id || getPageType(props) !== "category";
    return {
      skip,
      fetchPolicy: "cache-first",
      variables: {
        id: parseInt(props.match.params.id, 0)
      }
    };
  },
  name: "dataCategory"
};

const brandOptions: OperationOption<OwnProps, GraphQLProps> = {
  options: (props: Props) => {
    const skip = !props.match.params.id || getPageType(props) !== "brand";
    return {
      skip,
      fetchPolicy: "cache-first",
      variables: {
        id: parseInt(props.match.params.id, 0)
      }
    };
  },
  name: "dataBrand"
};

export const allProductsOptions = {
  options: props => {
    const GET = queryString.parse(props.location.search);
    const objId = props.match.params.id;
    const variables = {
      filters: GET.filters,
      sorting: GET.sorting,
      categoryId: null,
      brandId: null,
      first: LIMIT,
      offset: 0
    } as any;
    if (!!objId) {
      if (props.location.pathname.indexOf("/category/") !== -1) {
        variables.categoryId = objId;
      } else {
        variables.brandId = objId;
      }
      variables.withDiscountOnly = false;
    } else {
      variables.withDiscountOnly = true; // sale page
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
  connect(mapStateToProps),
  graphql(categoryQuery, categoryOptions as any),
  graphql(brandQuery, brandOptions as any),
  graphql(allProductsQuery, allProductsOptions as any)
  // connect<StateProps, DispatchProps, OwnProps>(mapStateToProps),
  // graphql<GraphQLProps>(CATEGORY_QUERY, categoryOptions),
  // graphql<GraphQLProps, OwnProps>(allProductsQuery, allProductsOptions)
)(CategoryPage as any) as any;
