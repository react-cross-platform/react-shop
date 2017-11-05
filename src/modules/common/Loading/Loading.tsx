import { MyIcon } from "@src/modules/common";
import { Flex } from "antd-mobile";
import * as React from "react";
import { renderToString } from "react-dom/server";

const renderHTML = require("react-render-html");
const styles = require("./styles.css");

const Loading = () => {
  const icon = (
    <MyIcon
      className={styles.icon}
      type={require("!svg-sprite-loader!./loader.svg")}
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
  //     type={require("!svg-sprite-loader!./loader.svg")}
  //     className={styles.icon}
  //   />
  // );
  // // tslint:disable-next-line:no-eval
  // const logo = eval(process.env.PROJECT_NAME);
  // return (
  //   <div className={styles.Loading}>
  //     <Flex alignContent="center">
  //       {renderHTML(logo)}
  //     </Flex>
  //   </div>
  // );
};

export default Loading;
