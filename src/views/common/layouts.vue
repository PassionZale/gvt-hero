<template>
  <hero-layout :menu-data="menuData" :route-matched="routeMatched">

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
      routeMatched: []
    };
  },

  watch: {
    $route() {
      this.routeMatched = this.$route.matched;
    }
  },

  created() {
    this.fetchMenus();
    this.routeMatched = this.$route.matched;
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
