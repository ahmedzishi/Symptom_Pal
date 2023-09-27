import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import VModal from 'vue-js-modal'
import { firestorePlugin } from 'vuefire'
import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: process.env.IgCbqGFveZDvyMjllwaX,
  autoTracking: {
    page: true
  },
  router
})
Vue.use(VModal, firestorePlugin)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
