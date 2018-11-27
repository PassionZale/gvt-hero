<style lang="less">
.gvt-error-page {
  background-color: #f5ede4;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  color: #666666;
  .error-wrapper {
    width: 85%;
    height: 330px;
    max-width: 1100px;
    margin: 140px auto 0;
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 366px 278px;
    &.error-403 {
      background-image: url(//47.75.105.17:22124/group1/M00/01/07/wKi5Slvrhe2AIScdAAF9PT0hBZg715.png);
    }
    &.error-404 {
      background-image: url(//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjFaAZP0QAAHMUON2yTg737.png);
    }
    &.error-500 {
      background-image: url(//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjHqAcPsWAAFbfgaK7Zk517.png);
    }
    .error-info {
      margin-left: 400px;
      width: 300px;
      height: 100%;
      font-size: 14px;
      padding-top: 75px;
    }

    .error-title {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .error-desc {
      margin-bottom: 10px;
    }

    .error-btns {
      border-top: 1px solid #808080;
      padding: 10px 0;
      margin-top: 30px;
    }

    .home_btn {
      padding: 5px 10px;
      background-color: #808080;
      color: #fefefe;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>


<template>
  <div class="gvt-error-page">
    <div class="error-wrapper" :class="errorClass">
      <div class="error-info" v-if="code === '404'">
        <p class="error-title">—&emsp;404 Not Found</p> 
        <p class="error-desc">页面不见了只是为了下一次的与你</p>
        <p class="error-desc">——重逢~</p>
        <div class="error-btns">
          <span class="home_btn" @click="go_back_home">返回首页</span>
        </div>
      </div>
      <div class="error-info" v-else-if="code === '403'">
        <p class="error-title">—&emsp;403 Forbidden</p> 
        <p class="error-desc">也许你还没有获得进入的权限</p>
        <p class="error-desc">——或者再试一次吧~</p>
        <div class="error-btns">
          <span class="home_btn" @click="go_back_home">返回首页</span>
        </div>
      </div>
      <div class="error-info" v-else>
        <p class="error-title">—&emsp;500 Error</p> 
        <p class="error-desc">服务器犯了错, 我们决定镇压它 500 年</p>
        <div class="error-btns">
          <span class="home_btn" @click="go_back_home">返回首页</span>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: "hero-error",

  props: {
    code: {
      type: String,
      default: "404",
      validator(val) {
        return ["403", "404", "500"].indexOf(val) !== -1
      }
    }
  },

  computed: {
    errorClass() {
      return `error-${this.code}`
    }
  },

  mounted() {
    document.title = `Astraea - ${this.code}`;
  },

  methods: {
    go_back_home() {
      window.location.hash = "/";
    }
  }
};
</script>
