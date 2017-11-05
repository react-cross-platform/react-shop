import { IRootReducer } from "@src/rootReducer";
import { MyLocation } from "@src/routes/interfaces";
import * as React from "react";
import { compose } from "react-apollo";
import MasonryInfiniteScroller from "react-masonry-infinite";
import { connect } from "react-redux";

import { LIMIT } from "../../../routes/CategoryPage/CategoryPage";
import { Product } from "../index";
import { IAllProducts } from "../model";
import { ICatalogReducer } from "../reducer";

const styles = require("./styles.css");

interface StateProps {
  showOnlyViewed: boolean;
  viewedProductIds: any;
}

interface OwnProps {
  categoryId: string;
  location: MyLocation;
  allProducts: IAllProducts;
  style: any;
  openFilters: boolean;
}

interface State {}

interface Props extends StateProps, OwnProps {}

class Products extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (this.props.openFilters !== nextProps.openFilters) {
      // Prevent re-render when sidebar is opened
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps: Props, prezvState: State) {
    const { products } = this.props.allProducts;
  }

  render() {
    const {
      allProducts: { products, filters, total },
      showOnlyViewed,
      viewedProductIds,
      style
    } = this.props;

    const gutter = 3;

    let colorValues: string[] = [];
    filters.forEach(filter => {
      if (filter.isColor) {
        colorValues = filter.values
          .filter(value => value.isChecked)
          .map(value => value.value);
      }
    });

    return (
      <div className={styles.Products} style={style}>
        <MasonryInfiniteScroller
          style={{ marginLeft: "0.2rem" }}
          pack={true}
          packed="data-packed"
          sizes={[{ columns: 2, gutter }]}
          loadMore={() => ""}
        >
          {products.map((product, i) => {
            return <Product colorValues={colorValues} key={i} {...product} />;
          })}
        </MasonryInfiniteScroller>
        {/*<ShowOnlyViewed/>*/}
      </div>
    );
  }
}

const mapStateToProps = ({
  catalog: { showOnlyViewed, viewedProductIds }
}: IRootReducer): StateProps => ({
  showOnlyViewed,
  viewedProductIds
});

export default compose(connect<StateProps, {}, OwnProps>(mapStateToProps))(
  Products
) as any;
