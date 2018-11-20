<style lang="less">
/*  sidebar css */
.gvt-sidebar {
  height: 100%;
  width: 220px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: #313b4a;
  color: #ffffff;
  font-size: 14px;
  overflow-x: hidden;
  user-select: none;

  .gvt-sidebar-logo {
    height: 70px;
    padding: 14px;
    background-color: #3d4a5d;
  }

  .gvt-menu {
    margin: 0;
    padding: 0;
    list-style-type: none;

    a {
      text-decoration: none;
      color: #ffffff;
      display: block;

      &.router-link-active {
        background-color: #409fff;
      }
    }

    .gvt-menu-item {
      line-height: 25px;
      padding: 14px 24px;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: #409fff;
      }
    }

    .gvt-menu-submenu {
      .gvt-menu-submenu-title {
        line-height: 25px;
        padding: 14px 24px;
        cursor: pointer;

        .gvt-submenu-arrow {
          position: relative;
          top: 9px;
          float: right;
          border: solid #ffffff;
          border-width: 0 2px 2px 0;
          display: inline-block;
          padding: 3px;
          transform: rotate(-45deg);
          transition: all 0.1s linear;
        }

        &:hover,
        &.active {
          color: #409fff;
          background-color: #272f3b;

          .gvt-submenu-arrow {
            border-color: #409fff;
          }
        }

        &.expand {
          .gvt-submenu-arrow {
            top: 8px;
            transform: rotate(45deg);
          }

          & + .gvt-menu {
            display: block;
          }
        }

        &.active.expand {
          & + .gvt-menu {
            background-color: #272f3b;
          }
        }
      }

      .gvt-menu {
        display: none;

        .gvt-menu-item {
          padding-left: 63px;

          &.icon-missing {
            padding-left: 33px;
          }
        }
      }
    }
  }
}

/* svg css */
.svg-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}

.svg-up {
  /* 默认 */
  transform: rotate(0deg);
}

.svg-right {
  transform: rotate(90deg);
}

.svg-down {
  transform: rotate(180deg);
}

.svg-left {
  transform: rotate(-90deg);
}
</style>

<template>
  <div class="gvt-sidebar">
    <div class="gvt-sidebar-logo">
      <img :src="logo" alt="Logo Image" />
    </div>
    <ul class="gvt-menu">
      <div v-for="(item, p_index) in data">
        <div v-if="item.childBisFunction && item.childBisFunction.length">
          <li class="gvt-menu-submenu">
            <div class="gvt-menu-submenu-title" @click="toggleExpand" v-active-submenu>
              <hero-icon :name="item.icon" style="margin-right:10px;" v-if="item.icon"></hero-icon>
              {{ item.name }}
              <i class="gvt-submenu-arrow"></i>
            </div>
            <ul class="gvt-menu">
              <div v-for="(child, c_index) in item.childBisFunction">
                <a :href="child.uri" @click.prevent="menu_item_click(false, child.uri, $event)">
                  <li class="gvt-menu-item" :class="{'icon-missing': !item.icon, 'active': isCurrentMenu(child)}">
                    {{ child.name }}
                  </li>
                </a>
              </div>
            </ul>
          </li>
        </div>
        <div v-else>
          <a :href="item.uri" @click.prevent="menu_item_click(true, item.uri, $event)">
            <li class="gvt-menu-item" :class="{'icon-missing': !item.icon, 'active': isCurrentMenu(item)}">
              <hero-icon :name="item.icon" style="margin-right:10px;" v-if="item.icon"></hero-icon>
              {{ item.name }}
            </li>
          </a>
        </div>
      </div>

    </ul>
  </div>
</template>

<script>
export default {
  name: "hero-sidebar",

  props: {
    // 侧边栏 LOGO
    logo: {
      type: String,
      default:
        "//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjQCAANGMAAAR2Ug-7l4909.png"
    },
    // 侧边栏 DATA
    data: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      href: "",
      inited: false
    };
  },

  directives: {
    "active-submenu": {
      inserted: (el, binding, vnode) => {
        // 检索出二级菜单列表
        const childMenus = el.nextElementSibling;
        // 检索是否包含有 .active 的二级菜单
        const items = childMenus.querySelectorAll(".gvt-menu-item");
        let flag = false;
        items.forEach(item => {
          if (item.classList.contains("active")) {
            flag = true;
            return;
          }
        });
        // 若存在, 则高亮当前一级菜单
        if (flag) {
          el.className += ` expand active`;
          vnode.context.$emit("init-parent-menu", {
            name: el.innerText.trim()
          });
        }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initHref();
      window.addEventListener("hashchange", this.initHref);
    });
  },

  destroyed() {
    window.removeEventListener("hashchange", this.initHref);
  },

  methods: {
    menu_item_click(singleMenu = false, uri = "", event) {
      // 面包屑集合
      let breads = [];
      // 获取当前菜单
      const el = event.target;
      if (singleMenu) {
        breads.push({ name: el.innerText.trim() });
        let nodes = document.querySelectorAll(
          ".gvt-sidebar .gvt-menu-submenu-title"
        );
        nodes.forEach(node => {
          node.classList.remove("expand");
          node.classList.remove("active");
        });
      } else {
        // 获取当前父级节点
        const parentMenu = this.findParentBySelector(el, ".gvt-menu-submenu");
        // 获取一级菜单
        const menu = parentMenu.querySelector(".gvt-menu-submenu-title");
        breads.push({ name: menu.innerText.trim() });
        breads.push({ name: el.innerText.trim(), uri: uri });
        // 高亮一级菜单
        if (!menu.classList.contains("expand")) menu.className += " expand";
        if (!menu.classList.contains("active")) menu.className += " active";
        // 移除其他一级菜单样式
        const arrs = document.querySelectorAll(
          ".gvt-sidebar .gvt-menu-submenu"
        );
        const brothers = Array.prototype.filter.call(arrs, function(node) {
          return node !== parentMenu;
        });
        brothers.map(node => {
          node
            .querySelector(".gvt-menu-submenu-title")
            .classList.remove("expand");
          node
            .querySelector(".gvt-menu-submenu-title")
            .classList.remove("active");
        });
      }

      if (uri) {
        const token = localStorage.getItem("GVT_AUTH_TOKEN");
        window.location.href = token ? `${uri}?token=${token}` : uri;
      }
    },

    initHref() {
      this.href = window.location.href;
    },

    isCurrentMenu(menu) {
      const href = this.href;
      const reg = new RegExp(`^(${menu.uri})`);
      const valid = reg.test(href);
      if (valid) {
        if (!this.inited) {
          this.inited = true;
          this.$emit("init-child-menu", Object.assign({}, menu));
        } else {
          this.$emit("menu-change");
        }
      }
      return valid;
    },

    toggleExpand(e) {
      const el = e.target;
      el.classList.contains("expand")
        ? el.classList.remove("expand")
        : (el.className += ` expand`);
    },

    collectionHas(a, b) {
      //helper function (see below)
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] == b) return true;
      }
      return false;
    },

    findParentBySelector(elm, selector) {
      var all = document.querySelectorAll(selector);
      var cur = elm.parentNode;
      while (cur && !this.collectionHas(all, cur)) {
        //keep going up until you find a match
        cur = cur.parentNode; //go up
      }
      return cur; //will return null if not found
    }
  }
};
</script>
