import { Carousel, Flex } from "antd-mobile";
import * as React from "react";

import { scaleImageSize } from "../Image/Image";
import { IImage } from "../model";

const styles = require("./styles.css");

interface IImagesProps {
  images: [IImage];
}

interface IImagesState {
  initialHeight: any;
}

class Images extends React.Component<IImagesProps, IImagesState> {
  state = {
    initialHeight: 200
  };

  render() {
    const { images } = this.props;
    const maxImageHeight = Math.max(
      ...images.map(img => scaleImageSize(img.width, img.height, 1.5).height)
    );

    const height = window.innerHeight * 0.73;
    if (images.length > 1) {
      return (
        <Carousel
          autoplay={false}
          className={styles.carousel}
          dots={images.length > 1}
          infinite={false}
          selectedIndex={0}
          style={{
            height
          }}
        >
          {this.props.images.map((image, i) =>
            <Flex
              key={i}
              justify="center"
              align="center"
              style={{
                height
              }}
            >
              <img
                className={styles.image}
                src={image.src}
                onLoad={() => {
                  window.dispatchEvent(new Event("resize"));
                  this.setState({
                    initialHeight: null
                  });
                }}
              />
            </Flex>
          )}
        </Carousel>
      );
    } else {
      const image = images[0];
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            height: image.height
          }}
        >
          <img className={styles.image} src={image.src} />
        </Flex>
      );
    }
  }
}

export default Images;
