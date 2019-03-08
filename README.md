# gvt-hero

### 无国际化

- GVT UI Components Package @1.1.30

### 国际化

- GVT UI Components Package @1.2.7

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

## 子系统对接公共组件

侧边栏进行跨系统跳转时, 会在 ```URL``` 中拼接 ```token``` 、```lang``` 参数, 例如(假设当前语种为 ```en-US```):

>http://localhost:9090/#/user-manage/user-list?lang=en-US&token=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIiwidWlkIjoiMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJ0eXBlIjoiMCIsInN5c3RlbSI6MSwiZXhwIjoxNTUyMTEyNTQ4fQ.cbaPqFhI8mVLLKjdjZn-N9_faz_L7iMV_BuhrJU3mOaY6Luu4YH-U2M1bd_TjPGHY-xAr1U6APFXKxuTtwb5XybMrHdhHFQTDgMJtLbHxf2qvVcf-1XD7yYRM7gdHmyQtXNZGrGhsHlfHBL4YIzD-VNxnfM9nR2h6HaWbkMHBGQ

- 因此各个子系统, 需要在 ```main.js``` 主入口函数中, 接收并缓存 ```语种参数:lang```、```JWT参数:token```

- ```gvt-header``` 组件在**切换语言**时, 会更新 ```localStorage``` 中的 ```GVT-I18N-LANG``` 为 ```zh-CN```, 但是 ```url``` 中 ```lang``` 参数扔为旧值 ```en-US```

- 因此需要在 ```beforEach()``` 中我们需要手动移除 ```lang``` 参数, 为保证 ```url``` 的美观, 同时移除 ```token``` 参数

```javascript
const cleanLangAndTokenQuery = (to, from , next) => {
  to.query.token && delete to.query.token
  if(to.query.lang) {
    delete to.query.lang
    if(from.path === to.path) {
      iView.LoadingBar.finish()
    }
    next({
      // 替换当前路由地址
      replace: true,
      path: to.path,
      params: to.params,
      query: to.query
    });
  } else {
    next();
  }
}

router.beforEach(to, from , next) => {
  if(to.query.lang) {
    // query.lang 存在时, 更新本地 lang
    Lang.setLang(to.query.lang)
  } else {
    // 若 query.lang 不存在, 且本地未缓存语种时, 默认将其置为 "zh-CN"
    !Lang.getLang() && Lang.setLang()
  }
  // 初始化 vue-i18n locale
  setI18nLanguage(Lang.getLang())

  // query.token 存在时, 更新本地 jwt
  if(to.query.token) {
    Auth.setToken(to.query.token)
  }

  // ... 其他代码
  // 在所有调用 next() 处, 将其替换为 cleanLangAndTokenQuery()
  // 例如:
    if(Auth.getToken()) {
    if(to.path === "/login" || to.path === "/") {
      next({path: "/console"});
      iView.LoadingBar.finish();
    } else {
      if(store.getters.user.id === ""){
        store.dispatch("FetchUserData").then(apps => {
          store.dispatch("InitPermissionByApps", apps).then(() => {
            cleanLangAndTokenQuery(to, from, next)
          })
        }).catch(error => {
          Auth.removeToken();
          next({ path: `/${error.redirect}` });
          iView.LoadingBar.finish();
        })
      }else{
        cleanLangAndTokenQuery(to, from, next)
      }
    }
  }else {
    if(accessRoutePath.indexOf(to.path) > -1) {
      cleanLangAndTokenQuery(to, from, next)
    }else {
      next({path: "/login"});
      iView.LoadingBar.finish();
    }
  }
}
```

## Lang & Auth 工具模块

```javascript
// Lang Module

const prefixLang = "GVT_I18N_LANG";

class Lang {

  constructor() {}

  static setLang(lang = "zh-CN") {
    return localStorage.setItem(prefixLang, lang);
  }

  static getLang() {
    return localStorage.getItem(prefixLang);
  }

  static removeLang() {
    return localStorage.removeItem(prefixLang);
  }

}

export default Lang;
```

```javascript
// Auth Module

const prefixToken = "GVT_AUTH_TOKEN";

class Auth {

  constructor() {}

  static setToken(token) {
    return localStorage.setItem(prefixToken, token);
  }

  static getToken() {
    return localStorage.getItem(prefixToken);
  }

  static removeToken() {
    return localStorage.removeItem(prefixToken);
  }

  static logOut() {
    this.removeToken();
    window.location.hash = "/login";
  }

}

export default Auth;
```

## 面包屑导航

### 获取侧边栏数据

组件会自动获取当前侧边栏所匹配导航的 ```文本``` 和 ```url```, 并将其按层级关系添加至面包屑中, 例如:

1. 若当前为单级菜单点击, 组件会获取其 ```文本``` (如: 首页), 而后会获取其 ```url``` (如: http://example.com/), 而后显示在面包屑中, 此时面包屑显示: **首页**

2. 若当前为二级菜单点击, 组件会获取一级二级菜单, 参照第一步获取相应 ```文本``` 及 ```url```, 而后显示在面包屑中, 此时面包屑显示: **应用管理 > 产品管理**

### 获取路由数据

```javascript
// 产品管理 路由对象

const router = {
  path: "product-manage",
  name: "product-manage",
  component: () => import("@/components/container/ContainerBase"),
  redirect: { name: "product-list" },
  children: [
    {
      path: "/",
      name: "product-list",
      meta:{ title: "产品列表", redirect: true },
      component: () => import("@/views/admin/application-manage/product-manage/List")
    },
    {
      path: "create",
      name: "product-create",
      meta:{ title: "产品创建", redirect: true },
      component: () => import("@/views/admin/application-manage/product-manage/CreateOrUpdate")
    },
    {
      path: "edit/:id",
      name: "product-edit",
      meta:{ title: "产品编辑", redirect: true },
      component: () => import("@/views/admin/application-manage/product-manage/CreateOrUpdate")
    }
  ]
}
```

组件会根据 ```route-matched``` 自行解析出 ```meta: {redirect: true}``` 的路由, 并将其拼接在侧边栏数据后, 若当前 ```path``` 为: ```http://localhost:9090/#/application-manage/product-manage```

此时 ```产品列表``` 包含 ```meta: {redirect: true}```, 那么它将被添加至面包屑中, 此时面包屑显示: **应用管理 > 产品管理 > 产品列表**

若将 ```产品列表``` 只为 ```meta: {redirect: false}``` 或不声明 ```redirect``` 键, 如: ```meta: {}```, 那么它将**不被**添加至面包屑中, 此时面包屑显示: **应用管理 > 产品管理**


## hero-layout

### Props

props | 说明 | 数据类型 | 备注 | 示例
---- | ---- | ---- | ---- | ---
logo | 产品图片 | String | 侧边栏菜单顶部 LOGO 显示, 大部分情况无需传入 | "//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjQCAANGMAAAR2Ug-7l4909.png"
locale | 语种 | String | required & ["zh-CN", "en-US"] | "zh-CN"
username | 用户名称  | String | 通过 vuex getters 获取 | "Gvt Hero"
appTarget | 产品编码 | String | 兼容 APOS 只显示自身产品数据, 非特殊情况无需传递 | "apos-tenant"
disTranslation | 是否禁用语言切换 | Boolean | 默认显示语言切换框 | true
menu-data | 侧边栏菜单数据  | Array | 通过 getUserRelatedData() 获取
route-matched | vue-router 匹配集合 | Array | 通过 this.$route.matched 获取
menu-info | 个人信息 | Boolean | 显示"个人信息"按钮, 默认 false 
menu-pwd | 修改密码 | Boolean | 显示"修改密码"按钮, 默认 false 

### Events

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
# 若要禁用语言切换功能, 声明 dis-translation 即可
touch layouts.vue
```

```html
<template>
  <hero-layout 
    :username="username" 
    :menu-data="menuData" 
    :route-matched="routeMatched"
    :locale="locale"
    menu-info
    menu-pwd
    dis-translation
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
import Lang from "@/utils/lang"

export default {
  data() {
    return {
      menuData: [],
      routeMatched: [],
      username: "Gvt Hero",
      locale: Lang.getLang()
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
  <hero-login @login="submit" :locale="locale"></hero-login>
</template>
```

```javascript
import Lang from "@/utils/lang"

export default {
  data() {
    return {
      locale: Lang.getLang()
    }
  },

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
  <hero-error :locale="locale"></hero-error>
</template>
```

```javascript
import Lang from "@/utils/lang"

export default {
  name: "error-404",

  data() {
    return {
      locale: Lang.getLang()
    }
  }
};
```