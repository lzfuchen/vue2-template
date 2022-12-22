const { resolve } = require('path')
const { PROJECT_ROOT, __DEV__ } = require('./utils/constants')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const getCssLoaders = require('./utils/getCssLoaders')

module.exports = {
  context: PROJECT_ROOT,
  entry: { app: resolve(PROJECT_ROOT, './src/main.js') },
  resolve: {
    extensions: ['.js', 'jsx', '.vue', '.json'],
    alias: {
      '@': resolve(PROJECT_ROOT, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve(PROJECT_ROOT, './src')]
      },
      {
        test: /\.css$/,
        use: getCssLoaders(0)
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: { sourceMap: __DEV__ ? true : false }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [resolve(PROJECT_ROOT, './src/assets/styles/variables.scss')]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: { sourceMap: __DEV__ ? true : false }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [resolve(PROJECT_ROOT, './src/assets/styles/variables.less')]
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'stylus-loader',
            options: { sourceMap: __DEV__ ? true : false }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [resolve(PROJECT_ROOT, './src/assets/styles/variables.styl')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.svg$/,
        include: [resolve(PROJECT_ROOT, './src/assets/icons')],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), new webpack.ProgressPlugin()]
}
