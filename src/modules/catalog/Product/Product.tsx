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

  getLinkParams = () => {
    const { id, subProducts, brand } = this.props;
    const subProduct = subProducts[0];
    const url = `/product/${id}`;
    return {
      to: {
        pathname: url,
        state: {
          modal: true,
          title: `${brand.name} ${subProduct.article}`
        }
      }
    };
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
    const prices = subProducts.map(el => el.price);
    const isSinglePrice = prices.length === 1;
    const minPrice = getMinOfArray(prices);

    let cardPadding: number;
    let borderRadius: number;
    let width = Math.round(window.innerWidth / 2);
    if (window.innerWidth <= 320) {
      cardPadding = 5;
      borderRadius = 2;
      width -= 11;
    } else if (window.innerWidth <= 375) {
      cardPadding = 7;
      borderRadius = 3;
      width -= 14;
    } else {
      cardPadding = 7;
      borderRadius = 4;
      width -= 16;
    }

    const maxImageHeight = Math.max(
      ...imagesWithColor.map(
        img => scaleImageSize(img.width, img.height).height
      )
    );

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
          ? <div style={{ position: "absolute", top: 1, left: 5 }}>
              <Icon
                type={require("!svg-sprite-loader!./viewed.svg")}
                size="sm"
                style={{ fill: "orange" }}
              />
            </div>
          : ""}

        <WhiteSpace size="sm" />

        <div style={{ padding: cardPadding }}>
          <Link {...this.getLinkParams()}>
            <div
              className={styles.imageContainer}
              style={{ height: maxImageHeight }}
            >
              <LazyLoad height={maxImageHeight} offset={750}>
                <img src={titleImage.src} />
              </LazyLoad>
            </div>
          </Link>

          {/* Images */}
          {imagesWithColor.length > 1
            ? <Flex justify="center" style={{ height: 15 }}>
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

        <Link {...this.getLinkParams()}>
          <div className={styles.info}>
            <div className={styles.title}>
              {name}
              <br />
              {brand.name} {subProduct.article}
            </div>
            <div className={styles.price}>
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
