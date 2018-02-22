/* eslint-disable no-param-reassign */
import webpack from 'webpack'
import React from 'react'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'

// console.log(envToBeInjected)
// const qaenv = process.env.NODE_ENV_QA;
module.exports = function (webpackConfig, env) {
  webpackConfig.module.loaders[0].exclude.push(/\.ejs$/)
  // 对roadhog默认配置进行操作，比如：
  if (env === 'production') {
    webpackConfig.output.filename = '[name].[chunkhash].js'
    webpackConfig.output.chunkFilename = '[chunkhash].async.js'
    webpackConfig.plugins[3] = new ExtractTextPlugin('[contenthash:20].css')
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        template: 'ejs!src/index.ejs',
        inject: true,
        minify: { collapseWhitespace: true },
        production: true,
      }),
      new WebpackChunkHash({ algorithm: 'md5' }),
    )
    webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  } else {
    React.Perf = require('react-addons-perf');
    webpackConfig.module.loaders.push({
      test: require.resolve('react-addons-perf'),
      loader: 'expose?Perf',
    })
  }
  return webpackConfig
}
