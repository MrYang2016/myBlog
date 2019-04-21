import Vue from 'vue'
import Router from 'vue-router'
import AddDoc from './views/addDoc.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AddDoc
    },
    {
      path: '/addDoc',
      name: 'addDoc',
      component: AddDoc
    },
    {
      path: '/docList',
      name: 'docList',
      component: () => import(/* webpackChunkName: "about" */ './views/docList.vue')
    }
  ]
})
