import { ISubProduct } from '../product/model';

export interface ICart {
  id: number;
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  price: number;
  oldPrice?: number;
  subProduct: ISubProduct;
  amount: number;
  cart?: ICart;
}
