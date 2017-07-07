import {
  Button,
  Flex,
  Icon,
  List,
  Modal,
  WhiteSpace,
  WingBlank
} from "antd-mobile";
import * as React from "react";
import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ACTION_TOOTLE_CATALOG } from "../constants";
import { FlatPages, Footer, Header } from "../index";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const Logo = props => {
  return (
    <Flex justify="center" align="center">
      <img
        className={styles.image}
        src="http://static1.shop.serga.name/static/img/logo.png"
      />
    </Flex>
  );
};

class Menu extends React.Component<any, any> {
  render() {
    const width = window.innerWidth * 0.9;
    return (
      <div className={styles.menu} style={{ width }}>
        {/*<Logo/>*/}
        {/*<WhiteSpace size="lg" />*/}
        <FlatPages />
      </div>
    );
  }
}

export default Menu;
