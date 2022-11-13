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
import { dispatch } from "./state";
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
  React.useEffect(() => {
    // Initially we try to load the components data from the current page

    const handleUIMessage = ({ data }) => {
      if (typeof data !== "string") {
        switch (data.pluginMessage.type) {
          case "get-plugin-data-return":
            console.log("received sync data from figma", data);
            dispatch({
              type: "setAllComponents",
              payload: JSON.parse(data.pluginMessage.message),
            });
            break;
        }
      }
    };

    window.addEventListener("message", handleUIMessage);
    getPluginData(parent);

    return () => {
      window.removeEventListener("message", handleUIMessage);
    };
  }, []);

  return (
    <>
      <LocationProvider history={history}>
        <Router className="h-full">
          <Home path="/" />
          <Components path="components" />
        </Router>
      </LocationProvider>
    </>
  );
};

export { App };
