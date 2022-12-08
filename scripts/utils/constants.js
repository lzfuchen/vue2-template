const path = require('path')
const pkg = require('../../package.json')

const __DEV__ = process.env.NODE_ENV !== 'production'
const PROJECT_ROOT = path.resolve(__dirname, '../../')
const PROJECT_NAME = pkg.name
const DEFAULT_PORT = 8080
const IP = require('ip').address()

module.exports = { __DEV__, PROJECT_ROOT, PROJECT_NAME, DEFAULT_PORT, IP }
