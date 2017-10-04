import { Carousel, Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import * as React from 'react';

export const scaleImageSize = (width, height, ratio = 1) => {
  ratio = ratio || window.innerWidth / 2.4 / 360;
  return {
    height: height * ratio,
    width: width * ratio
  };
};

const styles = require('./styles.css');

interface ImageProps {
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
  divHeight: number;
}

class Image extends React.Component<ImageProps, null> {
  render() {
    const { divHeight, width, height, src, isTitle } = this.props;
    return (
      <Flex justify='center' align='center' style={{ height: divHeight }}>
        <img className={styles.image} src={src} />
      </Flex>
    );
  }
}

export default Image;
