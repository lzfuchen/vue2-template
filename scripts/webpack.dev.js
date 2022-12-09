const webpack = require('webpack')
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpackCommonConfig = require('./webpack.common')
const { PROJECT_ROOT, PROJECT_NAME, DEFAULT_PORT, IP, BASE_URL } = require('./utils/constants.js')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  output: {
    clean: true,
    pathinfo: false,
    publicPath: '/',
    path: resolve(PROJECT_ROOT, './dist'),
    filename: 'js/[name].js'
  },
  stats: 'errors-warnings',
  devServer: {
    allowedHosts: 'all',
    static: {
      directory: resolve(PROJECT_ROOT, './dist')
    },
    host: '0.0.0.0',
    port: DEFAULT_PORT,
    historyApiFallback: true,
    hot: true,
    client: {
      logging: 'none',
      overlay: {
        errors: true
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      templateParameters: {
        BASE_URL: '/'
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
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `${PROJECT_NAME} is running at:
                                -Local:   http://localhost:${DEFAULT_PORT}
                                -Network: http://${IP}:${DEFAULT_PORT}`
        ],
        clearConsole: true,
        additionalFormatters: [],
        additionalTransformers: []
      }
    })
  ]
})
