import { Flex, Icon } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <Flex alignContent="center">
        React
        <Icon type="loading" className={styles.icon} />
        Shop
      </Flex>
    </div>
  );
};

export default Loading;
