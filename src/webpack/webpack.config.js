const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
      extensions: [
         '.ts',
         '.tsx',
         '.js',
         '.jsx',
         '.json'
     ],
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
