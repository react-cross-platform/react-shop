import { AllProductsQuery } from "@src/generated/graphql";
import { MyIcon } from "@src/modules/common";
import { getPathName } from "@src/routes/CategoryPage/CategoryPage";
import { Flex } from "antd-mobile";
import * as queryString from "query-string";
import * as React from "react";
import { Link } from "react-router-dom";

import { MyHistory } from "../../../routes/interfaces";
import { MyTouchFeedback } from "../../common/utils";

const styles = require("./styles.css");

export const getSelectedFilters = (filters: AllProductsQuery.Filters[]) => {
  return filters.filter(filter => filter.hasChecked);
};

interface OwnProps {
  categoryId: number;
  filters: AllProductsQuery.Filters[];
  style?: any;
  history: MyHistory;

  /** Is filters sidebar opened? */
  openFilters: boolean;
}

interface State {}

interface Props extends OwnProps {}

class SelectedFilters extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return true;
  }

  getUrl = (filter: AllProductsQuery.Filters) => {
    const { categoryId, history } = this.props;
    const GET = queryString.parse(history.location.search);
    GET.filters = filter.resetUrl;
    const pathName = getPathName(history, categoryId);
    return `${pathName}?${queryString.stringify(GET)}`;
  };

  render() {
    const { filters, categoryId, style, openFilters } = this.props;

    return (
      <Flex
        style={style}
        className={styles.SelectedFilters}
        direction={openFilters ? "row" : "column"}
        wrap="wrap"
      >
        {getSelectedFilters(filters).map(filter =>
          filter.values
            .filter(v => v.isChecked)
            .map((value, i) => (
              <MyTouchFeedback key={i}>
                <Link to={this.getUrl(filter)} className={styles.item}>
                  <MyIcon
                    className={styles.closeIcon}
                    type={require("!svg-sprite-loader!./circle-close.svg")}
                  />
                  <span className={styles.label}>
                    {filter.name}: {value.name}
                  </span>
                </Link>
              </MyTouchFeedback>
            ))
        )}
      </Flex>
    );
  }
}

export default SelectedFilters;
