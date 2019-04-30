import gql from "graphql-tag";

const flatpagesQuery = gql`
  query flatpagesQuery {
    flatpages {
      id
      name
      content
    }
  }
`;
export default flatpagesQuery;
