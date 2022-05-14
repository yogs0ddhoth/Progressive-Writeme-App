const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin ( // generate html and inject bundle.js
        { template: './index.html', title: 'Progressive-Writeme-App' }
      ),
      new InjectManifest( // create use sw.js to create service worker with WebpackPwaManifest
        { swSrc: './src-sw.js', swDest: 'src-sw.js' }
      ),
      new WebpackPwaManifest(
        { // generate manifest.js
          fingerprints: false,
          inject: true,
          name: 'Progressive-Writeme-App',
          short_name: 'PWA',
          description: 'Just another text editor',
          // background_color: '#ffffff',
          // theme_color: '#ffffff',
          crossorigin: 'use-credentials',
          start_url: './',
          publicPath: './',
          icons: [
            {
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
              destination: path.join('assets', 'icons')
            },
          ],
        }
      ),
    ],

    module: { // css loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        }
      ],
    },
  };
};
