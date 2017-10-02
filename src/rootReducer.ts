import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import client from "./graphqlClient";
import { IRouterReducer } from "./interfaces";
import { default as catalog, ICatalogReducer } from "./modules/catalog/reducer";
import { default as product, IProductReducer } from "./modules/product/reducer";

const apollo: any = client.reducer();
const router: any = routerReducer;

export interface IRootReducer {
  apollo: any;
  router: IRouterReducer;
  catalog: ICatalogReducer;
  product: IProductReducer;
}

const rootReducers = combineReducers({
  apollo,
  catalog,
  product,
  router
});

export default rootReducers;
