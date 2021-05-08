import { MyIcon } from "@src/modules/common";
import { Div } from "@src/modules/common/utils";
import { Flex } from "antd-mobile";
import { defaultProps } from "antd-mobile/lib/search-bar/PropsType";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactCarousel from "rmc-nuka-carousel";
import { Aux } from "../../common/utils";
import { IImage } from "../model";

const styles = require("./styles.css");

export const getImagesWithColor = (images: IImage[]): IImage[] => {
  return images.filter(
    image => image.attributeValue && image.attributeValue.value !== ""
  );
};

const DEFAULT_OBJECT_FIT_SIZE = {
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

interface Props extends OwnProps {}

// interface State {
//   selectedImageIndex: number;
//   maxLoadedImageIndex: number;
// }

const Images: React.FC<Props> = (props) => {
  // static defaultProps = {
  //   selectedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX
  // };

  const [selectedImageIndex, setSelectedImageIndex] = useState(props.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX)
  const [maxLoadedImageIndex, setMaxLoadedImageIndex] = useState(DEFAULT_SELECTED_IMAGE_INDEX)
  
  useEffect(() => {
    setSelectedImageIndex(props.selectedImageIndex!)
  }, [props.selectedImageIndex])
  // componentWillReceiveProps(nextProps: OwnProps) {
  //   const selectedImageIndex =
  //     nextProps.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX;
  //   this.setState({ selectedImageIndex });
  // }

   const getHeight = (image?: IImage): number => {
    const { containerHeight } = props;
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

  
    const { images, linkProps, dotHeight, containerHeight } = props;
    const objectFitSize = props.objectFitSize || DEFAULT_OBJECT_FIT_SIZE;
    const Component: any = linkProps ? Link : Div;
    // const selectedImage = images[selectedImageIndex];

  if (images.length > 1) {
    const selectedImage = images[selectedImageIndex];

    return (
      <Aux>
        <Component className={styles.Images} {...linkProps}>
          <ReactCarousel
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
            slideIndex={selectedImageIndex}
            dots={false}
            infinite={false}
            afterSlide={index => {
              // const {
              //   selectedImageIndex,
              //   maxLoadedImageIndex
              // } = this.state;
              if (index !== selectedImageIndex) {
                setSelectedImageIndex(0)
                setMaxLoadedImageIndex(
                    0 + 1 > maxLoadedImageIndex
                      ? 0 + 1
                      : maxLoadedImageIndex
                );
              }
            }}
            style={{ height: getHeight(images[0])}}
          >
            {props.images.map((image, index) =>
              <Flex
                key={index}
                justify="center"
                align="center"
                style={{
                  height: getHeight(images[0]),
                  
                }}
              >
                {index <= maxLoadedImageIndex ||
                index === selectedImageIndex
                  ? <img
                      style={objectFitSize}
                      className={styles.image}
                      src={image.src}
                    />
                  : <MyIcon type="loading" size="lg" />}
              </Flex>
            )}
          </ReactCarousel>
        </Component>

        {/* Carousel dots per image */}
        <Flex 
          // justify="between"
          justify="center"
          className={styles.dots}
          style={{ minHeight: dotHeight * 1.5 }}
        >
          {props.images.map((image, i) =>
            <MyIcon
              key={i}
              className={styles.dot}
              type={
                image.attributeValue && image.attributeValue.value
                  ? require("!svg-sprite-loader!./circle.svg")
                  : require("!svg-sprite-loader!./empty-circle.svg")
              }
              style={{
                backgroundColor: "lightgreen",
                fill: image.attributeValue && image.attributeValue.value
                  ? image.attributeValue.value
                  : i === selectedImageIndex
                    ? "gray"
                    : "lightgray",
                minWidth:
                  i === selectedImageIndex ? "0.5rem" : "auto",
                width:
                  i === selectedImageIndex
                    ? dotHeight * 2 * 1.5
                    : dotHeight * 2,
                height:
                  i === selectedImageIndex
                    ? dotHeight * 1.5
                    : dotHeight
              }}
              onClick={e => setSelectedImageIndex(i)}
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
              height: getHeight(images[0])
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

export default Images;
