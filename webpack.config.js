const path = require("path");
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.ts",
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.js',
    // globalObject: 'this',
    library: 'fiber_template_engine',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': `'${process.env.NODE_ENV}'`
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
