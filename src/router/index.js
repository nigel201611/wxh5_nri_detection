import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    alias: '/pages/home/main'
  }]
})
