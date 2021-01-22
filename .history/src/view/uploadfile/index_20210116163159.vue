<template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Appid">
        <el-input v-model="form.appid" placeholder="请输入appid"></el-input>
      </el-form-item>
      <el-form-item label="版本号1">
        <el-input v-model="form.version" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="版本号2">
        <el-input
          v-model="form.versionnumber"
          placeholder="请输入版本号2"
        ></el-input>
      </el-form-item>
      <el-form-item label="更新内容">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          @input="changenote"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="上传APP">
        <input type="file" @change="getFile($event)" />
      </el-form-item>
    </el-form>
    <el-form-item>
    <el-button type="primary" @click="submit()">立即创建</el-button>
    <el-button @click="resetForm('form')">取消</el-button>
  </el-form-item>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //文件
      file: "",
      file2: "",
      form: {
        appid: "",
        version: "",
        versionnumber: "",
      },
      note: "",
    };
  },
  methods: {
    changenote(e) {
      this.note = e.target.value.replace(/\n/g, "<br/>");
      console.log("this.note", this.note);
    },
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    getFile2(event) {
      this.file2 = event.target.files[0];
      console.log(this.file2);
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    submit() {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.file);
      this.$ajax({
        method: "post",
        url:
          "http://localhost:33527/MultiFileAppUpload?appid=" +
          this.form.appid +
          "&version=" +
          this.form.version +
          "&versionnum=" +
          this.form.versionnumber +
          "&note=" +
          this.note,
        data: formData,
      }).then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>

<style scoped>
</style>