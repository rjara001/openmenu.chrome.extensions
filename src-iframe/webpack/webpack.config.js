const path = require('path');

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
            use: [{
               loader: 'ts-loader',
               options: {
                   configFile: "../tsconfig.json"
               }
           }],
            exclude: /node_modules/,
         },
      ],
   }
};
