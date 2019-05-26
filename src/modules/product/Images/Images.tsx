import { ProductQuery } from "@src/generated/graphql";
import { MyIcon } from "@src/modules/common";
import { Div } from "@src/modules/common/utils";
import { LoadingMask } from "@src/modules/layout";
import { MyHistory } from "@src/routes/interfaces";
import { Flex } from "antd-mobile";
import { defaultProps } from "antd-mobile/lib/search-bar/PropsType";
import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import ReactCarousel from "rmc-nuka-carousel";

import { Aux } from "../../common/utils";

const styles = require("./styles.css");

export const getImagesWithColor = (images: ProductQuery.Images[]): ProductQuery.Images[] => {
  return images.filter(image => image.attributeValue && image.attributeValue.value !== "");
};

export const getImagesWithUniqColor = (images: ProductQuery.Images[]): ProductQuery.Images[] => {
  const colorIds: number[] = [];
  return images.filter(image => {
    if (
      !!image.attributeValue &&
      colorIds.indexOf(image.attributeValue!.id!) === -1 &&
      image.attributeValue &&
      image.attributeValue.value !== ""
    ) {
      colorIds.push(image.attributeValue!.id!);
      return true;
    }
  });
};

const DEFAULT_OBJEFT_FIT_SIZE = {
  width: "100%",
  height: "95%"
};

const DEFAULT_SELECTED_IMAGE_INDEX = 0;

const LAZY_OFFSET = 400;

interface Image extends ProductQuery.Images {
  url?: string;
}

interface OwnProps {
  autoplay?: boolean;
  wrapAround?: boolean;
  containerHeight?: number;
  images: Image[];
  dotHeight: number;
  selectedImageIndex?: number;
  objectFitSize?: {
    width: string;
    height: string;
    objectFit?: string;
  };
  linkProps?: {};
}

interface StateProps {
  history: MyHistory;
}

interface Props extends OwnProps, StateProps {}

interface State {
  selectedImageIndex: number;
  maxLoadedImageIndex: number;
}

class Images extends React.Component<Props, State> {
  static defaultProps = {
    selectedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX,
    autoplay: false,
    wrapAround: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedImageIndex: props.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX,
      maxLoadedImageIndex: DEFAULT_SELECTED_IMAGE_INDEX
    };
  }

  componentWillReceiveProps(nextProps: OwnProps) {
    const selectedImageIndex = nextProps.selectedImageIndex || DEFAULT_SELECTED_IMAGE_INDEX;
    this.setState({ selectedImageIndex });
  }

  render() {
    const {
      images,
      linkProps,
      dotHeight,
      containerHeight,
      autoplay,
      wrapAround,
      history
    } = this.props;
    const objectFitSize = this.props.objectFitSize || DEFAULT_OBJEFT_FIT_SIZE;
    const Component = linkProps ? Link : Div;
    if (images.length > 1) {
      const selectedImage = images[this.state.selectedImageIndex];
      return (
        <Aux>
          <Component
            to="" // FIXME: wan't here
            className={styles.Images}
            {...linkProps}
          >
            {linkProps ? (
              <Flex
                justify="center"
                align="center"
                style={{
                  height: this._getHeight(images[0])
                }}
              >
                {false ? (
                  <MyIcon
                    className={styles.noImage}
                    type={require("!svg-sprite-loader!./no-image.svg")}
                  />
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
                autoplay={autoplay}
                // className={styles.Carousel}
                // selectedIndex={this.state.selectedImageIndex}
                // dots={false}
                wrapAround={wrapAround}
                // speed={1}
                cellAlign="left"
                decorators={[]}
                dragging={false}
                swiping={true}
                className={styles.Carousel}
                slideIndex={this.state.selectedImageIndex}
                // dots={false}  // FIXME: Should be
                // infinite={false} // FIXME: Should be
                afterSlide={index => {
                  const { selectedImageIndex, maxLoadedImageIndex } = this.state;
                  if (index !== selectedImageIndex) {
                    this.setState({
                      selectedImageIndex: index,
                      maxLoadedImageIndex:
                        index + 1 > maxLoadedImageIndex ? index + 1 : maxLoadedImageIndex
                    });
                  }
                }}
                style={{ height: this._getHeight(images[0]) }}
              >
                {this.props.images.map((image, index) => (
                  <Flex
                    key={index}
                    justify="center"
                    align="center"
                    style={{
                      height: this._getHeight(images[0])
                    }}
                  >
                    {index <= this.state.maxLoadedImageIndex ||
                    index === this.state.selectedImageIndex ? (
                      <img
                        onClick={e => (image.url ? this._redirect(image.url!) : null)}
                        style={objectFitSize}
                        className={styles.image}
                        src={image.src}
                      />
                    ) : (
                      <LoadingMask />
                    )}
                  </Flex>
                ))}
              </ReactCarousel>
            )}
          </Component>

          {/* Carousel dots per image */}
          <Flex
            // justify="between"
            justify="center"
            className={styles.dots}
            style={{ minHeight: dotHeight * 1.5 }}
          >
            {this.props.images.map((image, i) => (
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
                      : i === this.state.selectedImageIndex
                      ? "gray"
                      : "lightgray",
                  minWidth: i === this.state.selectedImageIndex ? "0.5rem" : "auto",
                  width: i === this.state.selectedImageIndex ? dotHeight * 2 * 1.5 : dotHeight * 2,
                  height: i === this.state.selectedImageIndex ? dotHeight * 1.5 : dotHeight
                }}
                onClick={e => this.setState({ selectedImageIndex: i })}
              />
            ))}
          </Flex>
        </Aux>
      );
    } else {
      return (
        <Component
          to="" // FIXME: Should be
          {...linkProps}
        >
          <Flex
            justify="center"
            align="center"
            style={{
              height: this._getHeight(images[0])
            }}
          >
            {images.length === 0 ? (
              <MyIcon
                className={styles.noImage}
                type={require("!svg-sprite-loader!./no-image.svg")}
              />
            ) : (
              <img className={styles.image} style={objectFitSize} src={images[0].src} />
            )}
          </Flex>
        </Component>
      );
    }
  }

  private _getHeight = (image?: ProductQuery.Images): number => {
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

  private _redirect = (url: string) => {
    const { history } = this.props;
    history.push(url!);
  };
}

export default compose(withRouter)(Images as any) as any;
