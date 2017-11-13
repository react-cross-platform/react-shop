import { IProduct } from "../product/model";

export interface IAllProducts {
  filters: [IFilter];
  sorting: [ISort];
  products: IProduct[];
  found: number;
  total: number;
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
  icon?: string;
  iconColor?: string;
  resetUrl?: string;
  values: [IFilterValue];
}

export interface ISort {
  icon: string;
  name: string;
  isSelected: boolean;
  value: string;
}
