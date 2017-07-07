import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import client from "./graphqlClient";
import catalog from "./modules/catalog/reducer";
import layout from "./modules/layout/reducer";
import product from "./modules/product/reducer";

const rootReducers = combineReducers({
  apollo: client.reducer(),
  catalog,
  layout,
  product,
  router: routerReducer
});

export default rootReducers;
