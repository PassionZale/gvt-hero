import Layout from "../views/common/layouts.vue"
import Container from "../views/common/container.vue"

import orderList from "../views/order/List.vue"
import orderEdit from "../views/order/Edit.vue"
import orderCreate from "../views/order/Create.vue"

const orderRoutes = {
  path: "/order",
  name: "order",
  component: Layout,
  meta: { title: "订单综合" },
  children: [
    {
      path: "manage",
      name: "order-manage", 
      redirect: { name: "order-manage-list" },
      component: Container, 
      meta: { title: "订单管理" },
      children: [
        {
          path: "list",
          name: "order-manage-list",
          component: orderList,
          meta: { title: "订单列表" }
        },
        {
          path: "edit",
          name: "order-manage-edit",
          component: orderEdit,
          meta: { title: "订单编辑" }
        },
        {
          path: "create",
          name: "order-manage-create",
          component: orderCreate,
          meta: { title: "订单创建" }
        },
      ]
    }
  ],

}

export default orderRoutes;
