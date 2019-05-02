import * as React from "react";

const styles = require("./styles.css");

interface OwnProps {}

class ModalRoute extends React.Component<OwnProps, {}> {
  render() {
    return <div className={styles.ModalRoute}>{this.props.children}</div>;
  }
}

export default ModalRoute;
