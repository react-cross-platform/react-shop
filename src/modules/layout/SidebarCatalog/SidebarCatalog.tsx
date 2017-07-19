import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Sidebar from "react-sidebar";
import { Dispatch } from "redux";

import { ACTION_TOOTLE_CATALOG } from "../constants";
import { Catalog } from "../index";
import { ILayout } from "../model";
import { swipeEnabled } from "../utils";

interface IConnectedSideBarProps {
  layout: ILayout;
  dispatch: Dispatch<{}>;
}

const styles = require("./styles.css");

export const toggleCatalog = (dispatch): any => {
  dispatch({ type: ACTION_TOOTLE_CATALOG });
};

class SidebarCatalog extends React.Component<IConnectedSideBarProps, any> {
  render() {
    const { layout, dispatch } = this.props;
    return (
      <Sidebar
        contentClassName={styles.content}
        dragToggleDistance={30}
        onSetOpen={() => toggleCatalog(dispatch)}
        open={layout.openCatalog}
        sidebar={<Catalog isDrawer={true} />}
        sidebarClassName={styles.sidebar}
        touch={swipeEnabled()}
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
