import Vue from 'vue'
import SvgIcon from './SvgIcon'

const req = require.context('../assets/icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

Vue.component('svg-icon', SvgIcon)
