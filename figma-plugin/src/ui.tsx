import * as React from "react";
import { createRoot } from "react-dom/client";
import "react-figma/rpc";
import { App } from "./App";

const container = document.getElementById("react-ui");
const root = createRoot(container);
root.render(<App />);
