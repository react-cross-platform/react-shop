import { IRouterReducer } from "../interfaces";

export interface IPage extends IRouterReducer {
  match: any;
  history: any;
  location: any;
}
