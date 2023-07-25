const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    // 'view-selector': './src/view-selector/view-selector.js',
    index: './src/index.jsx',
    SetupScreen: './src/setup/SetupScreen.jsx',
    background: './src/background/background.js',
    // setup: './src/setup/setup.js',
    popup: './src/popup/popup.js',
  },

  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpeg|jpg|svg)$/, use: 'file-loader' },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        //relative paths allowed
        { from: './src/manifest.json' },
        { from: './src/index.html' },
        { from: './src/popup/popup.html' },
        { from: './src/setup/setup.html', to: 'setup.html' },
        { from: './src/media/', to: 'media' },
      ],
    }),
  ],
};
