import { Button, Icon } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";
import { ACTION_TOOTLE_CATALOG } from "../../layout/constants";
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
  onClick = e => {
    e.preventDefault();
    this.props.dispatch({ type: ACTION_TOOTLE_CATALOG });
  };

  render() {
    const { layout, height } = this.props;

    return (
      <Ripples>
        <Icon
          type={require("!svg-sprite-loader!./catalog.svg")}
          size="md"
          onClick={this.onClick}
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
