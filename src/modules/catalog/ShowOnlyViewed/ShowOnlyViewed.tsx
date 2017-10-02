import { Icon } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";

import { IRootReducer } from "../../../rootReducer";
import { ACTION_TOGGLE_SHOW_ONLY_VIEWED } from "../constants";
import { ICatalogReducer } from "../reducer";

const styles = require("./styles.css");

interface ConnectedProps {
  catalog: ICatalogReducer;
}

interface DispatchedProps {
  toggleViewed: (e) => void;
}

class ShowOnlyViewed extends React.Component<
  ConnectedProps & DispatchedProps,
  {}
> {
  render() {
    const {
      toggleViewed,
      catalog: { showOnlyViewed, viewedProductIds }
    } = this.props;
    return (
      <div
        className={styles.showOnlyWiewed}
        style={{
          display: viewedProductIds.length === 0 ? "none" : "block"
        }}
        onClick={toggleViewed}
      >
        <Icon
          type={require("!svg-sprite-loader!./viewed.svg")}
          size="lg"
          style={{ fill: showOnlyViewed ? "orange" : "grey" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => ({
  catalog: state.catalog
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleViewed: e => {
      dispatch({ type: ACTION_TOGGLE_SHOW_ONLY_VIEWED });
    }
  };
};

export default connect<ConnectedProps, DispatchedProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(ShowOnlyViewed);
