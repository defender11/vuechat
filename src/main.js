import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import BootstrapInit from './bootstrap.js'

new Vue({
  render: h => h(App),
}).$mount('#app')
