const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "admin",
          filename: "remoteEntry.js",
          exposes: {
            "./App": "./src/App",
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            "react-dom": { singleton: true, requiredVersion: false },
          },
        })
      );

      webpackConfig.output.publicPath = "auto";
      return webpackConfig;
    },
  },
};