import { Location } from "history";
import { Dispatch as ReduxDispatch } from "redux";

import { IRootReducer } from "./rootReducer";

export type Dispatch = ReduxDispatch<IRootReducer>;
