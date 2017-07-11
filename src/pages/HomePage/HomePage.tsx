import { WhiteSpace } from "antd-mobile";
import WingBlank from "antd-mobile/lib/wing-blank/index.web";
import * as React from "react";
import { connect } from "react-redux";

import { ACTION_RESET } from "../../modules/layout/constants";
import { Catalog, FlatPages } from "../../modules/layout/index";

const styles = require("./styles.css");

class HomePage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    props.dispatch({ type: ACTION_RESET });
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

const mapStateToProps: any = state => ({});

export default connect<any, any, any>(mapStateToProps)(HomePage);
