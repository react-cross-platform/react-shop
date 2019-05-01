import gql from "graphql-tag";

const updateCartItemMutation = gql`
  mutation updateCartItemMutation($id: Int!, $amount: Int!) {
    updateCartItem(id: $id, amount: $amount) {
      cartItem {
        id
        amount
      }
    }
  }
`;
export default updateCartItemMutation;
