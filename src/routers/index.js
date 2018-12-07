import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../views/common/layouts.vue"
import productRoutes from "./product"
import orderRoutes from "./order"
import Error403 from "../views/common/403.vue"
import Error404 from "../views/common/404.vue"
import Error500 from "../views/common/500.vue"


Vue.use(VueRouter)

const routerMap = [{
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
      component: import("../views/console/Index.vue").default,
      meta: {
        title: "我的工作台",
        icon: "icon-mywork",
      }
    }]
  },

  {
    path: "/403",
    name: "403",
    component: Error403
  },

  {
    path: "/404",
    name: "404",
    component: Error404
  },

  {
    path: "/500",
    name: "500",
    component: Error500
  },

  productRoutes,

  orderRoutes,

  {
    path: "*",
    redirect: { name: "404" }
  }

]

export default new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routerMap
})
