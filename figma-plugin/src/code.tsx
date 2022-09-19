import { setupMainThread } from "react-figma/rpc";

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  // console.log("received message from ui", msg);
  switch (msg.type) {
    // case "render-some":
    //   figma.ui.postMessage({
    //     type: "feedback",
    //     message: "rendered some complete",
    //   });
    //   break;
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
