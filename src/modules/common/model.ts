import { IAttribute, IAttributeValue } from "../product/model";
export interface IImage {
  id: string;
  src: string;
  attributeValue: IAttributeValue;
}
