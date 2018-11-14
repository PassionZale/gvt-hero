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
html,
body {
  height: 100%;
  background-color: #f0f2f5;
  position: relative;
  padding: 0;
  margin: 0;
}

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
      <img :src="logo" alt="Logo Image" v-if="logo !== ''" />
      <p v-else>Logo Image Missing...</p>
    </div>
    <ul class="gvt-menu">
      <div v-for="item in data">
        <div v-if="item.childBisFunction && item.childBisFunction.length">
          <li class="gvt-menu-submenu">
              <div class="gvt-menu-submenu-title" @click="toggleExpand" :class="{'active expand': isCurrentMenu(item.uri)}">
                <hero-icon :name="item.icon" style="margin-right:10px;" v-if="item.icon"></hero-icon>
                {{ item.name }}
                <i class="gvt-submenu-arrow"></i>
              </div>
              <ul class="gvt-menu">
                <div v-for="child in item.childBisFunction">
                  <a :href="child.uri">
                    <li class="gvt-menu-item" :class="{'icon-missing': !item.icon, 'active': isCurrentMenu(child.uri)}">
                      {{ child.name }}
                    </li>
                  </a>
                </div>
              </ul>
            </li>
        </div>
        <div v-else>
          <a :href="item.uri">
            <li class="gvt-menu-item" :class="{'icon-missing': !item.icon, 'active': isCurrentMenu(item.uri)}">
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
      default: ""
    },
    // 侧边栏 DATA
    data: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      href: ""
    };
  },

  mounted() {
    this.$nextTick(() => {
      this._initHref();
      window.addEventListener("hashchange", this._initHref);
    });
  },

  destroyed() {
    window.removeEventListener("hashchange", this._initHref);
  },

  methods: {
    _initHref() {
      this.href = window.location.href;
    },

    isCurrentMenu(uri) {
      const href = this.href;
      const reg = new RegExp(`^(${uri})`);
      const valid = reg.test(href);
      return valid;
    },

    toggleExpand(e) {
      const el = e.target;
      el.classList.contains("expand")
        ? el.classList.remove("expand")
        : (el.className += ` expand`);
    }
  }
};
</script>

