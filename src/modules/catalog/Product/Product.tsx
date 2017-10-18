import { MyIcon } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { Images, scaleImageSize } from "@src/modules/product";
import { IImageWithColor, IProduct } from "@src/modules/product/model";
import { IRootReducer } from "@src/rootReducer";
import { Card, WhiteSpace } from "antd-mobile";
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
    const { images } = this.props;
    this.setState({
      titleImage: images.filter(img => img.isTitle)[0] || images[0]
    });
  }

  isViewed() {
    const { catalog, id } = this.props;
    return catalog.viewedProductIds.indexOf(parseInt(id, 0)) !== -1;
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
    const { id, name, subProducts, brand, images, catalog } = this.props;
    const titleImage = this.state.titleImage;
    const subProduct = subProducts[0];
    const prices = subProducts.map(el => el.price);
    const isSinglePrice = prices.length === 1;
    const minPrice = getMinOfArray(prices);

    const width = Math.round(window.innerWidth / 2) - 5;

    return (
      <MyTouchFeedback>
        <div className={styles.Product} style={{ width }}>
          <Card>
            {this.isViewed() &&
              <MyIcon
                type={require("!svg-sprite-loader!./viewed.svg")}
                size="sm"
                className={styles.isViewed}
              />}
            <Images
              images={images}
              objectFitSize={{ width: "90%", height: "90%" }}
              dotHeight={10}
              linkProps={this.getLinkProps()}
            />

            <MyTouchFeedback>
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
            </MyTouchFeedback>
          </Card>
        </div>
      </MyTouchFeedback>
    );
  }
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Product);
