import { Icon } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Icon type="loading" size="lg" />
    </div>
  );
};

export default Loading;
