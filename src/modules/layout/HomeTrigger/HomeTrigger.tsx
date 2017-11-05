import { MyIcon } from "@src/modules/common";
import { IRootReducer } from "@src/rootReducer";
import { PATH_NAMES } from "@src/routes";
import { IRouterReducer } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const renderHTML = require("react-render-html");

const styles = require("./styles.css");

interface StateProps {
  router: IRouterReducer;
}

const Logo = ({ isActive }) => {
  const icon = (
    <MyIcon
      className={styles.icon}
      type={require("!svg-sprite-loader!./logo.svg")}
      size="md"
    />
  );
  // tslint:disable-next-line:no-invalid-template-strings
  const logo = process.env.PROJECT_NAME.split("${icon}");
  return (
    <Flex className={styles.HomeTrigger} align="center">
      {logo[0]}
      {icon}
      {logo[1]}
    </Flex>
  );

  // const icon = renderToString(
  //   <MyIcon
  //     className={styles.icon}
  //     type={require("!svg-sprite-loader!./logo.svg")}
  //     size="md"
  //   />
  // );
  // // tslint:disable-next-line:no-eval
  // const logo = eval(`${process.env.PROJECT_NAME}`);
  // return (
  //   <Flex className={styles.HomeTrigger} align="center">
  //     {renderHTML(logo)}
  //   </Flex>
  // );
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
