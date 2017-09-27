import { WhiteSpace, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { ACTION_RESET } from "../../modules/layout/constants";
import { Catalog, FlatPages } from "../../modules/layout/index";
import { IPage } from "../interfaces";

const styles = require("./styles.css");

interface IConnectedHomePageProps {
  dispatch: (action) => void;
}
interface ICartPageProps extends IPage {}

class HomePage extends React.Component<
  IConnectedHomePageProps & ICartPageProps,
  undefined
> {
  componentWillMount() {
    this.props.dispatch({ type: ACTION_RESET });
  }

  render() {
    return (
      <div className={styles.homePage}>
        <WingBlank size="sm">
          <Catalog isDrawer={false} />
        </WingBlank>
        <WhiteSpace size="lg" />
        <FlatPages />
      </div>
    );
  }
}

const mapStateToProps = state => ({} as any);
export default connect<IConnectedHomePageProps, undefined, ICartPageProps>(
  mapStateToProps
)(HomePage);
