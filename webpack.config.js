const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",              // твоя точка входа
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  mode: "development",              // или "production"
   plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"   // твой шаблон html
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: "babel-loader"        // уже работает с твоим .babelrc
      },
      {
        test: /\.css$/,            
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    open: true,
    hot: true,
    liveReload: false
  }
};
