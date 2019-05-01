import Lottie from "lottie-react-web";
import * as React from "react";

const styles = require("./styles.css");

interface Props {
  style?: any;
}

class LoadingMask extends React.PureComponent<Props> {
  render() {
    return (
      <div className={styles.LoadingMask} style={this.props.style}>
        <Lottie
          options={{
            animationData: require("./loading.json")
          }}
        />
      </div>
    );
  }
}

export default LoadingMask;
