import { MyIcon, Price } from "@src/modules/common";
import { MyTouchFeedback } from "@src/modules/common/utils";
import { Images } from "@src/modules/product";
import { IImage } from "@src/modules/product/model";
import { IRootReducer } from "@src/rootReducer";
import { Card, Flex } from "antd-mobile";
import { compile } from "path-to-regexp";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { IProduct } from "../../product/model";

const styles = require("./styles.css");

const getMinOfArray = numArray => {
  return Math.min.apply(null, numArray);
};

interface StateProps {
  viewedProductIds: any;
}

interface OwnProps extends IProduct {
  attributeValueIds: number[];
}

interface State {
  titleImage: IImage;
}

interface Props extends OwnProps, StateProps {}

class Product extends React.Component<Props, State> {
  componentWillMount() {
    this.setTitleImage(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setTitleImage(nextProps);
  }

  render() {
    const { id, name, subProducts, brand, images } = this.props;
    const titleImage = this.state.titleImage;
    const subProduct = subProducts[0];
    const prices = subProducts.map(el => el.price);
    const isSinglePrice = prices.length === 1;
    const minPrice = getMinOfArray(prices);

    const width = Math.round(window.innerWidth / 2) - 5;
    const selectedImageIndex =
      images.indexOf(titleImage) === -1 ? 0 : images.indexOf(titleImage);
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
              selectedImageIndex={selectedImageIndex}
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
                  <Flex justify="between">
                    <Price
                      style={{
                        height: subProduct.oldPrice ? "3.2rem" : "2.7rem",
                        justifyContent: subProduct.oldPrice ? "center" : "left",
                        display: "flex",
                        alignItems: subProduct.oldPrice ? "left" : "center"
                      }}
                      isSinglePrice={isSinglePrice}
                      price={subProduct.price}
                      oldPrice={subProduct.oldPrice}
                    />
                    {subProduct.discount > 0 &&
                      <div className={styles.discount}>
                        -{subProduct.discount}%
                      </div>}
                  </Flex>
                </div>
              </Link>
            </MyTouchFeedback>
          </Card>
        </div>
      </MyTouchFeedback>
    );
  }

  setTitleImage = (props: Props) => {
    const { images, attributeValueIds } = props;
    let titleImage;
    if (attributeValueIds.length > 0) {
      const titleImages = images.filter(
        image =>
          image.attributeValue &&
          attributeValueIds.indexOf(image.attributeValue.id) !== -1
      );
      if (titleImages.length > 0) {
        titleImage = titleImages[0];
      }
    } else {
      titleImage = images.filter(img => img.isTitle)[0];
    }
    titleImage = titleImage || images[0];

    this.setState({
      titleImage
    });
  };

  isViewed() {
    const { viewedProductIds, id } = this.props;
    return viewedProductIds.indexOf(parseInt(id, 0)) !== -1;
  }

  changeTitleImage = (e, image) => {
    this.setState({ titleImage: image });
  };

  getLinkProps = () => {
    const { id, subProducts, brand, attributeValueIds } = this.props;
    const subProduct = subProducts[0];
    const params = {
      to: {
        pathname: compile(`/product/:id/`)({ id }),
        search:
          attributeValueIds.length > 0
            ? `?attribute_value_ids=${attributeValueIds.join(",")}`
            : "",
        state: {
          modal: true,
          title: `${brand.name} ${subProduct.article}`
        }
      }
    };
    return params;
  };
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  viewedProductIds: state.catalog.viewedProductIds
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(Product);
