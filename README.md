# gvt-hero

> GVT UI Components Package @1.1.27

# 如何使用

## 安装

```shell
npm install gvt-hero --save
```
## 更新

```shell
npm update gvt-hero
```

## 组件列表

- hero-layout  布局组件

- hero-icon    图标组件

- hero-login   登录视图组件

- hero-sidebar **请勿单独使用**

- hero-header  **请勿单独使用**

- hero-content **请勿单独使用**


## 引用方式

- 方法一

```javascript
import Vue from "vue"
import HeroUI from "gvt-hero"

Vue.use(HeroUI)
```

- 方法二

```html
<script src="./node_modules/gvt-hero/dist/gvt-hero.js"></script>
```

## hero-layout

### props

props | 说明 | 数据类型 | 示例
---- | ---- | ---- | ---- 
username | 用户名称  | String | "Gvt Hero"
menu-data | 侧边栏菜单数据  | Array | []
route-matched | vue-router 匹配集合 | Array | []
menu-info | 个人信息 | Boolean | 默认 false
menu-pwd | 修改密码 | Boolean | 默认 false

### events

events | 说明 
---- | ----
user-info-click | 用户信息点击  
user-pwd-click | 修改密码点击
user-logout-click | 注销按钮点击


```shell
# hero-layout 集成了 hero-header, hero-sidebar, hero-content
# 使用 hero-layout, 快速构建子系统的布局容器
# 你也可以参照 ./src/views/common/layouts.vue
# 以下示例是标准使用方法
# 若你的 router.meta.title 未设置或设置的值为空
# 即 meta.title == false, 则它将不会出现在面包屑中
touch layouts.vue
```

```html
<template>
  <hero-layout 
    :username="username" 
    :menu-data="menuData" 
    :route-matched="routeMatched"
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
```

```javascript
export default {
  data() {
    return {
      menuData: [],
      routeMatched: [],
      username: "Gvt Hero"
    };
  },

  watch: {
    $route() {
      this.routeMatched = this.$route.matched;
    }
  },

  created() {
    this.routeMatched = this.$route.matched;
  },

  mounted() {
    this.$nextTick(() => {
      this.fetchMenus();
    })
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
      alert("userlogout");
    }
  }
};
```

## hero-icon

集成了```vue-svgicon```, 请查看 **[vue-svgicon 相关文档](https://github.com/MMF-FE/vue-svgicon)**

## hero-login

```shell
# 子系统创建视图组件, 再使用 hero-login, 即可快速构建登录视图
touch Login.vue
```

```html
<template>
  <hero-login @login="submit"></hero-login>
</template>
```

```javascript
export default {
  methods: {
    submit(user) {
      // user: {username: "", password: ""}
      // 你需要自行 md5 password
      // 例如:
      // const params = Object.assign({}, user, {
      //   password: md5(user.password)
      // });
      // login(params)
      //   .then(response => {
      //     const jwt = response.data.token;
      //     Auth.setToken(jwt);
      //     this.$router.push("/");
      //   })
      //   .catch(error => {
      //     this.$Message.error("账户或密码错误");
      //   });
    }
  }
}
```

## hero-error

### props

props | 说明 | 数据类型 | 示例
---- | ---- | ---- | ---- 
code | 视图代码,默认 "404", 只提供"403","404","500"  | String | "403" 、"404"、"500"

```shell
# 快速构建错误视图页
touch 404.vue
```

```html
<template>
  <hero-error></hero-error>
</template>
```