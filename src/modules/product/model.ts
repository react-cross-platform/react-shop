export interface ICurrentProduct {
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
  image: IImage;
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

export interface ICategories {
  products: [IProduct];
}
