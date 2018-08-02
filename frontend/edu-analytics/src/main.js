// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import VueAutosuggest from 'vue-autosuggest'
import VueCharts from 'vue-chartjs'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueAutosuggest)
Vue.use(VueCharts)
// Vue.http.options.root = 'https://testing-app.cfapps.io'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
