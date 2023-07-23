const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.js', // Entry point for your TypeScript code
  output: {
    path: path.resolve(__dirname, 'dist/src'),
    filename: 'bundle.js', // Output filename for the bundled extension
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
