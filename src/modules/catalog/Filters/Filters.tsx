import { Dispatch } from "@src/interfaces";
import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { LoadingMask } from "@src/modules/layout";
import { IRootReducer } from "@src/rootReducer";
import { IDataAllProduct } from "@src/routes/CategoryPage/CategoryPage";
import { getPathName } from "@src/routes/CategoryPage/CategoryPage";
import { Accordion, Flex, List, Progress, Switch } from "antd-mobile";
import * as queryString from "query-string";
import * as React from "react";
import { QueryProps } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import { IAllProducts, IFilter, IFilterValue } from "../model";

const styles = require("./styles.css");

const getSelected = (fitlers: IFilter[]) => {};

interface IDataFilteredProducts extends QueryProps {
  allProducts: IAllProducts;
}

interface OwnProps {
  categoryId: number;
  history: any;
  open: boolean;
  toggleFilters: () => void;
}

interface StateProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

export interface GraphQLProps {
  dataAllProducts: IDataAllProduct;
}

interface State {
  loading: boolean;
  checkedValueIds: number[];
}

interface Props extends OwnProps, StateProps, DispatchProps, GraphQLProps {}

class Filters extends React.Component<Props, State> {
  state = {
    loading: false,
    checkedValueIds: [] as number[]
  };

  componentWillReceiveProps(nextProps: Props) {
    const { dataAllProducts: { loading, allProducts } } = nextProps;
    const checkedValueIds = this.getCheckedValueIds(allProducts.filters);
    if (
      checkedValueIds !== this.state.checkedValueIds &&
      allProducts !== this.props.dataAllProducts.allProducts
    ) {
      this.setState({
        checkedValueIds,
        loading: false
      });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (
      !nextProps.dataAllProducts.allProducts ||
      nextProps.open !== this.props.open
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      categoryId,
      toggleFilters,
      dataAllProducts: { allProducts }
    } = this.props;
    const { filters, found, total } = allProducts;
    return (
      <Flex
        className={styles.Filters}
        direction="column"
        style={{ height: "100%", widht: "100%", overflowY: "hidden" }}
      >
        {this.state.loading && <LoadingMask />}

        <Flex className={styles.title}>
          <MyTouchFeedback style={{ background: "#19599e" }}>
            <MyIcon
              className={styles.closeIcon}
              type={require("!svg-sprite-loader!./back.svg")}
              onClick={toggleFilters}
            />
          </MyTouchFeedback>
          <div>
            Найдено {found}
            {!total || found === total ? "" : ` из ${total}`}
          </div>
        </Flex>
        <Progress
          className={`${styles.progress} ${found === total && styles.finished}`}
          percent={Math.round(found / total! * 100)}
          position="normal"
          // unfilled={false}
          unfilled={true}
        />
        <Accordion
          activeKey={filters.map(filter => String(filter.id))}
          className={styles.accordion}
        >
          {filters.map(filter => this.renderFilter(filter, found))}
        </Accordion>

        {this.state.checkedValueIds.length > 0 &&
          <Flex
            onClick={() => this.handleReset()}
            justify="center"
            align="center"
            className={styles.resetButton}
            style={{}}
          >
            <MyTouchFeedback
              style={{ borderRadius: "1.5rem", backgroundColor: "lightgray" }}
            >
              <MyIcon
                className={styles.resetIcon}
                type={require("svg-sprite-loader!./remove-circle.svg")}
                style={{
                  fill:
                    filters.filter(filter => filter.hasChecked).length > 0
                      ? "orange"
                      : "lightgray"
                }}
              />
            </MyTouchFeedback>
          </Flex>}
      </Flex>
    );
  }

  getCheckedValueIds = (filters: IFilter[]) => {
    const ids: number[] = [];
    filters.forEach(filter => {
      filter!.values.forEach(value => {
        if (value.isChecked) {
          ids.push(value.id);
        }
      });
    });
    return ids;
  };

  handleSelect = (value?: IFilterValue) => {
    const { categoryId, dataAllProducts: { refetch }, history } = this.props;
    let checkedValueIds;
    let url;
    if (value) {
      url = value.url;
      checkedValueIds = this.state.checkedValueIds;
      if (checkedValueIds.indexOf(value.id) === -1) {
        checkedValueIds.push(value.id);
      } else {
        checkedValueIds = checkedValueIds.filter(id => id !== value.id);
      }
    } else {
      url = "";
      checkedValueIds = [];
    }
    if (!this.state.loading) {
      this.setState(
        {
          loading: true,
          checkedValueIds
        },
        () => {
          const GET = queryString.parse(history.location.search);
          GET.filters = url;
          const pathName = getPathName(categoryId);
          history.push(`${pathName}?${queryString.stringify(GET)}`);
        }
      );
    }
  };

  handleReset = () => {
    this.handleSelect();
  };

  renderFilter = (filter: IFilter, found) => {
    const { categoryId } = this.props;
    const { dataAllProducts } = this.props;
    const { refetch } = dataAllProducts;
    const { checkedValueIds } = this.state;

    /* Colors */
    if (filter.isColor) {
      return (
        <Accordion.Panel
          headerClass={styles.colors}
          // style={{ marginRigth: -20 }}
          key={String(filter.id)}
          showArrow={false}
          header={
            <Flex
              wrap="wrap"
              align="center"
              style={{
                padding: 0,
                width: "100%",
                height: "100%",
                marginLeft: 10
              }}
            >
              {filter.values!
                .filter(color => color.isChecked || color.count !== found)
                .map((value, i) =>
                  <div
                    key={i}
                    className={styles.colorItem}
                    onClick={() => this.handleSelect(value)}
                  >
                    <div className={styles.colorCount}>
                      {filter.hasChecked && !value.isChecked && "+"}
                      {value.count}
                    </div>
                    <MyIcon
                      className={styles.color}
                      // type={require("svg-sprite-loader!./checked-circle.svg")}
                      type={require("svg-sprite-loader!./circle.svg")}
                      style={{
                        fill: value.value
                      }}
                    />
                    <MyIcon
                      className={styles.color}
                      type={require("svg-sprite-loader!./checked-circle.svg")}
                      style={{
                        opacity:
                          checkedValueIds.indexOf(value.id) !== -1 ? 1 : 0,
                        transition:
                          checkedValueIds.indexOf(value.id) !== -1
                            ? "0.8s"
                            : "0.1s",
                        fill: "orange",
                        width: "1.1rem",
                        height: "1.1rem",
                        position: "absolute",
                        top: -4,
                        right: -4
                      }}
                    />
                  </div>
                )}
            </Flex>
          }
        />
      );
    }

    /* Bolean */
    if (filter.type === "B") {
      const ICONS_MAP = {
        discount: require("!svg-sprite-loader!./discount.svg")
      };
      return (
        <Accordion.Panel
          key={String(filter.id)}
          showArrow={false}
          header={
            <Flex
              justify="between"
              style={{ paddingLeft: 0, marginRight: "-20px" }}
              onClick={() => this.handleSelect(filter.values[0])}
            >
              {filter.icon &&
                <MyIcon
                  type={ICONS_MAP[filter.icon]}
                  size="md"
                  style={{
                    fill: filter.iconColor
                  }}
                />}

              <div>
                {filter.name}
                <div className={styles.count}>
                  {filter.values[0].count}
                </div>
              </div>
              <Switch
                color="orange"
                checked={checkedValueIds.indexOf(filter.values[0].id) !== -1}
                onChange={() => {
                  this.handleSelect(filter.values[0]);
                }}
              />
            </Flex>
          }
        />
      );

      /* Multi Select */
    } else if (filter.type !== "B") {
      return (
        <Accordion.Panel
          key={String(filter.id)}
          accordion={true}
          // showArrow={true}
          showArrow={false}
          header={filter.name}
        >
          <List>
            {filter.values!
              .filter(value => value.count !== found || value.isChecked)
              .map((value, ii) =>
                <List.Item
                  disabled={!value.isChecked && value.count === found}
                  onClick={() => this.handleSelect(value)}
                  key={ii}
                  className={styles.value}
                  thumb={
                    checkedValueIds.indexOf(value.id) !== -1
                      ? <MyIcon
                          className={styles.checkIcon}
                          type={require("svg-sprite-loader!./checked-circle.svg")}
                          style={{
                            fill: "orange"
                          }}
                        />
                      : <MyIcon
                          className={styles.checkIcon}
                          type={require("svg-sprite-loader!./empty-circle.svg")}
                          style={{
                            fill: "gray"
                          }}
                        />
                  }
                >
                  {value.name}
                  <div className={styles.count}>
                    {filter.hasChecked && !value.isChecked && "+"}
                    {value.count}
                  </div>
                  {value.isChecked === true}
                </List.Item>
              )}
          </List>
        </Accordion.Panel>
      );
    }
  };
}

const mapStateToProps = (state: IRootReducer): StateProps => ({});

export default compose(
  connect<StateProps, DispatchProps, OwnProps>(mapStateToProps)
)(Filters);
