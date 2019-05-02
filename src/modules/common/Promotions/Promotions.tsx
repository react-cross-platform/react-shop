import { PromotionsQuery } from "@src/generated/graphql";
import { Dispatch } from "@src/interfaces";
import { ICatalogReducer } from "@src/modules/catalog/reducer";
import { LoadingMask } from "@src/modules/layout";
import { Images } from "@src/modules/product";
import { IRootReducer } from "@src/rootReducer";
import { IRouterReducer } from "@src/routes/interfaces";
import { compile } from "path-to-regexp";
import * as React from "react";
import { graphql, OperationOption, QueryResult } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux";

import promotionsQuery from "./promotionsQuery.gql";

// const styles = require("./styles.css");

interface StateProps {
  catalog: ICatalogReducer;
  router: IRouterReducer;
  dispatch?: Dispatch;
}

interface OwnProps {}

export interface DataPromotions extends QueryResult, PromotionsQuery.Query {}

interface GraphQLProps {
  dataPromotions: DataPromotions;
}

interface Props extends OwnProps, StateProps, GraphQLProps {}

interface State {
  selectedImageIndex: number;
  maxLoadedImageIndex: number;
}

class Promotions extends React.Component<Props, State> {
  getLinkProps = () => {
    const params = {
      to: {
        pathname: compile(`/sale`)
        // state: {
        //   modal: true,
        //   title: `${brand.name} ${subProduct.article}`
        // }
      }
    };
    return params;
  };

  render() {
    const { dataPromotions } = this.props;
    const { promotions } = dataPromotions;
    if (!promotions) {
      return <LoadingMask centered={true} />;
    }
    const images: any = promotions.map(promotion => {
      return {
        url: promotion!.destinationUrl,
        attributeValue: {
          value: promotion.background
        },
        ...promotion!.mobileImage
      };
    });

    return (
      <Images
        autoplay={true}
        wrapAround={true}
        containerHeight={187}
        selectedImageIndex={0}
        images={images as any}
        // 375 x 174
        objectFitSize={{ width: "100%", height: "100%", objectFit: "unset" }}
        dotHeight={13}
        // linkProps={this.getLinkProps() as any}
      />
    );
  }

  //   render() {
  //     const { items } = this.props;
  //     const height = window.innerWidth / 2;
  //     return (
  //       <ReactCarousel
  //         // autoplay={false}
  //         // className={styles.Carousel}
  //         // selectedIndex={this.state.selectedImageIndex}
  //         // dots={false}
  //         // infinite={false}
  //         // speed={1}
  //         decorators={[]}
  //         dragging={false}
  //         swiping={true}
  //         autoplay={false}
  //         className={styles.Carousel}
  //         slideIndex={this.state.selectedImageIndex}
  //         // dots={false}  // FIXME: Should be
  //         // infinite={false} // FIXME: Should be
  //         afterSlide={index => {
  //           const { selectedImageIndex, maxLoadedImageIndex } = this.state;
  //           if (index !== selectedImageIndex) {
  //             this.setState({
  //               selectedImageIndex: index,
  //               maxLoadedImageIndex: index + 1 > maxLoadedImageIndex ? index + 1 : maxLoadedImageIndex
  //             });
  //           }
  //         }}
  //         style={{ height: this.getHeight(images[0]) }}
  //       >
  //         {this.props.images.map((image, index) => (
  //           <Flex
  //             key={index}
  //             justify="center"
  //             align="center"
  //             style={{
  //               height: this.getHeight(images[0])
  //             }}
  //           >
  //             {index <= this.state.maxLoadedImageIndex || index === this.state.selectedImageIndex ? (
  //               <img style={objectFitSize} className={styles.image} src={image.src} />
  //             ) : (
  //               <MyIcon type="loading" size="lg" />
  //             )}
  //           </Flex>
  //         ))}
  //       </ReactCarousel>
  //     );
  //   }

  //   getHeight = (image?: PromotionsQuery.MobileImage): number => {
  //     const { containerHeight } = this.props;
  //     if (!image || containerHeight) {
  //       return containerHeight!;
  //     }
  //     let squareHeight = window.innerWidth / 2;
  //     const { width, height } = image;
  //     if (width > height) {
  //       squareHeight *= height / width;
  //     }
  //     return squareHeight * 1.2;
  //   };
}

const mapStateToProps = (state: IRootReducer): StateProps => ({
  catalog: state.catalog,
  router: state.router
});

const promotionsOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataPromotions"
};

export default compose(
  connect<StateProps, OwnProps>(mapStateToProps) as any,
  graphql<GraphQLProps, OwnProps>(promotionsQuery, promotionsOptions)
)(Promotions as any) as any;

// export default PromotionsContainer;
