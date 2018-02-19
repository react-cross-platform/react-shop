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
  image: IImage;
}

export interface ISubProduct {
  id: string;
  article: string;
  price: number;
  product: IProduct;
}

export interface IProduct {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  brand: IBrand;
  category: ICategory;
  images: [IImage];
  imagesWithColor: [IImage];
  subProducts: [ISubProduct];
  attributes: [IAttribute];
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IImage {
  id: string;
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
  // colorValue: string;
  // colorName: string;
  attributeValue?: IAttributeValue;
}

export interface ISubProduct {
  id: string;
  article: string;
  price: number;
  oldPrice: number;
  discount: number;
  attributes: [IAttribute];
}

export interface IAttribute {
  name: string;
  values: [IAttributeValue];
}

export interface IAttributeValue {
  id: number;
  name: string;
  value: string;
  description: string;
}
