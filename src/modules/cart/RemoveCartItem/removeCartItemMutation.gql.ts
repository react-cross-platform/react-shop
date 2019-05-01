import gql from "graphql-tag";

const removeCartItemMutation = gql`
  mutation removeCartItemMutation($id: Int!) {
    removeCartItem(id: $id) {
      totalPrice
    }
  }
`;

export default removeCartItemMutation;
