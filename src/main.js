import Vue from 'vue'
import App from './App.vue'

import HeroUI from "./index"

Vue.use(HeroUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
