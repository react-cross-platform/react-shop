import gql from "graphql-tag";

const brandQuery = gql`
  query brandQuery($id: Int) {
    brand(id: $id) {
      id
      name
    }
  }
`;
export default brandQuery;
