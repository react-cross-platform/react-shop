import { AllProductsQuery } from "@src/generated/graphql";
import { MyIcon } from "@src/modules/common";
import { Accordion, Flex, List, Switch } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
import * as React from "react";

import { PATH_NAMES } from "../../../routes/RouteSwitch/RouteSwitch";
import { getPathName } from "@src/routes/CategoryPage/CategoryPage";

const styles = require("./styles.css");

const getSelected = (fitlers: AllProductsQuery.Filters[]) => {};

interface OwnProps {
  setLoading: (loading: boolean, callback?: any) => void;
  filter: AllProductsQuery.Filters;

  refetch: any;
  categoryId: number;
  history: any;
  found: number;
}

export interface GraphQLProps {}

interface State {
  checkedValueIds: number[];
}

interface Props extends OwnProps, GraphQLProps {}

class Filter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checkedValueIds: this.props.filter.values.filter(v => v.isChecked).map(v => v.id)
    };
  }

  render() {
    const { filter, found } = this.props;
    const { checkedValueIds } = this.state;
    const key = String(filter.id);
    /* Colors */
    if (filter.isColor) {
      return (
        <Accordion.Panel
          headerClass={styles.colors}
          key={key}
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
              {filter
                .values!.filter(value => this._isChecked(value) || value.count !== found)
                .map((value, i) => (
                  <div
                    key={i}
                    className={styles.colorItem}
                    onClick={() => this._handleClick(value)}
                  >
                    <div className={styles.colorCount}>
                      {this._isChecked(value) && "+"}
                      {value.count}
                    </div>
                    <MyIcon
                      className={styles.color}
                      type={require("svg-sprite-loader!./circle.svg")}
                      style={{
                        fill: value.value
                      }}
                    />
                    {this._isChecked(value) && (
                      <MyIcon
                        className={styles.color}
                        type={require("svg-sprite-loader!./checked-circle.svg")}
                        style={{
                          fill: "#17a017",
                          width: "1.1rem",
                          height: "1.1rem",
                          position: "absolute",
                          top: -4,
                          right: -4
                        }}
                      />
                    )}
                  </div>
                ))}
            </Flex>
          }
        />
      );
    }

    /* Bolean */
    if (filter.type === "B") {
      return (
        <Accordion.Panel
          showArrow={false}
          key={key}
          header={
            <Flex
              justify="between"
              style={{ paddingLeft: 0, marginRight: "-20px" }}
              onClick={() => this._handleClick(filter.values[0])}
            >
              <div>
                {filter.name}
                <div className={styles.count}>{filter.values[0].count}</div>
              </div>
              <Switch
                color="blue"
                checked={this._isChecked(filter.values[0])}
                onChange={() => {
                  this._handleClick(filter.values[0]);
                }}
              />
            </Flex>
          }
        />
      );

      /* Multi Select */
    } else if (filter.type !== "B") {
      return (
        <Accordion.Panel key={key} accordion={true} showArrow={true} header={filter.name}>
          <List>
            {filter
              .values!.filter(value => value.count !== found || this._isChecked(value))
              .map((value, ii) => (
                <List.Item
                  onClick={() => this._handleClick(value)}
                  key={ii}
                  className={styles.value}
                  wrap={true}
                  thumb={
                    this._isChecked(value) ? (
                      <MyIcon
                        className={styles.checkIcon}
                        type={require("svg-sprite-loader!./checked-circle.svg")}
                        style={{
                          fill: "blue"
                        }}
                      />
                    ) : (
                      <MyIcon
                        className={styles.checkIcon}
                        type={require("svg-sprite-loader!./empty-circle.svg")}
                        style={{
                          fill: "gray"
                        }}
                      />
                    )
                  }
                >
                  {value.name}
                  <div className={styles.count}>
                    {!this._isChecked(value) && "+"}
                    {value.count}
                  </div>
                </List.Item>
              ))}
          </List>
        </Accordion.Panel>
      );
    } else {
      return <div />;
    }
  }

  private _handleClick = (value: AllProductsQuery.Values) => {
    const { setLoading, categoryId, refetch, history } = this.props;
    const GET = queryString.parse(history.location.search);

    let checkedValueIds = [...this.state.checkedValueIds];
    if (this.state.checkedValueIds.indexOf(value.id) === -1) {
      checkedValueIds.push(value.id);
    } else {
      checkedValueIds = checkedValueIds.filter(id => id !== value.id);
    }
    this.setState({ checkedValueIds }, () => {
      setLoading(true, () => {
        refetch({
          categoryId,
          filters: value ? value.url : "",
          offset: 0
        }).then(res => {
          setLoading(false);
          GET.filters = value.url;
          const pathname = getPathName(history, categoryId);
          history.push(`${pathname}?${queryString.stringify(GET)}`);
        });
      });
    });
  };

  private _isChecked = (value: AllProductsQuery.Values): boolean => {
    return this.state.checkedValueIds.indexOf(value.id) !== -1;
  };
}

export default Filter;
