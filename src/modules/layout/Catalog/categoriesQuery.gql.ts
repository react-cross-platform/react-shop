import gql from "graphql-tag";

const categoriesQuery = gql`
  query categoriesQuery {
    categories {
      id
      name
      alias
      parent {
        id
      }
      image {
        src
      }
    }
  }
`;
export default categoriesQuery;
