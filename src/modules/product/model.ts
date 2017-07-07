import { gql } from "react-apollo/lib";

export interface ICurrentDataProduct {
  subProductId: string;
  colorId: number;
}

export interface IParentCategory {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  alias: string;
  products: [IProduct];
  parent: IParentCategory;
}

export interface IProduct {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  brand: IBrand;
  category: ICategory;
  images: [IImageWithColor];
  imagesWithColor: [IImageWithColor];
  subProducts: [ISubProduct];
  attributes: [IAttribute];
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IImage {
  id: number;
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
}

export interface IImageWithColor extends IImage {
  colorValue: string;
  colorName: string;
}

export interface ISubProduct {
  id: string;
  article: string;
  price: string;
  oldPrice: string;
  discount: string;
  attributes: [IAttribute];
}

export interface IAttribute {
  name: string;
  values: [IValue];
}

export interface IValue {
  id: number;
  name: string;
  value: string;
  description: string;
}

export interface ICategories {
  products: [IProduct];
}

export const PRODUCT_QUERY = gql`
  query product($id: Int) {
    product(id: $id) {
      id
      name
      shortDescription
      description
      brand {
        id
        name
      }
      category {
        id
        name
      }
      images {
        id
        src
        width
        height
        colorValue
        colorName
        isTitle
      }
      subProducts {
        id
        article
        price
        oldPrice
        discount
        attributes {
          name
          values {
            id
            name
            value
            description
          }
        }
      }
      attributes {
        id
        name
        values {
          name
          description
        }
      }
    }
  }
`;
