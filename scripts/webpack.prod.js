const { resolve } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackCommonConfig = require('./webpack.common')
const { PROJECT_NAME, ENABLE_ANALYZE, PROJECT_ROOT, BASE_URL } = require('./utils/constants.js')

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    clean: true,
    publicPath: BASE_URL,
    path: resolve(PROJECT_ROOT, './dist'),
    filename: 'js/[name].[contenthash:7].js',
    chunkFilename: 'js/async.[name].[contenthash:7].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: `'${BASE_URL}'`
      }
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true, //在不同的js中引用多个相同的css时，引用先后顺序不一致会触发webpack警告，设置true忽略警告
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[name].[contenthash:7].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      templateParameters: {
        BASE_URL
      },
      template: resolve(PROJECT_ROOT, './public/index.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          context: resolve(PROJECT_ROOT, './public'),
          from: '**/*',
          to: resolve(PROJECT_ROOT, './dist'),
          toType: 'dir',
          globOptions: {
            ignore: ['**/.DS_Store', '**/*.html']
          }
        }
      ]
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        corejs: {
          test: /[\\/]node_modules[\\/]core-js/,
          name: 'core-js',
          priority: 30
        },
        elementUI: {
          name: 'elementUI',
          priority: 29,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 28,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        asyncVendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: 26,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            // 避免服务端不支持@
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  }
})
