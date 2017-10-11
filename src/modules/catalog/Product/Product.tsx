import { MyIcon } from "@src/modules/common";
import { scaleImageSize } from "@src/modules/product";
import { IImageWithColor, IProduct } from "@src/modules/product/model";
import { IRootReducer } from "@src/rootReducer";
import { Card, Flex, WhiteSpace } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ICatalogReducer } from "../reducer";

const styles = require("./styles.css");

const getMinOfArray = numArray => {
  return Math.min.apply(null, numArray);
};

interface StateProps {
  catalog: ICatalogReducer;
}

interface OwnProps extends IProduct {}

interface State {
  titleImage: IImageWithColor;
}

class Product extends React.Component<StateProps & OwnProps, State> {
  componentWillMount() {
    const { imagesWithColor } = this.props;
    this.setState({
      titleImage:
        imagesWithColor.filter(img => img.isTitle)[0] || imagesWithColor[0]
    });
  }

  isViewed() {
    const { catalog, id } = this.props;
    return catalog.viewedProductIds.indexOf(id) !== -1;
  }

  changeTitleImage = (e, image) => {
    this.setState({ titleImage: image });
  };

  getLinkProps = () => {
    const { id, subProducts, brand } = this.props;
    const subProduct = subProducts[0];
    return {
      to: {
        pathname: compile(`/product/:id/`)({ id }),
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

    const width = Math.round(window.innerWidth / 2) - 5;

    const maxImageHeight = Math.max(
      ...imagesWithColor.map(
        img => scaleImageSize(img.width, img.height).height
      )
    );

    return (
      <div className={styles.Product} style={{ width }}>
        <Card className={styles.card}>
          {this.isViewed()
            ? <div style={{ position: "absolute", top: 1, left: 5 }}>
                <MyIcon
                  type={require("!svg-sprite-loader!./viewed.svg")}
                  size="sm"
                  style={{ fill: "orange" }}
                />
              </div>
            : ""}

          <WhiteSpace size="sm" />

          <div>
            <Link {...this.getLinkProps()}>
              <div
                className={styles.imageContainer}
                style={{ height: maxImageHeight }}
              >
                {titleImage
                  ? <img src={titleImage.src} />
                  : <MyIcon
                      className={styles.noImage}
                      type={require("!svg-sprite-loader!../../layout/HomeTrigger/logo.svg")}
                    />}
              </div>
            </Link>

            {/* Images */}
            {imagesWithColor.length > 1
              ? <Flex justify="center" style={{ height: 15 }}>
                  {imagesWithColor.map((image, i) =>
                    <MyIcon
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

          <Link {...this.getLinkProps()}>
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
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Product);
