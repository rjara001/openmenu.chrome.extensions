const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
   },
   plugins: [
      new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: ['src/*', 'src-iframe/*', 'src-pop/*'], // Clean the 'dist' directory before each build
       }),
    ],
};
