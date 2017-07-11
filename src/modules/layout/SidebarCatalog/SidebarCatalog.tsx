import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";

import { ACTION_TOOTLE_CATALOG } from "../constants";
import { Catalog } from "../index";
import { ILayout } from "../model";
import { swipeEnabled } from "../utils";

interface IConnectedSideBarProps {
  layout: ILayout;
  dispatch: any;
}

const styles = require("./styles.css");

class SidebarCatalog extends React.Component<IConnectedSideBarProps, any> {
  onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION_TOOTLE_CATALOG });
  };

  render() {
    const { layout } = this.props;
    return (
      <Sidebar
        contentClassName={styles.content}
        open={layout.openCatalog}
        onSetOpen={this.onSetSidebarOpen as any}
        sidebar={<Catalog isDrawer={true} />}
        sidebarClassName={styles.sidebar}
        touch={swipeEnabled()}
        dragToggleDistance={30}
        touchHandleWidth={100}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose(
  connect<IConnectedSideBarProps, {}, any>(mapStateToProps)
)(SidebarCatalog);
