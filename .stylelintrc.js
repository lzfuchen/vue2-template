module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-config-standard-scss'
  ],
  overrides: [
    {
      files: ['**/*.(less|css|scss|html|vue)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  rules: {
    'scss/dollar-variable-pattern': null,
    'selector-class-pattern': null,
    'string-quotes': 'single',
    'declaration-block-trailing-semicolon': null,
    'alpha-value-notation': null,
    'color-function-notation': null
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*']
}
