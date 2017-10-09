import { IRouterReducer } from "@src/interfaces";
import { Icon } from "@src/modules/common";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { Flex } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const styles = require("./styles.css");

interface StateProps {
  router: IRouterReducer;
}

const Logo = ({ isActive }) => {
  return (
    <Flex className={styles.homeTrigger} align="center">
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

class HomeTrigger extends React.Component<StateProps, {}> {
  render() {
    const { router } = this.props;
    const isActive = router.location.pathname === PATH_NAMES.home;
    if (isActive) {
      return <Logo isActive={true} />;
    } else {
      return (
        <Link to={PATH_NAMES.home}>
          <Logo isActive={false} />
        </Link>
      );
    }
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  router: state.router
});

export default connect<StateProps, {}, {}>(mapStateToProps)(HomeTrigger);
