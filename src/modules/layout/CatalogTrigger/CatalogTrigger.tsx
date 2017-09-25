import { Icon } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { toggleCatalog } from "../index";
import { ILayout } from "../model";

interface IConnectedCatalogTriggerProps {
  layout: ILayout;
  dispatch: Dispatch<{}>;
}

interface ICatalogTriggerProps {
  height: number;
}

class CatalogTrigger extends React.Component<
  IConnectedCatalogTriggerProps & ICatalogTriggerProps,
  any
> {
  render() {
    const { layout, height, dispatch } = this.props;

    return (
      <Icon
        type={require("!svg-sprite-loader!./catalog.svg")}
        size="md"
        onClick={() => toggleCatalog(dispatch)}
        style={{
          fill: layout.openCatalog ? "orange" : "white",
          height,
          padding: `0 ${height / 4}px`
        }}
      />
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose(
  connect<IConnectedCatalogTriggerProps, {}, ICatalogTriggerProps>(
    mapStateToProps
  )
)(CatalogTrigger);
