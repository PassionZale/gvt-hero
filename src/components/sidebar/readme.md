# 构建思路

## 说明

- 子菜单: 即二级菜单和没有一级菜单的菜单(如: 控制台)

- 一级菜单: 即含有二级菜单的菜单

- 高亮样式组合: .active .expand

## DOM 结构

```html
<ul class="gvt-menu">
  <!-- 通过 .active 控制高亮样式 -->
  <li class="gvt-menu-item active">控制台</li>

  <li class="gvt-menu-submenu">
    <!-- 通过 .active 控制高亮样式 -->
    <!-- 通过 .expand 控制展开样式 -->
    <div class="gvt-menu-submenu-title expand active">一级菜单标题</div>
    <ul class="gvt-menu">
      <!-- 通过 .active 控制高亮样式 -->
       <li class="gvt-menu-item active">二级菜单标题</li>
    </ul>
  </li>
</ul>
```

## F5 刷新

- 高亮子菜单

  0. 通过监听 ```window``` 的 ```hashchange``` 事件, 动态匹配: 菜单模型中的 `uri` 字段与当前 `window.location.href` 是否满足 ```isCurrentMenu()``` 函数校验

  1. isCurrentMenu() 会依据 uri 动态创建 new RegExp(`^(${uri})`) 正则

  2. 在 template 中, 通过正则 test() 所返回的 true OR false, 动态高亮菜单样式

  3. :class="{'icon-missing': !item.icon, 'active': isCurrentMenu(child.uri)}"

- 高亮一级菜单

  0. 编写 v-active-submenu 指令, 并为每个一级菜单绑定该指定: <div class="gvt-menu-submenu-title" @click="toggleExpand" v-active-submenu>

  1. 在 inserted 钩子函数中, 检索出二级菜单列表 DOM NODE: 通过 
  .gvt-menu-submenu-title 找到临近的兄弟节点 .gvt-menu

  2. .gvt-menu 中找到是否有 .gvt-menu-item.active 节点

  3. 若其存在, 则为当前一级菜单增加高亮样式组合

## 路由切换

- 子菜单点击

  0. 为每个子菜单绑定点击事件 menu_item_click()

  1. 若没有一级菜单, 则移除所有 .gvt-menu-submenu-title 高亮样式组合

  2. 若存在一级菜单, 为当前 .gvt-menu-submenu-title 增加高亮样式组合

  3. 并移除其他 .gvt-menu-submenu-title 的高亮样式组合
