const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    answer: './src/answer/answer.js',
    index: './src/index.jsx',
    setup: './src/setup/setup.js',
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
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: (style) =>
                document.querySelector('#mirkusve-shadow-host').shadowRoot
                .appendChild(style),
            },
          },
          'css-loader',
        ],
      },
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
        //not using file loader because it adds leetcodes url to the image paths
        //eg) import path from './logo.png' gives you 'https://leetcode.com...logo.png' -> error
        { from: './src/media/', to: 'media' },
      ],
    }),
  ],
};
