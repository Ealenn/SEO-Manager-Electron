import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/HomePage')
    },
    {
      path: '/config',
      name: 'config-page',
      component: require('@/components/ConfigPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
