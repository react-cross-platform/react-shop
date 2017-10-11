import { History, Location } from "history";

export enum Left {
  Close
}

export interface MyLocationState extends History.LocationState {
  modal?: boolean;
  animated?: boolean;
  title?: string;
}

export interface MyLocation extends Location {
  state: MyLocationState;
}

export interface IRouterReducer {
  location: MyLocation;
}

export interface MyHistory extends History {}

export interface IPage {
  match?: any;
  history: MyHistory;
  location: MyLocation;
}
