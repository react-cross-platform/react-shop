import { ICategory } from "../product/model";

export interface ILayout {}

export interface IFlatPage {
  id: string;
  name: string;
  url: string;
  content: string;
  templateName: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  dateUpdated: string;
  isActive: boolean;
  image: null;
}
