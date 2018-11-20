import Layout from "../views/common/layouts.vue"
import Container from "../views/common/container.vue"
import manageList from "../views/product/manage/List.vue"
import manageEdit from "../views/product/manage/Edit.vue"
import manageCreate from "../views/product/manage/Create.vue"

import brandList from "../views/product/brand/List.vue"
import brandEdit from "../views/product/brand/Edit.vue"
import brandCreate from "../views/product/brand/Create.vue"


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
          component: manageList,
          meta: { title: "商品列表" }
        },
        {
          path: "edit",
          name: "product-manage-edit",
          component: manageEdit,
          meta: { title: "商品编辑" }
        },
        {
          path: "create",
          name: "product-manage-create",
          component: manageCreate,
          meta: { title: "商品创建" }
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
          component: brandList,
          meta: { title: "品牌列表" }
        },
        {
          path: "create",
          name: "product-brand-create",
          component: brandCreate,
          meta: { title: "品牌创建" }
        },
        {
          path: "edit",
          name: "product-brand-edit",
          component: brandEdit,
          meta: { title: "品牌编辑" }
        },
      ]
    },
  ]
}

export default productRoutes;