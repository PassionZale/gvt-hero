<template>
  <div>
    <h1>品牌列表</h1>
    <br>
    <router-link :to="{name: 'product-brand-list'}">-> 品牌列表</router-link>
    <br>
    <router-link :to="{name: 'product-brand-edit'}">-> 品牌编辑</router-link>
    <br>
    <router-link :to="{name: 'product-brand-create'}">-> 品牌创建</router-link>
  </div>
</template>

<script>
export default {};
</script>
