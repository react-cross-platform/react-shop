import { Flex, Icon } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { IRouterReducer } from "../../../interfaces";
import { PATH_NAMES } from "../../../routing";
import { ILayout } from "../model";

const styles = require("./styles.css");

interface IConnectedHomeTriggerProps {
  router: IRouterReducer;
  dispatch: Dispatch<{}>;
  layout: ILayout;
}

interface IHomeTriggerProps {
  height: number;
}

const Logo = ({ height, isActive }) => {
  return (
    <Flex
      className={styles.homeTrigger}
      align="center"
      style={{
        height,
        padding: `0 20px`
      }}
    >
      REACT
      <Icon
        className={styles.logoIcon}
        type={require("!svg-sprite-loader!./logo.svg")}
        size="md"
        style={{
          fill: isActive ? "orange" : "white"
        }}
      />
      SHOP
    </Flex>
  );
};

class HomeTrigger extends React.Component<
  IConnectedHomeTriggerProps & IHomeTriggerProps,
  any
> {
  render() {
    const { router, height } = this.props;
    const isActive = router.location.pathname === PATH_NAMES.home;
    if (isActive) {
      return <Logo height={height} isActive={true} />;
    } else {
      return (
        <Link to={PATH_NAMES.home}>
          <Logo height={height} isActive={false} />
        </Link>
      );
    }
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout,
  router: state.router
});

export default compose(
  connect<IConnectedHomeTriggerProps, {}, IHomeTriggerProps>(mapStateToProps)
)(HomeTrigger as any);
