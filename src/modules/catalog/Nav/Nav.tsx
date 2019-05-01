import { Sorting } from "@src/modules/catalog";
import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { IRootReducer } from "@src/rootReducer";
import { Flex, Progress } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { DataAllProduct } from "../../../routes/CategoryPage/CategoryPage";
import { MyHistory } from "../../../routes/interfaces";

const styles = require("./styles.css");

interface OwnProps {
  categoryId: number;
  toggleFilters: () => void;
  dataAllProducts: DataAllProduct;
  history: MyHistory;
}

interface StateProps {
  scrolledProducts: number;
}

interface Props extends OwnProps, StateProps {}

interface State {}

class Nav extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return true;
  }

  render() {
    const { history, dataAllProducts, categoryId, scrolledProducts } = this.props;
    const { found, sorting, total } = dataAllProducts.allProducts!;
    return (
      <Flex className={styles.Nav} direction="column">
        <Flex className={styles.nav} justify="between" align="center">
          <Sorting items={sorting} history={history} categoryId={categoryId} />
          <MyTouchFeedback style={{ backgroundColor: "lightgray" }}>
            <Flex onClick={this.props.toggleFilters} className={styles.navFilter}>
              <MyIcon
                className={styles.filterIcon}
                type={require("!svg-sprite-loader!./filter.svg")}
              />
              <Flex direction="column" align="start">
                <div className={styles.navName}>Фильтр</div>
                <div
                  // className={styles.ProductsCounter}
                  className={styles.navValue}
                >
                  найдено{" "}
                  <span
                    style={{
                      color: "orange"
                    }}
                  >
                    {found}
                  </span>
                  {found !== total && ` из ${total}`} товара
                </div>
              </Flex>
            </Flex>
          </MyTouchFeedback>
        </Flex>
        <Progress
          className={`${styles.progress} ${scrolledProducts >= found && styles.finished}`}
          percent={Math.round((scrolledProducts! / found) * 100)}
          position="normal"
          unfilled={false}
        />
      </Flex>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  scrolledProducts: state.catalog.scrolledProducts!
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Nav);
