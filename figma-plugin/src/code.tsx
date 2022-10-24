import { setupMainThread } from "react-figma/rpc";

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = (msg) => {
  // console.log("received message from ui", msg);
  switch (msg.type) {
    case "get-plugin-data":
      console.log("getting plugin data");
      figma.ui.postMessage({
        type: "get-plugin-data-return",
        message: figma.currentPage.getPluginData("root"),
      });
      break;
    case "set-plugin-data":
      console.log("getting plugin data");
      figma.currentPage.setPluginData("root", msg.message),
        figma.ui.postMessage({
          type: "set-plugin-data-return",
          message: "plugin data set successfully",
        });
      break;
    case "notify":
      figma.notify(msg.message, {
        error: msg.error,
      });
      break;
    case "cancel":
      figma.closePlugin();
      break;
  }
};

setupMainThread();
