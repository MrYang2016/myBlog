import Vue from 'vue'
import App from './login.vue'
import {Input, Button, Alert} from 'element-ui';

Vue.use(Input);
Vue.use(Button);
Vue.use(Alert);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
