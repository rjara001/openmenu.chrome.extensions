const path = require('path');
module.exports = {
   entry: {
      pop: path.resolve(__dirname, "..", "index.settings.ts")
   },
   devtool: 'source-map',
   output: {
      path: path.join(__dirname, "../../dist/pop"),
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
