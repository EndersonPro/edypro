import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import store from './store/index'
import router from './route/routes'

Vue.use(Vuetify, {
  theme: {
    primary: "#F4511E",
    secondary: "#E64A19",
    accent: "#455A64",
    error: "#f44336",
    warning: "#ffeb3b",
    info: "#2196f3",
    success: "#4caf50"
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
