import { IRouterReducer } from "@src/interfaces";
import { Catalog, FlatPages } from "@src/modules/layout";
import { getScrollableStyle } from "@src/modules/layout/utils";
import { IRootReducer } from "@src/rootReducer";
import { WhiteSpace } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { PATH_NAMES } from "../index";

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
