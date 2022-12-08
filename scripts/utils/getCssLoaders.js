const { __DEV__ } = require('./constants.js')
const MiniCssExtractLoader = require('mini-css-extract-plugin')

module.exports = importLoaders => {
  return [
    __DEV__ ? 'style-loader' : MiniCssExtractLoader.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        // 前面使用的每一个 loader 都需要指定 sourceMap 选项 生产环境关闭css sourcemap
        sourceMap: __DEV__ ? true : false,
        // 指定在 css-loader 前应用的 loader 的数量
        importLoaders: importLoaders + 1
      }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: __DEV__ ? true : false }
    }
  ]
}
