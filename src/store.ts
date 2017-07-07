import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import client from "./graphqlClient";
import history from "./history";
import rootReducer from "./rootReducer";

const initialState = {};

const middlewares = [thunk, routerMiddleware(history), client.middleware()];
if (process.env.DEBUG) {
  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
    typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
