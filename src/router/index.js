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
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/dashboard/index.vue'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/dashboard/index.vue'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  }
]

allRoute = allRoute.concat(constantRoutes)

console.log('----->', allRoute)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRoute
})

export default router
