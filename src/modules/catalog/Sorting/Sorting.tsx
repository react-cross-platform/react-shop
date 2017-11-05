import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { Flex, Popover } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
import * as React from "react";

import { MyHistory } from "../../../routes/interfaces";
import { PATH_NAMES } from "../../../routes/RouteSwitch/RouteSwitch";

const styles = require("./styles.css");

const ICONS_MAP = {
  "sort-asc": require("!svg-sprite-loader!./sort-asc.svg"),
  "sort-desc": require("!svg-sprite-loader!./sort-desc.svg")
};

interface OwnProps {
  history: MyHistory;
  categoryId: number;
  items: any;
}

interface State {
  sortingEnabled: boolean;
}

interface Props extends OwnProps {}

class Sorting extends React.Component<Props, State> {
  state = {
    sortingEnabled: false
  };

  render() {
    const { categoryId, history, items } = this.props;
    const GET = queryString.parse(history.location.search);
    const sortingProps: any = {
      placement: "bottomLeft",
      visible: this.state.sortingEnabled,
      onVisibleChange: this.toggleSorting,
      mask: true,
      onSelect: (node, index) => {
        if (GET.sorting !== node.props.value) {
          GET.sorting = node.props.value;
          history.push(
            `${compile(PATH_NAMES.category)({
              id: categoryId
            })}?${queryString.stringify(GET)}`
          );
        }
        this.toggleSorting();
      }
    };
    const selectedSort = items.filter(sort => sort.isSelected)[0];
    return (
      <MyTouchFeedback style={{ backgroundColor: "lightgray" }}>
        <Popover
          classNme={styles.Sorting}
          {...sortingProps}
          overlay={items.map(sort =>
            <Popover.Item
              onVisibleChange={this.toggleSorting}
              className={styles.sortingItem}
              style={{
                color: sort.isSelected ? "orange" : "black"
              }}
              value={sort.value}
              icon={<MyIcon type={ICONS_MAP[sort.icon]} size="md" />}
            >
              {sort.name}
            </Popover.Item>
          )}
        >
          <Flex className={styles.navSorting}>
            <MyIcon
              className={styles.sortIcon}
              type={ICONS_MAP[selectedSort.icon]}
            />
            <Flex direction="column" align="start">
              <div className={styles.navName}>Сортировка</div>
              <div className={styles.navValue}>
                {selectedSort.name}
              </div>
            </Flex>
          </Flex>
        </Popover>
      </MyTouchFeedback>
    );
  }
  toggleSorting = () => {
    this.setState({ sortingEnabled: !this.state.sortingEnabled });
  };
}

export default Sorting;
