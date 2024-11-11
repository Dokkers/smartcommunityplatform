import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigateView from '@/views/NavigateView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'navigate',
    component: NavigateView
  },
  {
    path: '/ecology',
    name: 'ecology',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ecology/EcologyView.vue')
  },
  {
    path: '/ecology/schema',
    name: 'schema',
    component: () => import(/* webpackChunkName: "about" */ '../views/ecology/SchemaView.vue')
  },
  {
    path: '/text',
    name: 'text',
    component: () => import(/* webpackChunkName: "about" */ '../views/TextView.vue')
  },
  // {
  //   path: '/ecology/gis-graph',
  //   name: 'GisView',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ecology/GisShow.vue')
  // },
  // {
  //   path: '/ecology/analysis',
  //   name: 'AnalysisView',
  //   component: () => import(/* webpackChunkName: "about" */ '../components/ecology/KnowledgeShow.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
