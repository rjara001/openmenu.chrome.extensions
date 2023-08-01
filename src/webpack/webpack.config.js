const path = require('path');
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
   }
};
