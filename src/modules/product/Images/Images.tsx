import { MyIcon } from "@src/modules/common";
import { Div } from "@src/modules/common/utils";
import { Flex } from "antd-mobile";
import { defaultProps } from "antd-mobile/lib/search-bar/PropsType";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactCarousel from "rmc-nuka-carousel";

import { Aux } from "../../common/utils";
import { IImages } from "../model";

const styles = require("./styles.css");

export const getImagesWithColor = (images: IImages[]): IImages[] => {
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
  images: [IImages];
  dotHeight: number;
  selectedImageIndex?: number;
  objectFitSize?: {
    width: string;
    height: string;
  };
  linkProps?: {};
}

interface Props extends OwnProps {}

interface State {
  selectedImageIndex: number;
  maxLoadedImageIndex: number;
}

class Images extends React.Component<Props, State> {
  static defaultProps = {
    selectedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedImageIndex:
        props.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX,
      maxLoadedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX
    };
  }

  componentWillReceiveProps(nextProps: OwnProps) {
    const selectedImageIndex =
      nextProps.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX;
    this.setState({ selectedImageIndex });
  }

  getHeight = (image?: IImages): number => {
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
    const { images, linkProps, dotHeight, containerHeight } = this.props;
    const objectFitSize = this.props.objectFitSize || DEFAULT_OBJEFT_FIT_SIZE;
    const Component = linkProps ? Link : Div;
    if (images.length > 1) {
      const selectedImage = images[this.state.selectedImageIndex];
      return (
        <Aux>
          <Component className={styles.Images} {...linkProps}>
            {linkProps
              ? <Flex
                  justify="center"
                  align="center"
                  style={{
                    // height: this.getHeight(selectedImage)
                    height: this.getHeight(images[0])
                  }}
                >
                  {false
                    ? <MyIcon
                        className={styles.noImage}
                        type={require("!svg-sprite-loader!./no-image.svg")}
                      />
                    : <img
                        className={styles.image}
                        style={objectFitSize}
                        src={selectedImage.src}
                        onLoad={() => {
                          window.dispatchEvent(new Event("resize"));
                        }}
                      />}
                </Flex>
              : <ReactCarousel
                  // autoplay={false}
                  // className={styles.Carousel}
                  // selectedIndex={this.state.selectedImageIndex}
                  // dots={false}
                  // infinite={false}
                  // speed={1}
                  decorators={[]}
                  dragging={false}
                  swiping={true}
                  autoplay={false}
                  className={styles.Carousel}
                  slideIndex={this.state.selectedImageIndex}
                  dots={false}
                  infinite={false}
                  afterSlide={index => {
                    const {
                      selectedImageIndex,
                      maxLoadedImageIndex
                    } = this.state;
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
                </ReactCarousel>}
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
