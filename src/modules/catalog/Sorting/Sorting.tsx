import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { getPathName } from "@src/routes/CategoryPage/CategoryPage";
import { MyHistory } from "@src/routes/interfaces";
import { Flex, Popover } from "antd-mobile";
import * as queryString from "query-string";
import * as React from "react";
import {useState} from "react"

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

interface Props extends OwnProps {}

const Sorting: React.FC<Props> = (props) => {
 const[sortingEnabled, setSortingEnabled] = useState(false)
  
 const toggleSorting = () => {
   setSortingEnabled(!sortingEnabled );
 };
  
    const { categoryId, history, items } = props;
    const GET = queryString.parse(history.location.search);
    const sortingProps: any = {
      placement: "bottomLeft",
      visible: sortingEnabled,
      onVisibleChange: toggleSorting,
      mask: true,
      onSelect: (node, index) => {
        if (GET.sorting !== node.props.value) {
          GET.sorting = node.props.value;
          const pathName = getPathName(categoryId);
          history.push(`${pathName}?${queryString.stringify(GET)}`);
        }
        toggleSorting();
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
              onVisibleChange={toggleSorting}
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

export default Sorting;