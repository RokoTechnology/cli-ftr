const getPluginData = (p: Window) => {
  parent.postMessage({ pluginMessage: { type: "get-plugin-data" } }, "*");
};

const setPluginData = (p: Window, d: object) => {
  return p.postMessage(
    {
      pluginMessage: {
        type: "set-plugin-data",
        message: JSON.stringify(d),
      },
    },
    "*"
  );
};

export { getPluginData, setPluginData };
