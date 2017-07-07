import { gql } from "react-apollo/lib";
import { ICategory } from "../product/model";

export interface ILayout {
  openCatalog: boolean;
  openMenu: boolean;
}

export interface ICategories {
  categories: [ICategory];
}

export const CATALOG_QUERY = gql`
  query categories {
    categories {
      id
      name
      alias
      parent {
        id
      }
      image
    }
  }
`;

export interface IFlatPage {
  id: string;
  name: string;
  url: string;
  content: string;
  templateName: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  dateUpdated: string;
  isActive: boolean;
  image: null;
}

export const FLATPAGES_QUERY = gql`
  query flatpages {
    flatPages {
      id
      name
      content
    }
  }
`;
