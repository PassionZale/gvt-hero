<style lang="less">
.gvt-content {
  margin-left: 220px;
  padding: 10px;
  .main {
    min-height: 500px;
    background-color: #ffffff;
  }
}
</style>

<template>
  <div class="gvt-content">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero-content"
};
</script>


