<template>
  <hero-layout 
    :username="username" 
    :menu-data="menuData" 
    :route-matched="routeMatched"
    :locale="lang"
    menu-info
    menu-pwd
    @user-info-click="userinfo"
    @user-pwd-click="userpwd"
    @user-logout-click="userlogout">

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
      routeMatched: [],
      username: "Gvt Hero",
      lang: localStorage.getItem("GVT_I18N_LANG") || 'zh-CN'
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
          setTimeout(() => {
            this.menuData = menu;
          }, 500);
        });
    },
    userinfo() {
      alert("userinfo");
    },
    userpwd() {
      alert("userpwd");
    },
    userlogout() {
      this.$router.push("/login");
    }
  }
};
</script>
