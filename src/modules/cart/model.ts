import { ISubProduct } from "../product/model";

export interface Checkout {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  comment: string;
}

export interface ICart extends Checkout {
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
