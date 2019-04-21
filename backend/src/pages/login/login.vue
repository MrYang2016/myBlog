<template>
  <div>
    <div class="login">
      <el-input v-model="account" placeholder="请输入账号" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      <el-button type="primary" :disabled="!(account && password)" @click="handleClickLoginBtn">登陆</el-button>
    </div>
    <el-alert v-show="tip.showTip" :title="tip.text" :type="tip.type" center show-icon :closable="false"></el-alert>
  </div>
</template>
<script>
import axios from "../../assets/js/axios";
export default {
  data() {
    return {
      account: "",
      password: "",
      tip: {
        text: "yang",
        showTip: false,
        type: "error"
      }
    };
  },
  methods: {
    async handleClickLoginBtn() {
      const { password, account } = this;
      const { status, message, code } = await axios.post("/backend/login", {
        password: encodeURIComponent(password.trim()),
        account: encodeURIComponent(account.trim())
      });
      this.tip = {
        text: message,
        showTip: true,
        type: status === "fail" ? "warning" : status
      };
      if (code !== 200) return;
      location.href = '/backend';
    },
  }
};
</script>
<style lang="scss">
$w: 300px;
$h: 200px;
body{
  padding: 0;
  margin: 0;
}
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -$w / 2;
  margin-top: -$h / 2;
  width: $w;
  height: $h;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-input {
    margin: 10px 0;
  }
  .el-button {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
