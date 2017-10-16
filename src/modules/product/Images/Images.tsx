import { MyIcon } from "@src/modules/common";
import { Div } from "@src/modules/common/utils";
import { Carousel, Flex } from "antd-mobile";
import { defaultProps } from "antd-mobile/lib/search-bar/PropsType";
import * as React from "react";
import { Link } from "react-router-dom";

import { Aux, MyTouchFeedback } from "../../common/utils";
import { IImage } from "../model";

const styles = require("./styles.css");

export const getImagesWithColor = (images: IImage[]): IImage[] => {
  return images.filter(image => image.colorValue !== "");
};

const DEFAULT_OBJEFT_FIT_SIZE = {
  width: "100%",
  height: "95%"
};

const DEFAULT_SELECTED_IMAGE_INDEX = 0;

const LAZY_OFFSET = 400;

interface OwnProps {
  containerHeight?: number;
  images: [IImage];
  dotHeight: number;
  selectedImageIndex?: number;
  objectFitSize?: {
    width: string;
    height: string;
  };
  linkProps?: {};
}

interface State {
  selectedImageIndex: number;
  maxLoadedImageIndex: number;
}

class Images extends React.Component<OwnProps, State> {
  static defaultProps = {
    selectedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX
  };

  state = {
    selectedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX,
    maxLoadedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX
  };

  componentWillReceiveProps(nextProps: OwnProps) {
    const selectedImageIndex =
      nextProps.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX;
    this.setState({ selectedImageIndex });
  }

  getHeight = (image?: IImage): number => {
    const { containerHeight } = this.props;
    if (!image || containerHeight) {
      return containerHeight!;
    }
    let squareHeight = window.innerWidth / 2;
    const { width, height } = image;
    if (width > height) {
      squareHeight *= height / width;
    }
    return squareHeight * 1.2;
  };

  render() {
    const { images, linkProps, dotHeight } = this.props;
    const objectFitSize = this.props.objectFitSize || DEFAULT_OBJEFT_FIT_SIZE;
    const Component = linkProps ? Link : Div;
    if (images.length > 1) {
      return (
        <Aux>
          <Component className={styles.Images} {...linkProps}>
            <Carousel
              autoplay={false}
              className={styles.Carousel}
              selectedIndex={this.state.selectedImageIndex}
              dots={false}
              infinite={false}
              beforeChange={(from, index) => {
                const { selectedImageIndex, maxLoadedImageIndex } = this.state;
                if (index !== selectedImageIndex) {
                  this.setState({
                    selectedImageIndex: index,
                    maxLoadedImageIndex:
                      index + 1 > maxLoadedImageIndex
                        ? index + 1
                        : maxLoadedImageIndex
                  });
                }
              }}
              style={{ height: this.getHeight(images[0]) }}
            >
              {this.props.images.map((image, index) =>
                <Flex
                  key={index}
                  justify="center"
                  align="center"
                  style={{
                    height: this.getHeight(images[0])
                  }}
                >
                  {index <= this.state.maxLoadedImageIndex ||
                  index === this.state.selectedImageIndex
                    ? <img
                        style={objectFitSize}
                        className={styles.image}
                        src={image.src}
                      />
                    : <MyIcon type="loading" size="lg" />}
                </Flex>
              )}
            </Carousel>
          </Component>

          {/* Carousel dots per image */}
          <Flex
            // justify="between"
            justify="center"
            className={styles.dots}
            style={{ minHeight: dotHeight * 1.5 }}
          >
            {this.props.images.map((image, i) =>
              <MyIcon
                key={i}
                className={styles.dot}
                type={
                  image.colorValue
                    ? require("!svg-sprite-loader!./circle.svg")
                    : require("!svg-sprite-loader!./empty-circle.svg")
                }
                style={{
                  fill: image.colorValue
                    ? image.colorValue
                    : i === this.state.selectedImageIndex
                      ? "gray"
                      : "lightgray",
                  minWidth:
                    i === this.state.selectedImageIndex ? "0.5rem" : "auto",
                  width:
                    i === this.state.selectedImageIndex
                      ? dotHeight * 2 * 1.5
                      : dotHeight * 2,
                  height:
                    i === this.state.selectedImageIndex
                      ? dotHeight * 1.5
                      : dotHeight
                }}
                onClick={e => this.setState({ selectedImageIndex: i })}
              />
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
              height: this.getHeight(images[0])
            }}
          >
            {images.length === 0
              ? <MyIcon
                  className={styles.noImage}
                  type={require("!svg-sprite-loader!./no-image.svg")}
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
