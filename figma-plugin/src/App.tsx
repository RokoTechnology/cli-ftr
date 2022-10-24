import {
  createHistory,
  createMemorySource,
  LocationProvider,
  RouteComponentProps,
  Router,
} from "@reach/router";
import React from "react";
import { getPluginData } from "./messages/plugin-data";
import PageComponents from "./pages/components";
import PageHome from "./pages/home";
import { dispatch, useStoreState } from "./state";
import "./styles/styles.css";

let source = createMemorySource("/");
let history = createHistory(source);

const Home = (props: RouteComponentProps) => (
  <div>
    <PageHome />
  </div>
);

const Components = (props: RouteComponentProps) => (
  <div>
    <PageComponents />
  </div>
);

const App = () => {
  const components = useStoreState("components");

  React.useEffect(() => {
    // Initially we try to load the components data from the current page
    window.onmessage = ({ data }) => {
      if (typeof data !== "string") {
        console.log("received message", data);

        switch (data.pluginMessage.type) {
          case "get-plugin-data-return":
            dispatch({
              type: "setAllComponents",
              payload: JSON.parse(data.pluginMessage.message),
            });
            break;
        }
      }
    };

    getPluginData(parent);
  }, []);

  return (
    <>
      <LocationProvider history={history}>
        <Router>
          <Home path="/" />
          <Components path="components" />
        </Router>
      </LocationProvider>
    </>
  );
};

export { App };
