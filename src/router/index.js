import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let allRoute = []

const context = require.context('./modules/', false, /\.js$/)
context
  .keys()
  .map(context)
  .forEach(({ default: moduleRoutes = {} }) => {
    allRoute = allRoute.concat(moduleRoutes)
  })

export const constantRoutes = []

allRoute = allRoute.concat(constantRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRoute
})

export default router
