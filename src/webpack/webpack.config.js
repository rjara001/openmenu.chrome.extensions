const path = require('path');
<<<<<<< HEAD
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
=======

module.exports = {
  devtool: 'source-map',
  entry: '/dist/src/content.js', // Entry point for your TypeScript code
  output: {
    path: path.resolve(__dirname, '../../dist/src'),
    filename: 'index.js', // Output filename for the bundled extension
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
>>>>>>> 747bc9c7aded953d2029ed550fdf9f203950b6ec
