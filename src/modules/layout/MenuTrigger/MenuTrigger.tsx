import { Icon } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import Ripples from "react-ripples";

import { ACTION_TOOTLE_MENU } from "../../layout/constants";
import { ILayout } from "../model";

interface IConnectedMenuTriggerProps {
  layout: ILayout;
  dispatch: any;
}

interface IMenuTriggerProps {
  height: number;
}

class MenuTrigger extends React.Component<
  IConnectedMenuTriggerProps & IMenuTriggerProps,
  any
> {
  onClick = e => {
    e.preventDefault();
    this.props.dispatch({ type: ACTION_TOOTLE_MENU });
  };

  render() {
    const { layout, height } = this.props;
    return (
      <Ripples>
        <Icon
          type={require("!svg-sprite-loader!./menu.svg")}
          size="xs"
          onClick={this.onClick}
          style={{
            fill: layout.openMenu === true ? "orange" : "white",
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
  connect<IConnectedMenuTriggerProps, {}, IMenuTriggerProps>(mapStateToProps)
)(MenuTrigger);
