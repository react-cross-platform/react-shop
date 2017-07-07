import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";

import { ACTION_TOOTLE_CATALOG } from "../constants";
import { Catalog, utils } from "../index";
import { ILayout } from "../model";

interface IConnectedSideBarProps {
  layout: ILayout;
  dispatch: any;
}

const CatalogMenu = props => {
  return (
    <div>
      <Catalog isDrawer={true} />
    </div>
  );
};

const sidebarStyles = {
  content: { overflowY: "scroll", WebkitOverflowScrolling: "touch" }
};

class SidebarCatalog extends React.Component<IConnectedSideBarProps, any> {
  onSetSidebarOpen = () => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION_TOOTLE_CATALOG });
  };

  render() {
    const { layout } = this.props;
    return (
      <Sidebar
        styles={sidebarStyles}
        touch={utils.swipeEnabled()}
        sidebar={<CatalogMenu />}
        open={layout.openCatalog}
        touchHandleWidth={50}
        dragToggleDistance={60}
        // onOpenChange={this.onSetSidebarOpen as any}
        onSetOpen={this.onSetSidebarOpen as any}
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
