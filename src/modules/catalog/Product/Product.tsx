import { Flex, Icon, WhiteSpace } from "antd-mobile";
import * as React from "react";
import LazyLoad from "react-lazy-load";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";

import { scaleImageSize } from "../../product/index";
import { IImageWithColor, IProduct } from "../../product/model";
import { ICatalog } from "../model";

const styles = require("./styles.css");

const getMinOfArray = numArray => {
  return Math.min.apply(null, numArray);
};

interface IConnectedProductProps extends IProduct {
  catalog: ICatalog;
  dispatch: Dispatch<{}>;
}

interface IProductProps extends IProduct {}

interface IProductState {
  titleImage: IImageWithColor;
}

class Product extends React.Component<
  IConnectedProductProps & IProductProps,
  IProductState
> {

  componentWillMount() {
    const { imagesWithColor } = this.props;
    this.state = {
      titleImage:
        imagesWithColor.filter(img => img.isTitle)[0] || imagesWithColor[0]
    };
  }

  isViewed() {
    const { catalog, id } = this.props;
    return catalog.viewedProductIds.indexOf(id) !== -1;
  }

  changeTitleImage = (e, image) => {
    this.setState({ titleImage: image });
  };

  render() {
    const {
      id,
      name,
      subProducts,
      brand,
      imagesWithColor,
      catalog
    } = this.props;
    const titleImage = this.state.titleImage;
    const subProduct = subProducts[0];
    const url = `/product/${id}`;
    const prices = subProducts.map(el => el.price);
    const isSinglePrice = prices.length === 1;
    const minPrice = getMinOfArray(prices);

    let cardPadding: number;
    let borderRadius: number;
    let width = Math.round(window.innerWidth / 2);
    if (window.innerWidth <= 640) {
      cardPadding = 10;
      borderRadius = 4;
      width -= 22;
    } else if (window.innerWidth <= 750) {
      cardPadding = 14;
      borderRadius = 6;
      width -= 28;
    } else {
      cardPadding = 15;
      borderRadius = 8;
      width -= 32;
    }

    const maxImageHeight = Math.max(
      ...imagesWithColor.map(
        img => scaleImageSize(img.width, img.height).height
      )
    );

    const linkParams = {
      to: {
        pathname: url,
        state: { modal: true }
      }
    };

    return (
      <div
        className={styles.root}
        style={{
          border: `1px solid ${this.isViewed() ? "orange" : "lightgrey"}`,
          borderRadius,
          width
        }}
      >
        {this.isViewed()
          ? <div style={{ position: "absolute", top: 3, left: 10 }}>
              <Icon
                type={require("!svg-sprite-loader!./viewed.svg")}
                size="sm"
                style={{ fill: "orange" }}
              />
            </div>
          : ""}

        <WhiteSpace size="sm" />

        <div style={{ padding: cardPadding }}>
          <Link {...linkParams}>
            <div
              className={styles.imageContainer}
              style={{ height: maxImageHeight }}
            >
              <LazyLoad height={maxImageHeight} offset={1500}>
                <img src={titleImage.src} />
              </LazyLoad>
            </div>
          </Link>

          {/* Images */}
          {imagesWithColor.length > 1
            ? <Flex justify="center">
                {imagesWithColor.map((image, i) =>
                  <Icon
                    key={i}
                    type={require("!svg-sprite-loader!./dot.svg")}
                    size={image.id === titleImage.id ? "lg" : "md"}
                    style={{
                      fill: image.colorValue
                    }}
                    onClick={e => this.changeTitleImage(e, image)}
                  />
                )}
              </Flex>
            : ""}
        </div>

        <Link {...linkParams}>
          <div className={styles.info}>
            <div className={styles.title} style={{ marginTop: cardPadding }}>
              {name}
              <br />
              {brand.name} {subProduct.article}
            </div>
            <div className={styles.price} style={{ marginTop: cardPadding }}>
              <div>
                {isSinglePrice ? "" : "от "}
                {parseInt(minPrice, 10)} грн
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog
});

export default connect<IConnectedProductProps, {}, IProductProps>(
  mapStateToProps
)(Product);
