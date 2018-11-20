import Vue from 'vue'
import App from './App.vue'
import router from "./routers"
import HeroUI from "./index"

Vue.use(HeroUI);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
