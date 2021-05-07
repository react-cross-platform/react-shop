// tslint:disable-next-line:no-reference
///<reference path="../node_modules/@types/node/index.d.ts" />

import { polyfill } from "es6-promise";
import * as React from "react";
import { render } from "react-dom";
import initReactFastclick from "react-fastclick";
import { AppContainer } from "react-hot-loader";
import App from "./App";

declare var module: { hot: any };

polyfill();
initReactFastclick();

const root = document.getElementById("app");

render(
  <AppContainer>
    <App />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept("./App", () => {
    render(App as any, null);
  });
}
