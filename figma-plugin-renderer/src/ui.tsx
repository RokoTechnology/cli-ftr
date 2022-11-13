import * as React from "react";
import { App } from "./App";

import { render } from "react-figma";
import "react-figma/rpc";

render(<App />);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
