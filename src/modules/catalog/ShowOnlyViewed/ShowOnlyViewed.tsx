import { Icon } from "@src/modules/common";
import { IRootReducer } from "@src/rootReducer";
import * as React from "react";
import { connect } from "react-redux";

import { ACTION_TOGGLE_SHOW_ONLY_VIEWED } from "../constants";
import { ICatalogReducer } from "../reducer";

const styles = require("./styles.css");

interface StateProps {
  catalog: ICatalogReducer;
}

interface DispatcProps {
  toggleViewed: () => void;
}

class ShowOnlyViewed extends React.Component<StateProps & DispatcProps, {}> {
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

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog
});

const mapDispatchToProps = (dispatch): DispatcProps => ({
  toggleViewed: () => {
    dispatch({ type: ACTION_TOGGLE_SHOW_ONLY_VIEWED });
  }
});

export default connect<StateProps, DispatcProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(ShowOnlyViewed);
