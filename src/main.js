import 'babel-polyfill'
import Vue from 'vue'
import MainPlugin from './plugins/main-plugin';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(MainPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
