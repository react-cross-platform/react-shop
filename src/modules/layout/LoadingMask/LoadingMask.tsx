import { MyIcon } from "@src/modules/common";
import * as React from "react";

const styles = require("./styles.css");

class LoadingMask extends React.Component<any, {}> {
  render() {
    return (
      <div className={styles.LoadingMask} style={this.props.style}>
        <div className={styles.loading}>
          <MyIcon
            type={require("!svg-sprite-loader!./loader.svg")}
            size="lg"
            className={styles.icon}
          />
        </div>
      </div>
    );
  }
}

export default LoadingMask;
