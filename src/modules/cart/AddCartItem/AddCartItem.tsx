import { CartQuery } from "@src/generated/graphql";
import { Aux } from "@src/modules/common/utils";
import update from "immutability-helper";
import Lottie from "lottie-react-web";
import React from "react";
import { graphql } from "react-apollo";

import { DataCart } from "../Cart/Cart";
import cartQuery from "../Cart/cartQuery.gql";
import addCartItemMutation from "./addCartItemMutation.gql";

const styles = require("./styles.css");

interface OwnProps {
  subProductId: number;
  attributeValueIds?: number[];
}

interface GraphQLProps {
  submit: () => CartQuery.Items;
}

interface Props extends OwnProps, GraphQLProps {}

interface State {
  loading: boolean;
}

class AddCartItem extends React.Component<Props, State> {
  state = {
    loading: false
  };

  addCartItem = () => {
    const { submit } = this.props;
    this.setState({ loading: true });
    submit();
  };

  render() {
    const { submit } = this.props;
    return (
      <Aux>
        <div onClick={this.addCartItem}>Купить</div>
        {this.state.loading && (
          <div style={{ position: "fixed", bottom: -225, right: -200 }}>
            <Lottie
              height="200%"
              options={{
                autoplay: true,
                loop: false,
                animationData: require("./added.json")
              }}
            />
          </div>
        )}
      </Aux>
    );
  }
}

// const options: OperationOption<OwnProps, GraphQLProps> = {
const options = {
  props: ({ ownProps, mutate }) => {
    const { subProductId, attributeValueIds } = ownProps;
    return {
      submit: () => {
        mutate!({
          variables: {
            subProductId,
            attributeValueIds
          },
          update: (
            store,
            // props: IAddCartItem
            props: any // FIXME
          ) => {
            const {
              data: {
                addCartItem: { cartItem }
              }
            } = props;
            const data: DataCart = store.readQuery({ query: cartQuery });
            if (!data.cart) {
              data.cart = cartItem.cart;
              data.cart!.items = [];
            }
            data.cart!.items.push(cartItem);
            store.writeQuery({ query: cartQuery, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, OwnProps>(addCartItemMutation, options as any)(
  AddCartItem
) as any;
