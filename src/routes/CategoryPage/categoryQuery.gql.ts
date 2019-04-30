import gql from "graphql-tag";

const categoryQuery = gql`
  query categoryQuery($id: Int) {
    category(id: $id) {
      id
      name
    }
  }
`;
export default categoryQuery;
