import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { Flex } from "antd-mobile";
import * as React from "react";

const styles = require("./styles.css");

interface ImageProps {
  images,
  activeImage,
}

class Colors extends React.Component<any, any> {
  render() {
    const { images, activeImage } = this.props;
    return (
      <Flex justify="between">
      <Flex align="center">
        {images.map(
          (image, i) =>
            parseInt(image.id, 0) === activeImage.colorId
              ? <MyIcon
                  key={i}
                  className={styles.colorIcon}
                  type={require("svg-sprite-loader!./checked-circle.svg")}
                  style={{
                    fill: image.colorValue
                  }}
                />
              : <MyTouchFeedback key={i}>
                  <MyIcon
                    className={styles.colorIcon}
                    onClick={() =>
                      this.props.selectColor(
                        parseInt(image.id, 0)
                      )}
                    type={require("svg-sprite-loader!./circle.svg")}
                    style={{
                      fill: image.colorValue
                    }}
                  />
                </MyTouchFeedback>
        )}
      </Flex>
      <div className={styles.colorName}>
        {activeImage && activeImage.colorName}
      </div>
    </Flex>    );
  }
}

export default Colors;
