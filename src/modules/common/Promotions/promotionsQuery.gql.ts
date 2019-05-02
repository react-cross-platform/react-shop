import gql from "graphql-tag";

const promotionsQuery = gql`
  query promotionsQuery {
    promotions {
      id
      text
      destinationUrl
      background
      mobileImage {
        id
        src
        width
        height
      }
    }
  }
`;
export default promotionsQuery;
