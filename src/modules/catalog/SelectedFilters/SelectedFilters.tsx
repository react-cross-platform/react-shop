import { MyIcon } from "@src/modules/common";
import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as queryString from "query-string";
import * as React from "react";
import { Link } from "react-router-dom";

import { MyHistory } from "../../../routes/interfaces";
import { MyTouchFeedback } from "../../common/utils";
import { IFilter } from "../model";

const styles = require("./styles.css");

export const getSelectedFilters = (filters: IFilter[]) => {
  return filters.filter(filter => filter.hasChecked);
};

interface OwnProps {
  categoryId: number;
  filters: IFilter[];
  style?: any;
  history: MyHistory;
  openFilters: boolean;
}

interface State {}

interface Props extends OwnProps {}

class SelectedFilters extends React.Component<Props, State> {

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return true;
  }

  getUrl = (filter: IFilter) => {
    const { categoryId, history } = this.props;
    const GET = queryString.parse(history.location.search);
    GET.filters = filter.resetUrl;
    return `${compile(PATH_NAMES.category)({
      id: categoryId
    })}?${queryString.stringify(GET)}`;
  };

  render() {
    const { filters, categoryId, style, openFilters } = this.props;
    const checkedFilters = getSelectedFilters(filters).filter(
      filter => filter.hasChecked
    );
    return (
      <Flex
        style={style}
        className={styles.SelectedFilters}
        direction={openFilters ? "row" : "column"}
        wrap="wrap"
      >
        {checkedFilters.map((filter, i) =>
          <MyTouchFeedback key={i}>
            <Link to={this.getUrl(filter)} className={styles.item}>
              <MyIcon
                className={styles.closeIcon}
                type={require("!svg-sprite-loader!./circle-close.svg")}
              />
              <span className={styles.label}>
                {filter.name}
              </span>
            </Link>
          </MyTouchFeedback>
        )}
      </Flex>
    );
  }
}

export default SelectedFilters;
