const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: module => module.nameForCondition &&
            /\.(css|s[ac]ss)$/.test(module.nameForCondition()) &&
            !/^javascript/.test(module.type),
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: chunk => (
            chunk.resource &&
            /\.js$/.test(chunk.resource) &&
            /node_modules/.test(chunk.resource)
          ),
          chunks: 'initial',
          name: 'vendors',
        },
      }
    },
    runtimeChunk: { name: 'manifest' }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
})