import { IProduct } from "../product/model";

export interface IAllProducts {
  total: number;
  products: [IProduct];
  filters: [IFilter];
}

export interface IFilterValue {
  id: number;
  name: string;
  isChecked: boolean;
  filterValue: string;
  help: string;
  count: number;
  position: number;
  url: string;
  value: string;
}

export interface IFilter {
  id: number;
  name: string;
  type: string;
  isColor: boolean;
  help: string;
  position: number;
  hasChecked: boolean;
  resetUrl?: string;
  values: [IFilterValue];
}

export interface ISort {
  icon: string;
  name: string;
  isSelected: boolean;
  value: string;
}
