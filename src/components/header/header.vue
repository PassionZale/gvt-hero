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
      user-select: none;
      color: #a7a7a7;
      margin-right: 10px;
    }

    .tool-groups {
      svg {
        cursor: pointer;
        margin-right: 20px;
      }
    }

    .tool-lang {
      position: relative;
      text-align: left;
      user-select: none;
      margin-right: -5px;
      .tool-label {
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
      .tool-menu {
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
          border-right: 1px solid #e5e5e5;
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

    .tool-user {
      position: relative;
      text-align: left;
      user-select: none;
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
        {{ $heroT("header.currentTimeZone") }}
        {{ getClientTimezone() }}
      </div>

      <div class="tool-lang" v-show="!disTranslation"  v-clickoutside="handleLangMenuClose" @click="langMenuShow = !langMenuShow">
        <div class="tool-label">
          {{ $heroT("header.i18n") }}
        </div>
        <div class="tool-menu" v-show="langMenuShow">
          <ul>
            <li @click="changeLocale('zh-CN')" v-show="locale !== 'zh-CN'">简体中文</li>
            <li @click="changeLocale('en-US')" v-show="locale !== 'en-US'">English</li>
          </ul>
        </div>
      </div>

      <div class="tool-user" v-clickoutside="handleUserMenuClose" @click="userMenuShow = !userMenuShow">
        <div class="user-name">
          {{ username }}
        </div>
        <div class="user-menu" v-show="userMenuShow">
          <ul>
            <li v-show="menuInfo" @click="userMenuClick('user-info')">
              {{ $heroT("header.userInfo") }}
            </li>
            <li v-show="menuPwd" @click="userMenuClick('mod-pwd')">
              {{ $heroT("header.updatePwd") }}
            </li>
            <li @click="userMenuClick('logout')">
              {{ $heroT("header.logOut") }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18nT from "../../mixins"

export default {
  name: "hero-header",

  mixins: [i18nT],

  props: {
    sidebars: { type: Array, default: () => [] },
    routers: { type: Array, default: () => [] },
    username: [String],
    menuInfo: [Boolean],
    menuPwd: [Boolean],
    disTranslation: [Boolean]
  },

  data() {
    return {
      langMenuShow: false,
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
    handleLangMenuClose() {
      this.langMenuShow = false;
    },

    changeLocale(lang) {
      localStorage.setItem("GVT_I18N_LANG", lang)
      // 获取当前 url
      let url = window.location.href
      // 搜索当前 url 中是否包含 ?lang 参数
      const paramsLang = this.getParameterByName("lang", url)
      if(paramsLang) {
        // 替换 paramsLang 为 lang
        const reg = new RegExp(`/${paramsLang}/`);
        url = url.replace(reg, lang)
      }
      window.location.href = url
      window.location.reload()
    },

    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },

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
