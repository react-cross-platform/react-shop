import { MyIcon } from "@src/modules/common";
import { Div } from "@src/modules/common/utils";
import { Carousel, Flex } from "antd-mobile";
import * as React from "react";
import { Link } from "react-router-dom";

import { Aux, MyTouchFeedback } from "../../common/utils";
import { IImage } from "../model";

const styles = require("./styles.css");

const DEFAULT_OBJEFT_FIT_SIZE = {
  width: "100%",
  height: "95%"
};

const DEFAULT_CURRENT_IMAGE_NUMBER = 0;

interface OwnProps {
  defaultHeight: number;
  images: [IImage];
  dotWidth: number;
  currentImageNumber?: number;
  objectFitSize?: {
    width: string;
    height: string;
  };
  linkProps?: {};
}

interface State {
  currentImageNumber: number;
}

class Images extends React.Component<OwnProps, State> {
  state = {
    currentImageNumber: DEFAULT_CURRENT_IMAGE_NUMBER
  };

  componentWillReceiveProps(nextProps: OwnProps) {
    const currentImageNumber =
      nextProps.currentImageNumber || DEFAULT_CURRENT_IMAGE_NUMBER;
    this.setState({ currentImageNumber });
  }

  render() {
    const { defaultHeight, images, linkProps, dotWidth } = this.props;
    const objectFitSize = this.props.objectFitSize || DEFAULT_OBJEFT_FIT_SIZE;
    const Component = linkProps ? Link : Div;
    if (images.length > 1) {
      return (
        <Aux>
          <Component style={{ width: "100%" }} {...linkProps}>
            <Carousel
              autoplay={false}
              className={styles.Images}
              selectedIndex={
                this.state.currentImageNumber || DEFAULT_CURRENT_IMAGE_NUMBER
              }
              dots={false}
              infinite={false}
              afterChange={currentImageNumber =>
                this.setState({ currentImageNumber })}
              style={{ height: defaultHeight }}
            >
              {this.props.images.map((image, i) =>
                <Flex
                  key={i}
                  justify="center"
                  align="center"
                  style={{
                    height: defaultHeight
                  }}
                >
                  <img
                    style={objectFitSize}
                    className={styles.image}
                    src={image.src}
                  />
                </Flex>
              )}
            </Carousel>
          </Component>

          {/* Carousel dots per image */}
          <Flex justify="center">
            {this.props.images.map((image, i) =>
              <MyTouchFeedback key={i}>
                <MyIcon
                  type={
                    image.colorValue
                      ? require("!svg-sprite-loader!./circle.svg")
                      : require("!svg-sprite-loader!./empty-circle.svg")
                  }
                  style={{
                    fill: image.colorValue ? image.colorValue : "gray",
                    width:
                      i === this.state.currentImageNumber
                        ? dotWidth * 1.3
                        : dotWidth,
                    height:
                      i === this.state.currentImageNumber
                        ? dotWidth * 1.3
                        : dotWidth,
                    padding: dotWidth * 0.5
                  }}
                  onClick={e => this.setState({ currentImageNumber: i })}
                />
              </MyTouchFeedback>
            )}
          </Flex>
        </Aux>
      );
    } else {
      return (
        <Component {...linkProps}>
          <Flex
            justify="center"
            align="center"
            style={{
              height: defaultHeight
            }}
          >
            {images.length === 0
              ? <MyIcon
                  type={require("!svg-sprite-loader!./no-image.svg")}
                  style={{ fill: "lightgray" }}
                />
              : <img
                  className={styles.image}
                  style={objectFitSize}
                  src={images[0].src}
                />}
          </Flex>
        </Component>
      );
    }
  }
}

export default Images;
