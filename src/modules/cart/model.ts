import { ISubProduct } from "../product/model";

export interface ICheckout {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  comment: string;
}

export interface ICart extends ICheckout {
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
