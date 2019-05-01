import gql from "graphql-tag";

const updateCartMutation = gql`
  mutation updateCartMutation(
    $phone: String!
    $email: String
    $firstName: String
    $lastName: String
    $city: String
    $address: String
    $comment: String
    $finish: Boolean
  ) {
    updateCart(
      phone: $phone
      email: $email
      firstName: $firstName
      lastName: $lastName
      city: $city
      address: $address
      comment: $comment
      finish: $finish
    ) {
      cart {
        id
        phone
        email
        firstName
        lastName
        city
        address
        comment
      }
    }
  }
`;
export default updateCartMutation;
