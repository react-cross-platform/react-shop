import { Button, Icon, List, WingBlank } from "antd-mobile";
import * as React from "react";

// tslint:disable-next-line:no-var-requires
const styles = require("./styles.css");

const Loading = () => {
  return (
    <div className={styles.icon}>
      <Icon type={require("!svg-sprite-loader!./loading.svg")} size="lg" />
    </div>
  );
};

export default Loading;
