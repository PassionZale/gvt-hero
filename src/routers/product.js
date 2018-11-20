import Layout from "../views/common/layouts.vue"
import Container from "../views/common/container.vue"

const productRoutes =   {
  path: "/product",
  name: "product",
  component: Layout,
  meta: { title: "商品综合" },
  children: [
    // 商品管理
    { 
      path: "manage",
      name: "product-manage", 
      redirect: { name: "product-manage-list" },
      component: Container, 
      meta: { title: "商品管理" },
      children: [
        {
          path: "list",
          name: "product-manage-list",
          component: require("../views/product/manage/List.vue"),
          meta: { title: "商品列表" }
        },
        {
          path: "create",
          name: "product-manage-create",
          component: require("../views/product/manage/Create.vue"),
          meta: { title: "商品创建" }
        },
        {
          path: "edit",
          name: "product-manage-edit",
          component: require("../views/product/manage/Edit.vue"),
          meta: { title: "商品编辑" }
        },
      ]
    },
    // 品牌管理
    { 
      path: "brand",
      name: "product-brand", 
      redirect: { name: "product-brand-list" },
      component: Container, 
      meta: { title: "品牌管理" },
      children: [
        {
          path: "list",
          name: "product-brand-list",
          component: require("../views/product/brand/List.vue"),
          meta: { title: "品牌列表" }
        },
        {
          path: "create",
          name: "product-brand-create",
          component: require("../views/product/brand/Create.vue"),
          meta: { title: "品牌创建" }
        },
        {
          path: "edit",
          name: "product-brand-edit",
          component: require("../views/product/brand/Edit.vue"),
          meta: { title: "品牌编辑" }
        },
      ]
    },
  ]
}

export default productRoutes;