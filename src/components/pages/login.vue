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
  }
}

.gvt-form {
  .gvt-form-item {
    margin-bottom: 10px;
  }
  label {
    display: inline-block;
    margin-bottom: 10px;
  }
  input {
    border: 1px solid #cccccc;
    height: 36px;
    border-radius: 4px;
    padding: 6px;
    width: 100%;
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
      <p class="gvt-login-title">账号登录</p>
      <div class="gvt-form-item">
        <label>用户名</label>
        <br>
        <input type="text" v-model="form.username"></input>
      </div>
      <div class="gvt-form-item">
        <label>密码</label>
        <br>
        <input type="password" v-model="form.password"></input>
      </div>
      <div class="gvt-form-item">
        <button type="button" @click="submit">登录</button>
      </div>
    </div>
    <footer class="gvt-login-footer">
      Copyright &copy; 2018 Grand View Technology. Ltd
    </footer>
  </div>
</template>

<script>
export default {
  name: "hero-login",

  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    submit() {
      this.$emit("login", Object.assign({}, this.form));
    }
  }
};
</script>

