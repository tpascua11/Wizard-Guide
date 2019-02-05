const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-3-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },

  resolve: {
    alias: {
     	ASSET : path.resolve(__dirname, 'assets/'),
      ROOT  : path.resolve(__dirname, 'src/'),
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'build')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'production-dependencies',
      filename: 'production-dependencies.bundle.js'
    }),
    /*
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        output: {
          comments: false,
          beautify: false,
        }
      }
    })
    */
  ]

      };
