import { Button } from "antd-mobile";
import * as React from "react";
import { Link } from "react-router-dom";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

class Footer extends React.Component<any, any> {
  render() {
    return <div className={styles.footer}>ReactShop</div>;
  }
}

export default Footer;
