import gql from "graphql-tag";

const addCartItemMutation = gql`
  mutation addCartItemMutation($subProductId: Int!, $attributeValueIds: [Int]) {
    addCartItem(subProductId: $subProductId, attributeValueIds: $attributeValueIds) {
      cartItem {
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
        id
        price
        amount
        attributeValues {
          id
          name
          value
        }
        subProduct {
          id
          article
          price
          oldPrice
          product {
            id
            name
            brand {
              id
              name
            }
            images(size: SM, withColorOnly: true) {
              id
              src
              width
              height
              isTitle
              attributeValue {
                id
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export default addCartItemMutation;
