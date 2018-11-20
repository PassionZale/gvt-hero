import Vue from 'vue'
import App from './App.vue'
import routers from "./routers"

import HeroUI from "./index"

Vue.use(HeroUI);

new Vue({
  el: '#app',
  router: routers,
  render: h => h(App),
})
