<template>
  <div>
    <h1>商品编辑</h1>
    <br>
    <router-link :to="{name: 'product-manage-list'}">-> 商品列表</router-link>
    <br>
    <router-link :to="{name: 'product-manage-edit'}">-> 商品编辑</router-link>
    <br>
    <router-link :to="{name: 'product-manage-create'}">-> 商品创建</router-link>
  </div>
</template>

<script>
export default {};
</script>
