import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import store from './store/index'
import router from './route/routes'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
