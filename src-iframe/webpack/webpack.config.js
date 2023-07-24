const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   entry: {
      iframe: path.resolve(__dirname, "..", "index.html.ts"),
   },
   devtool: 'source-map',
   output: {
      path: path.join(__dirname, "../../dist/iframe"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   }
};
