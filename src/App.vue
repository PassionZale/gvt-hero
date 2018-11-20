<style lang="less">
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*:before,
*:after {
  box-sizing: border-box;
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  background-color: #f0f2f5;
  position: relative;
  padding: 0;
  margin: 0;
}
</style>


<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>