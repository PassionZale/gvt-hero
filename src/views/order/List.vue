<template>
  <div>
    <h1>订单列表</h1>
    <br>
    <router-link :to="{name: 'order-manage-list'}">-> 订单列表</router-link>
    <br>
    <router-link :to="{name: 'order-manage-edit'}">-> 订单编辑</router-link>
    <br>
    <router-link :to="{name: 'order-manage-create'}">-> 订单创建</router-link>

    <br>
    <button type="button" @click.prevent="click">品牌创建</button>
  </div>
</template>

<script>
export default {
  methods: {
    click() {
      // window.location.href = "http://localhost:8081/#/product/brand/create";
      window.location.hash = "/product/brand/create";
    }
  }
};
</script>
