const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   entry: {
      content: path.resolve(__dirname, "..", "content.ts"),
      background: path.resolve(__dirname, "..", "background.ts")
   },
   devtool: 'source-map',
   output: {
      path: path.join(__dirname, "../../dist/src"),
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
