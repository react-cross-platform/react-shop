import { IProduct } from "../product/model";

export interface IAllProduct {
  total: number;
  products: [IProduct];
}
