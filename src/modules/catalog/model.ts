import { IProduct } from "../product/model";

export interface ICatalog {
  viewedProductIds: string[];
  viewedCategoryIds: string[];
  showOnlyViewed: boolean;
}

export interface IAllProduct {
  total: number;
  products: [IProduct];
}
