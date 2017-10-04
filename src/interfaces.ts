import { Location } from "history";
import { Dispatch as ReduxDispatch } from "redux";

import { IRootReducer } from "./rootReducer";

export interface IRouterReducer {
  location: Location;
}

export type Dispatch = ReduxDispatch<IRootReducer>;
