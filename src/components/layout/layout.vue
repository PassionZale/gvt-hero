<template>

  <div>

    <gvt-header 
      :sidebars="sidebars" 
      :routers="routers"
      :username="username"
      @user-menu-click="userMenuClick">
    </gvt-header>

    <gvt-sidebar
      :data="menus" 
      :logo="logo" 
      @menu-change="menuChange">
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
    logo: [String],

    username: [String],

    menuData: {
      type: Array,
      required: true
    },

    routeMatched: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      sidebars: [],
      routers: []
    };
  },

  watch: {
    routeMatched(val) {
      this.routers = val;
    }
  },

  computed: {
    menus() {
      return this.menuData.map(item => item);
    }
  },

  created() {
    this.routers = this.routeMatched;
  },

  methods: {
    menuChange() {
      this.$nextTick(() => {
        this.sidebars = [];
        let arr = [];
        const el = document.querySelector(".gvt-menu-item.active");
        const aNode = this.findParentBySelector(el, "a");
        const parentNode = this.findParentBySelector(el, ".gvt-menu-submenu");
        if (parentNode) {
          const parentMenu = parentNode.querySelector(".gvt-menu-submenu-title");
          arr = [
            { name: parentMenu.innerText.trim() },
            { name: el.innerText.trim(), uri: aNode.getAttribute("href").trim() }
          ];

        } else {
          arr = [{ name: el.innerText.trim(), uri: aNode.getAttribute("href").trim() }]
        }
        this.sidebars = arr;
        document.title = `Astraea - ${el.innerText.trim()}`;
      });
    },
    collectionHas(a, b) {
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] == b) return true;
      }
      return false;
    },
    findParentBySelector(elm, selector) {
      var all = document.querySelectorAll(selector);
      var cur = elm.parentNode;
      while (cur && !this.collectionHas(all, cur)) {
        cur = cur.parentNode;
      }
      return cur;
    },
    userMenuClick(param) {
      switch(param) {
        case "user-info":
          this.$emit("user-info-click");
          break;
        case "mod-pwd":
          this.$emit("user-pwd-click");
          break;
        default:
          this.$emit("user-logout-click");
      }
    }
  }
};
</script>

