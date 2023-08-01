const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
   },
   plugins: [
      new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['src/*', 'src-iframe/*', 'src-pop/*'], // Clean the 'dist' directory before each build
    }),
    ],
};
