<style lang="less">
.gvt-header {
  margin-left: 220px;
  height: 70px;
  padding: 20px 0;
  background-color: #ffffff;
  position: relative;

  .gvt-bread-crumbs {
    display: inline-block;
    font-size: 14px;
    color: #313b4a;
    margin-left: 20px;

    a {
      color: #313b4a;
      text-decoration: none;
    }

    .crumb-split {
      color: #a7a7a7;
      margin: 0 5px;
    }
  }

  .gvt-tool {
    display: inline-block;
    font-size: 14px;
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    color: #333333;

    div[class^="tool-"] {
      display: inline-block;
    }

    .tool-timezone {
      color: #a7a7a7;
      margin-right: 10px;
    }

    .tool-groups {
      svg {
        cursor: pointer;
        margin-right: 20px;
      }
    }

    .tool-user {
      position: relative;
      text-align: left;
      .user-name {
        padding: 20px 10px;
        min-width: 110px;
        border-left: 1px solid #e9effa;
        cursor: pointer;
        &:after {
          border: solid #333333;
          border-width: 0 2px 2px 0;
          display: inline-block;
          margin-left: 5px;
          padding: 3px;
          transform: rotate(45deg);
          line-height: 30px;
          position: relative;
          top: -3px;
          content: " ";
        }
      }
      .user-menu {
        position: absolute;
        top: 70px;
        left: 0;
        max-height: 200px;
        width: 100%;
        overflow: auto;
        background-color: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        z-index: 900;
        ul {
          list-style-type: none;
          border-left: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          li {
            padding: 10px;
            cursor: pointer;
            border-top: 1px solid #e5e5e5;
            &:hover {
              background-color: #f2f3f5;
              color: #409fff;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="gvt-header">
    <div class="gvt-bread-crumbs">
      <template v-for="(item, index) in breads">
        <template v-if="item.uri">
          <a :href="item.uri">
            <span class="crumb-item">{{ item.name }}</span>
          </a>
          <span class="crumb-split" v-if="index < (breads.length -1)">></span>
        </template>
        <template v-else>
          <span class="crumb-item">{{ item.name }}</span>
          <span class="crumb-split" v-if="index < (breads.length -1)">></span>
        </template>
      </template>
    </div>
    <div class="gvt-tool">
      <div class="tool-timezone">
        当前时区：{{ getClientTimezone() }}
      </div>
      <div class="tool-user" v-clickoutside="handleUserMenuClose" @click="userMenuShow = !userMenuShow">
        <div class="user-name">
          {{ username }}
        </div>
        <div class="user-menu" v-show="userMenuShow">
          <ul>
            <li v-show="menuInfo" @click="userMenuClick('user-info')">个人信息</li>
            <li v-show="menuPwd" @click="userMenuClick('mod-pwd')">修改密码</li>
            <li @click="userMenuClick('logout')">注销</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero-header",

  props: {
    sidebars: { type: Array, default: () => [] },
    routers: { type: Array, default: () => [] },
    username: [String],
    menuInfo: [Boolean],
    menuPwd: [Boolean]
  },

  data() {
    return {
      userMenuShow: false
    };
  },

  computed: {
    breads() {
      let breads = [];
      const length = this.sidebars.length;
      breads = this.sidebars.map(item => item);
      const loction = window.location;
      const prefix = `${location.origin}${location.pathname}`;

      this.routers.map(item => {
        if(item.meta.redirect) breads.push({name: item.meta.title, uri: `${prefix}#${item.path}` })
      })

      return breads;
    }
  },

  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },

  methods: {
    handleUserMenuClose() {
      this.userMenuShow = false;
    },

    userMenuClick(param) {
      this.$emit("user-menu-click", param);
    },

    getClientTimezone() {
      const date = new Date();
      const timezone = date.getTimezoneOffset();
      const prefix = timezone < 0 ? "+" : "-";
      const diff = Math.abs(timezone);

      // 计算 hour
      const tmp_hour = Math.floor(diff / 60);
      const hour = tmp_hour < 10 ? `0${tmp_hour}` : tmp_hour;
      // 计算 min
      const tmp_min = Math.floor(diff % 60);
      const min = tmp_min < 10 ? `0${tmp_min}` : tmp_min;

      return `UTC ${prefix} ${hour} : ${min}`;
    }
  }
};
</script>
