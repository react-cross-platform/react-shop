import { MyIcon } from "@src/modules/common";
import { Div } from "@src/modules/common/utils";
import { Flex } from "antd-mobile";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactCarousel from "rmc-nuka-carousel";
import { Aux } from "../../common/utils";
import { IImage } from "../model";

const styles = require("./styles.css");

export const getImagesWithColor = (images: IImage[]): IImage[] => {
  return images.filter((image) => image.attributeValue && image.attributeValue.value !== "");
};

const getHeight = (image?: IImage, containerHeight?: number): number => {
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

const DEFAULT_OBJECT_FIT_SIZE = {
  width: "100%",
  height: "95%"
};

const DEFAULT_SELECTED_IMAGE_INDEX = 0;

const LAZY_OFFSET = 400;
interface OwnProps {
  containerHeight?: number;
  images: IImage[];
  dotHeight: number;
  selectedImageIndex?: number;
  objectFitSize?: {
    width: string;
    height: string;
  };
  linkProps?: {};
}

interface Props extends OwnProps {}

const Images: React.FC<Props> = (props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(
    props.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX
  );
  const [maxLoadedImageIndex, setMaxLoadedImageIndex] = useState(DEFAULT_SELECTED_IMAGE_INDEX);

  useEffect(() => {
    setSelectedImageIndex(props.selectedImageIndex! || DEFAULT_SELECTED_IMAGE_INDEX);
  }, [props.selectedImageIndex]);

  const { images, linkProps, dotHeight, containerHeight } = props;
  const objectFitSize = props.objectFitSize || DEFAULT_OBJECT_FIT_SIZE;
  const Component: any = linkProps ? Link : Div;
  if (images.length > 1) {
    const selectedImage = images[selectedImageIndex] || images[props.selectedImageIndex!];
    //  if(!selectedImageIndex) {
    //    debugger
    // }
    return (
      <Aux>
        <Component className={styles.Images} {...linkProps}>
          {linkProps ? (
            <Flex
              justify="center"
              align="center"
              style={{
                height: getHeight(images[0], containerHeight)
              }}
            >
              {false ? (
                <MyIcon className={styles.noImage} type={require("!svg-sprite-loader!./no-image.svg")} />
              ) : (
                <img
                  className={styles.image}
                  style={objectFitSize}
                  src={selectedImage.src}
                  onLoad={() => {
                    window.dispatchEvent(new Event("resize"));
                  }}
                />
              )}
            </Flex>
          ) : (
            <ReactCarousel
              decorators={[]}
              dragging={false}
              swiping={true}
              autoplay={false}
              className={styles.Carousel}
              slideIndex={selectedImageIndex}
              dots={false}
              infinite={false}
              afterSlide={(index) => {
                if (index !== selectedImageIndex) {
                  setSelectedImageIndex(index);
                  setMaxLoadedImageIndex(index + 1 > maxLoadedImageIndex ? index + 1 : maxLoadedImageIndex);
                }
              }}
              style={{ height: getHeight(images[0], containerHeight) }}
            >
              {images.map((image, index) => (
                <Flex
                  key={index}
                  justify="center"
                  align="center"
                  style={{
                    height: getHeight(images[0], containerHeight)
                  }}
                >
                  {index <= maxLoadedImageIndex || index === selectedImageIndex ? (
                    <img style={objectFitSize} className={styles.image} src={image.src} />
                  ) : (
                    <MyIcon type="loading" size="lg" />
                  )}
                </Flex>
              ))}
            </ReactCarousel>
          )}
        </Component>

        {/* Carousel dots per image */}
        <Flex justify="center" className={styles.dots} style={{ minHeight: dotHeight * 1.5 }}>
          {props.images.map((image, i) => (
            <MyIcon
              key={i}
              className={styles.dot}
              type={
                image.attributeValue && image.attributeValue.value
                  ? require("!svg-sprite-loader!./circle.svg")
                  : require("!svg-sprite-loader!./empty-circle.svg")
              }
              style={{
                fill:
                  image.attributeValue && image.attributeValue.value
                    ? image.attributeValue.value
                    : i === selectedImageIndex
                    ? "gray"
                    : "lightgray",
                minWidth: i === selectedImageIndex ? "0.5rem" : "auto",
                width: i === selectedImageIndex ? dotHeight * 2 * 1.5 : dotHeight * 2,
                height: i === selectedImageIndex ? dotHeight * 1.5 : dotHeight
              }}
              onClick={(e) => setSelectedImageIndex(i)}
            />
          ))}
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
            height: getHeight(images[0], containerHeight)
          }}
        >
          {images.length === 0 ? (
            <MyIcon className={styles.noImage} type={require("!svg-sprite-loader!./no-image.svg")} />
          ) : (
            <img className={styles.image} style={objectFitSize} src={images[0].src} />
          )}
        </Flex>
      </Component>
    );
  }
};

export default Images;
