<style lang="less" scoped>
.gvt-login-skin {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-image: url("//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjKSAc6R_AAIzKAUmJ-U070.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.gvt-login-icon {
  display: block;
  z-index: 3;
  position: absolute;
  top: 90px;
  left: 80px;
  width: 800px;
  height: auto;
}

.gvt-login-form {
  z-index: 5;
  position: absolute;
  top: 90px;
  right: 180px;
  width: 300px;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
  color: #333333;
  .gvt-login-title {
    font-size: 18px;
    text-align: center;
    margin: 0;
  }
}

.gvt-form {
  .gvt-form-item {
    margin-bottom: 10px;
  }
  label.gvt-form-item-label {
    display: inline-block;
    margin-bottom: 10px;
  }
  input.gvt-form-item-input {
    border: 1px solid #cccccc;
    height: 36px;
    border-radius: 4px;
    width: 100%;
    padding: 0 6px;
  }
  input.gvt-form-item-radio {
    vertical-align: middle;
    &:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
    &:checked:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #409fff;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
  }
  label.gvt-form-item-radio-label {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
    margin-right: 10px;
    user-select: none;
  }
  button {
    width: 100%;
    background-color: #409fff;
    border: 1px solid #d7d7d7;
    color: #ffffff;
    padding: 10px 16px;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
  }
}

.gvt-login-footer {
  height: 60px;
  background-color: #313b4a;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #e6e6e6;
  z-index: 3;
  padding: 15px 0 30px 0;
  text-align: center;
  font-size: 12px;
}
</style>

<template>
  <div>
    <div class="gvt-login-skin"></div>
    <img class="gvt-login-icon" src="//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjMOAQHHgAAKHbYU_e_w612.png"/>
    <div class="gvt-login-form gvt-form">
      <p class="gvt-login-title">{{ $heroT("loginForm.title") }}</p>
      <div class="gvt-form-item">
        <label class="gvt-form-item-label">{{ $heroT("loginForm.username") }}</label>
        <br>
        <input class="gvt-form-item-input" type="text" v-model="form.username" @keyup.enter="submit" />
      </div>
      <div class="gvt-form-item">
        <label class="gvt-form-item-label">{{ $heroT("loginForm.password") }}</label>
        <br>
        <input class="gvt-form-item-input" type="password" v-model="form.password" @keyup.enter="submit" />
      </div>
      <div class="gvt-form-item">
        <label class="gvt-form-item-radio-label">
          <input class="gvt-form-item-radio" type="radio" value="zh-CN" v-model="lang">
          简体中文
        </label>
        <label class="gvt-form-item-radio-label">
          <input class="gvt-form-item-radio" type="radio" value="en-US" v-model="lang">
          English
        </label>
      </div>
      <div class="gvt-form-item">
        <button type="button" @click="submit">
          {{ $heroT("loginForm.loginBtn") }}
        </button>
      </div>
    </div>
    <footer class="gvt-login-footer">
      Copyright &copy; 2019 Grand View Technology Pty Ltd
    </footer>
  </div>
</template>

<script>
import i18nT from "../../mixins"

export default {
  name: "hero-login",

  mixins: [i18nT],

  data() {
    return {
      form: {
        username: "",
        password: ""
      },

      lang: this.locale
    };
  },

  watch: {
    lang(val) {
      this.$emit("update:locale", val)
    },

    locale(val) {
      this.lang = val
    }
  },

  mounted() {
    document.title = `Astraea - ${this.$heroT("loginForm.loginBtn")}`;
  },

  methods: {
    submit() {
      this.$emit("login", Object.assign({}, this.form));
    }
  }
};
</script>

