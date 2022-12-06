import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
Vue.use(VueRouter)

let allRoute = []

const context = require.context('./modules/', false, /\.js$/)
context
  .keys()
  .map(context)
  .forEach(({ default: moduleRoutes = {} }) => {
    allRoute = allRoute.concat(moduleRoutes)
  })

export const constantRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName login */ '@/views/login/index'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout
  }
]

allRoute = allRoute.concat(constantRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRoute
})

export default router
