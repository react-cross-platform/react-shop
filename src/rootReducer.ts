import { IRouterReducer } from "@src/routes/interfaces";
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";

import { default as cart, ICartReducer } from "./modules/cart/reducer";
import { default as catalog, ICatalogReducer } from "./modules/catalog/reducer";
import { default as product, IProductReducer } from "./modules/product/reducer";

export interface IRootReducer {
  apollo: {};
  router: IRouterReducer;
  catalog: ICatalogReducer;
  product: IProductReducer;
  cart: ICartReducer;
}

const router = routerReducer;

const rootReducers = combineReducers({
  catalog,
  product,
  cart,
  router
});

export default rootReducers;
