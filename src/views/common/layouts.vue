<template>
  <hero-layout :menu-data="menuData" :route-matched="routes">

    <div slot="content">
      <router-view></router-view>
    </div>

  </hero-layout>
</template>

<script>
export default {
  data() {
    return {
      menuData: [],
      routes: []
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
    }
  }
};
</script>
