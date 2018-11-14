<template>
  <div id="app">

    <!-- <hero-layout :menu-data="menuData">

      <template slot="header">
        Header Container
      </template>

      <template slot="content">
        <h2>当前选中: {{ active_menu || "暂无" }}</h2>
        <h2>当前模拟: {{ hash || "暂无" }}</h2>
        <div v-for="item in menuData">
          <template v-if="item.childBisFunction && item.childBisFunction.length">
            <button>{{ item.name }}</button>
            <br>
            <br>
            <button v-for="v in item.childBisFunction" @click="clickMenu(v.uri)">{{ v.name }}</button>
            <hr>
          </template>
          <template v-else>
            <button @click="clickMenu(item.uri)">{{ item.name }}</button>
            <hr>
          </template>
        </div>
      </template>
      
    </hero-layout> -->

    <hero-login></hero-login>

  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      menuData: [],
      active_menu: "",
      hash: "/#/product/verify/list"
    };
  },

  created() {
    // localStorage.setItem("GVT_AUTH_TOKEN", "afasdfsd-fasdfasd-fasdfas");
    this.fetchMenus();
  },

  mounted() {
    this.initActive();
  },

  watch: {
    hash() {
      this.initActive();
    }
  },

  methods: {
    initActive() {
      const hash = this.hash;
      if (hash) {
        const current = this.active_menu;
        const reg = new RegExp(`^(${current})`);
        const valid = reg.test(hash);
      }
    },

    clickMenu(uri) {
      this.active_menu = uri;
      const list = ["list", "detail", "edit"];
      const str = list[this.rnd(0, list.length - 1)];
      this.hash = this.active_menu ? `${this.active_menu}/${str}` : "";
    },

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

    // 随机整数
    rnd(start, end) {
      return Math.floor(Math.random() * (end - start) + start);
    }
  }
};
</script>