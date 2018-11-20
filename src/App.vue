<style lang="less">
/*  Start reset css */
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

    <hero-layout :menu-data="menuData" :route-matched="routes">

      <template slot="content"></template>
      
    </hero-layout>

  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      menuData: [],
      routes: this.mockRoutes()
    };
  },

  created() {
    this.fetchMenus();
  },

  methods: {
    // 拉取菜单模拟数据
    fetchMenus() {
      fetch("/static/mock/sidebar.json")
        .then(response => {
          return response.json();
        })
        .then(menu => {
          this.menuData = menu;
        });
    },

    mockRoutes() {
      // return [
      //   { meta: {title: "首页"}, path: "" },
      //   { meta: {title: "我的工作台"}, path: "/console" }
      // ];

      return [
        { meta: {title: "商品管理"}, path: "/product" },
        { meta: {title: "商品分类"}, path: "/product/category" },
        { meta: {title: "分类列表"}, path: "/product/category/list" },
      ];
    },

    // 随机整数
    rnd(start, end) {
      return Math.floor(Math.random() * (end - start) + start);
    }
  }
};
</script>