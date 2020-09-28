import Vue from 'vue'
import App from './App.vue'
import router from './router'

import element from 'network/element'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
