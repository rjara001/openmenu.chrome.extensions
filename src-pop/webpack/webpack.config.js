const path = require('path');
module.exports = {
   entry: {
      pop: path.resolve(__dirname, "..", "index.settings.ts")
      , tabs: path.resolve(__dirname, "..", "tabs.ts")
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
