import { Icon } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { ACTION_TOGGLE_SHOW_ONLY_VIEWED } from "../constants";
import { ICatalog } from "../model";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

interface IConnectedShowOnlyViewedProps {
  dispatch: any;
  catalog: ICatalog;
}

class ShowOnlyViewed extends React.Component<
  IConnectedShowOnlyViewedProps,
  any
> {
  toggleViewed = e => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION_TOGGLE_SHOW_ONLY_VIEWED });
  };

  render() {
    const { catalog: { showOnlyViewed, viewedProductIds } } = this.props;
    return (
      <div
        className={styles.showOnlyWiewed}
        style={{
          display: viewedProductIds.length === 0 ? "none" : "block"
        }}
        onClick={this.toggleViewed}
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

const mapStateToProps: any = state => ({
  catalog: state.catalog
});

export default connect<any, {}, any>(mapStateToProps)(ShowOnlyViewed);
