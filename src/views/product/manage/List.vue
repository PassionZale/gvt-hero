<template>
  <div>
    <h1>商品列表</h1>
    <br>
    <router-link :to="{name: 'product-manage-list'}">-> 商品列表</router-link>
    <br>
    <router-link :to="{name: 'product-manage-edit'}">-> 商品编辑</router-link>
    <br>
    <router-link :to="{name: 'product-manage-create'}">-> 商品创建</router-link>

    <br>
    <button type="button" @click.prevent="click">品牌创建</button>
  </div>
</template>

<script>
export default {
  methods: {
    click() {
      window.location.hash = "/product/brand/create";
    }
  }
};
</script>
