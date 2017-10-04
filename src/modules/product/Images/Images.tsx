import { Carousel, Flex } from 'antd-mobile';
import * as React from 'react';

import { scaleImageSize } from '../Image/Image';
import { IImage } from '../model';

const styles = require('./styles.css');

interface OwnProps {
  images: [IImage];
}

class Images extends React.Component<OwnProps, {}> {
  render() {
    const { images } = this.props;
    const maxImageHeight = Math.max(
      ...images.map(img => scaleImageSize(img.width, img.height, 1.5).height)
    );

    const height = window.innerHeight * 0.65;
    const dotStyle = {
      position: 'relative',
      top: innerHeight * 0.02
    };
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
          dotStyle={dotStyle}
          dotActiveStyle={dotStyle}
        >
          {this.props.images.map((image, i) =>
            <Flex
              key={i}
              justify='center'
              align='center'
              style={{
                height
              }}
            >
              <img className={styles.image} src={image.src} />
            </Flex>
          )}
        </Carousel>
      );
    } else {
      const image = images[0];
      return (
        <Flex
          justify='center'
          align='center'
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
