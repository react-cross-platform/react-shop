import { IRouterReducer } from "@src/routes/interfaces";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import client from "./graphqlClient";
import cart, { CartReducer } from "./modules/cart/reducer";
import catalog, { ICatalogReducer } from "./modules/catalog/reducer";
import product, { IProductReducer } from "./modules/product/reducer";

export interface IRootReducer {
  router: IRouterReducer;
  catalog: ICatalogReducer;
  product: IProductReducer;
  cart: CartReducer;
}

const router = routerReducer;

const rootReducers = combineReducers({
  catalog,
  product,
  cart,
  router
});

export default rootReducers;
