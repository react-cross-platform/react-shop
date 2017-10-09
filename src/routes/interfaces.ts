import { History, Location } from "history";

import { IRouterReducer } from "../interfaces";

export interface IPage extends IRouterReducer {
  match?: any;
  history: History;
  location: Location;
}
