import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { getPathName } from "@src/routes/CategoryPage/CategoryPage";
import { MyHistory } from "@src/routes/interfaces";
import { Flex, Popover } from "antd-mobile";
import * as queryString from "query-string";
import * as React from "react";

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
      mask: true,
      onSelect: (node, index) => {
        const sortValue = this.props.items[index].value;
        if (GET.sorting !== sortValue) {
          GET.sorting = sortValue;
          const pathName = getPathName(history, categoryId);
          history.push(`${pathName}?${queryString.stringify(GET)}`);
        }
        this._hideSorting();
      }
    };
    const selectedSort = items.filter(sort => sort.isSelected)[0];
    return (
      <MyTouchFeedback style={{ backgroundColor: "lightgray" }}>
        <Popover
          classNme={styles.Sorting}
          {...sortingProps}
          overlay={items.map((sort, i) => (
            <Popover.Item
              // onVisibleChange={this.toggleSorting}
              className={styles.sortingItem}
              style={{
                color: sort.isSelected ? "orange" : "black"
              }}
              key={i}
              icon={<MyIcon type={ICONS_MAP[sort.icon]} size="md" />}
            >
              {sort.name}
            </Popover.Item>
          ))}
        >
          <Flex className={styles.navSorting}>
            <MyIcon className={styles.sortIcon} type={ICONS_MAP[selectedSort.icon]} />
            <Flex direction="column" align="start">
              <div className={styles.navName}>Сортировка</div>
              <div className={styles.navValue}>{selectedSort.name}</div>
            </Flex>
          </Flex>
        </Popover>
      </MyTouchFeedback>
    );
  }

  private _hideSorting = () => {
    this.setState({ sortingEnabled: false });
  };
}

export default Sorting;
