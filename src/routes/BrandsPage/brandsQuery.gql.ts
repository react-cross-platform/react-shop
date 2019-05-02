import gql from "graphql-tag";

const brandsQuery = gql`
  query brandsQuery {
    brands {
      id
      name
      alias
      description
      image {
        src
      }
    }
  }
`;
export default brandsQuery;
