import { WhiteSpace, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { Dispatch, IRouterReducer } from "../../interfaces";
import { ACTION_RESET } from "../../modules/layout/constants";
import { Catalog, FlatPages } from "../../modules/layout/index";
import { getScrollableStyle } from "../../modules/layout/Modal/Modal";
import { IRootReducer } from "../../rootReducer";
import { PATH_NAMES } from "../../routing";
import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface StateProps {
  router: IRouterReducer;
}

class HomePage extends React.Component<StateProps, {}> {
  isCurrentPage = () => {
    const { router } = this.props;
    return router.location.pathname === PATH_NAMES.home;
  };

  render() {
    return (
      <div
        className={styles.homePage}
        style={getScrollableStyle(this.isCurrentPage())}
      >
        <Catalog />
        <WhiteSpace size="lg" />
        <FlatPages />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  router: state.router
});

export default connect<StateProps, {}, {}>(mapStateToProps)(HomePage);
