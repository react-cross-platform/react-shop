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
  image: IImages;
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
  images: [IImages];
  imagesWithColor: [IImages];
  subProducts: [ISubProduct];
  attributes: [IAttribute];
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IImages {
  id: string;
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
  colorValue: string;
  colorName: string;
}

export interface ISubProduct {
  id: string;
  article: string;
  price: number;
  oldPrice: number;
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
