import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Form from './views/Form'
import Visualizations from './views/Visualizations'
import Event from './views/Event'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '/visualizations',
    name: 'visualizations',
    component: Visualizations,
  }, {
    path: '/form',
    name: 'form',
    component: Form,
  }, {
    path: '/event',
    name: 'event',
    component: Event,
  }, {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: 'about' */ './views/About'),
  }, ],
})