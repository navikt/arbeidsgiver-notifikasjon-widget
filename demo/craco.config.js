const CracoLessPlugin = require("craco-less");
const {ProvidePlugin} = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig, {env, paths}) => ({
      ...webpackConfig,
      ...{
        plugins: [
          ...webpackConfig.plugins,
          new ProvidePlugin({
            Buffer: [require.resolve("buffer/"), "Buffer"],
          })
        ],
        resolve: {
          ...webpackConfig.resolve,
          fallback: {
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
          }
        }
      }
    }),
  },
  plugins: [{plugin: CracoLessPlugin}]
};
