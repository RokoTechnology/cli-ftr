var configure = require("react-figma-webpack-config");

const config = configure();

module.exports = function (env, argv) {
  const configuration =
    env === "production" ? config("production") : config("development");

  const rules = [
    { ...configuration.module.rules[0] },
    {
      test: /\.css$/,
      use: [
        "style-loader",
        { loader: "css-loader", options: { importLoaders: 1 } },
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                require("tailwindcss")("./tailwind.config.js"),
                require("autoprefixer"),
                require("cssnano"),
              ],
            },
          },
        },
      ],
    },
    { ...configuration.module.rules[2] },
    { test: /\.svg$/, loader: [{ loader: "@svgr/webpack" }] },
  ];

  configuration.module.rules = rules;

  // console.log("final webpack config", JSON.stringify(configuration, null, 2));

  return configuration;
};
