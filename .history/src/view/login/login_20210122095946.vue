<template>
  <div class="login-wrap">
    <div class="ms-title">登录页面</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <!-- `checked` 为 true 或 false -->
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <br />
        <br />
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
 
<script>
import SayHi from "../index/index";
export default {
  name: "App",
  components: {
    SayHi,
  },
  data(){
    return{
      ruleForm:{
        username:'',
        password:''
      }
    }
  }
};
</script>

<style scoped>
#sty1 {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>