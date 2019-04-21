import Vue from 'vue'
import App from './index.vue'
import router from '../../router'
import store from '../../store'
import '../../assets/style/base.scss'
import '../../plugins/element';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
