import Lottie from "lottie-react-web";
import * as React from "react";

const styles = require("./styles.css");

interface Props {
  style?: any;
  centered?: boolean;
}

class LoadingMask extends React.PureComponent<Props> {
  static defaultProps = {
    centered: true
  };

  render() {
    const { centered, style } = this.props;
    return (
      <div
        className={centered ? styles.LoadingMask : styles.lottie}
        style={style}
      >
        <Lottie
          width={centered ? "40%" : "100%"}
          options={{
            animationData: require("./loading.json")
          }}
        />
      </div>
    );
  }
}

export default LoadingMask;
