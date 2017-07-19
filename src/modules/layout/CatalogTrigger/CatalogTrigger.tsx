import { Icon } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";

import { toggleCatalog } from "../index";
import { ILayout } from "../model";

interface IConnectedCatalogTriggerProps {
  layout: ILayout;
  dispatch: any;
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
      <Ripples>
        <Icon
          type={require("!svg-sprite-loader!./catalog.svg")}
          size="md"
          onClick={() => toggleCatalog(dispatch)}
          style={{
            fill: layout.openCatalog ? "orange" : "white",
            height,
            padding: `0 ${height / 3}px`
          }}
        />
      </Ripples>
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
