import { ISubProduct } from "../product/model";

export interface ICartItem {
  id: number;
  price: number;
  oldPrice?: number;
  subProduct: ISubProduct;
  amount: number;
}

export interface ICart {
  id: number;
  items: ICartItem[];
}
