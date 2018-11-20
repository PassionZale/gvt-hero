<template>

  <div>

    <gvt-header :data="breads" :routers="routeMatched"></gvt-header>

    <gvt-sidebar
      :data="menus" 
      :logo="logo" 
      @init-parent-menu="initParentMenu"
      @init-child-menu="initChildMenu"
      @menu-click="menuClick">
    </gvt-sidebar>

    <gvt-content>
      <slot name="content"></slot>
    </gvt-content>

  </div>

</template>

<script>
import GvtHeader from "../header";
import GvtSidebar from "../sidebar";
import GvtContent from "../content";
export default {
  name: "hero-layout",

  components: { GvtHeader, GvtSidebar, GvtContent },

  props: {
    logo: {
      type: String
    },

    menuData: {
      type: Array,
      required: true
    },

    routeMatched: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      breads: []
    }
  },

  computed: {
    menus() {
      return this.menuData.map(item => item);
    }
  },

  methods: {
    initParentMenu(e) {
      // 将父菜单添加至数组首位
      this.breads.unshift(Object.assign({}, e));
    },
    initChildMenu(e) { 
      this.breads.push(Object.assign({}, e));
    },
    menuClick(e) {
      console.log("===== MENU CLICK ======");
      console.log(this.breads);
      console.log("menu-click");
      console.log(e);
      this.breads = e.map(item => Object.assign({}, item));
      console.log("after-menu-click")
      console.log(this.breads);
    },
  }
};
</script>

