import Vue from 'vue'
import App from './App.vue'
import router from './router'

import element from 'network/element'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)

import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', TreeTable)

// 富文本编辑器(已经停止更新)
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import VueAreaLinkage from 'vue-area-linkage';
import 'vue-area-linkage/dist/index.css'; 
Vue.use(VueAreaLinkage);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
