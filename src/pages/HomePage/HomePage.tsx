import { WhiteSpace, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { IRouterReducer } from "../../interfaces";
import { ACTION_RESET } from "../../modules/layout/constants";
import { Catalog, FlatPages } from "../../modules/layout/index";
import { PATH_NAMES } from "../../routing";
import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface IConnectedHomePageProps {
  dispatch: (action) => void;
  router: IRouterReducer;
}
interface IHomePageProps extends IPage {}

class HomePage extends React.Component<
  IConnectedHomePageProps & IHomePageProps,
  undefined
> {
  componentWillMount() {
    this.props.dispatch({ type: ACTION_RESET });
  }

  isCurrentPage = () => {
    const { router } = this.props;
    return router.location.pathname === PATH_NAMES.home;
  };

  render() {
    const overflowY = this.isCurrentPage() ? "scroll" : "hidden";
    return (
      <div className={styles.homePage} style={{ overflowY }}>
        <WingBlank size="sm">
          <Catalog isDrawer={false} />
        </WingBlank>
        <WhiteSpace size="lg" />
        <FlatPages />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router
});
export default connect<IConnectedHomePageProps, undefined, IHomePageProps>(
  mapStateToProps as any
)(HomePage);
