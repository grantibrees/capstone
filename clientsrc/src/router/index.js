import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Home from '../views/Home.vue'
// @ts-ignore

import Session from '../views/Session.vue'
// @ts-ignore
import Dashboard from '../views/Dashboard.vue'
// @ts-ignore
import SessionCreate from '../views/SessionCreate.vue'

// @ts-ignore
import { authGuard } from "@bcwdev/auth0-vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // @ts-ignore
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: authGuard
  },
  {

    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/session',
        name: 'Session',
        component: Session
      },
      {
        path: '/session/create',
        name: 'SessionCreate',
        component: SessionCreate
      },
      {
        path: '/session/:code',
        name: 'SessionUnique',
        component: Session
      },

    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
