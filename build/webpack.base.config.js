const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './dist/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd 
          ? ExtractTextPlugin.extract({
            fallback:"vue-style-loader",
            use: ['css-loader']
          })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: isProd 
          ? ExtractTextPlugin.extract({
            fallback:"vue-style-loader",
            use: ['css-loader', 'less-loader']
          })
          : ['vue-style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  optimization: {
    minimize:true
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin('style.[chunkhash].css'),
        // new webpack.DefinePlugin({
        //   "process.env.VUE_ENV": require('../src/title-mixin')
        // })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
}
