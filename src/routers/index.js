import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../views/common/layouts.vue"
import productRoutes from "./product"

Vue.use(VueRouter)

const routerMap = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: {
      name: "console"
    },
    meta: {
      title: "首页"
    },
    children: [{
      path: "console",
      name: "console",
      meta: {
        title: "我的工作台",
        icon: "icon-mywork",
      }
    }]
  }, 

  productRoutes,

]

export default new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
