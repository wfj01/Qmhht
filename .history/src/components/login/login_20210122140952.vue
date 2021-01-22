<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="License">
        <el-input v-model="ruleForm2.License" placeholder="授权码"></el-input>
      </el-form-item>
      <div class="yanzhengma">
        <el-input v-model="ruleForm2.imageCode" placeholder="验证码"></el-input>
        <el-image :src="imagetext" @click="loadImageData"></el-image>
      </div>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'LoginPage',
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "admin",
        password: "123456",
        License: "",
        imageCode: "",
        user: [],
      },
      rules2: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" },
        ],
        License: [
          { required: true, message: "enter your License", trigger: "blur" },
        ],
      },
      checked: false,
      imagetext: "",
    };
  },
  mounted() {
    this.loadImageData();
  },
  methods: {
    // 加载验证码图片
    loadImageData: function () {
      var that = this;
      this.$get({
        url: this.$ApiList.loadImageData,
      })
        .then((res) => {
          that.imagetext = "data:image/png;base64," + res.image.fileContents;
          localStorage.setItem("imagetext", res.code);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    handleSubmit(event) {
      var  that = this;

      var imagetext = localStorage.getItem("imagetext");
      that.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          console.log("ruleForm2", that.ruleForm2);
          if (that.ruleForm2.imageCode !== imagetext) {
            that.$message.error("验证码输入不正确!");
            return;
          } else {
            console.log("this.checked", that.checked);
            that.$get({
              url: that.$ApiList.getLoginPage,
              data: {
                Name: that.ruleForm2.username,
                Password: that.ruleForm2.password,
                License: that.ruleForm2.License,
              },
            })
              .then((res) => {
                console.log("res", res);
                if (res.rtnCode === 0) {
                  that.$message.success("登录成功,正跳转至主页面!");
                  localStorage.setItem("islogin", true);
                  that.$router.push({
                    path: "/TablePage",
                  });
                  if (that.checked === true) {
                    let userinfo = {};
                    userinfo.username = that.ruleForm2.username;
                    userinfo.password = that.ruleForm2.password;
                    that.user.push(userinfo);
                    localStorage.setItem("userlist", JSON.stringify(that.user));
                    
                  }
                } else {
                  this.$message.error(res.rtnMsg);
                }
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 600px;
  background-color: skyblue;
  position: relative;
}
.yanzhengma {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  width: 330px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  position: absolute;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>