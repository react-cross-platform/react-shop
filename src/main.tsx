import { polyfill } from "es6-promise";
import * as React from "react";
import { render } from "react-dom";
import initReactFastclick from "react-fastclick";
import { AppContainer } from "react-hot-loader";
import App from "./App";

import "common/styles/common.less";

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
    render(App);
  });
}
