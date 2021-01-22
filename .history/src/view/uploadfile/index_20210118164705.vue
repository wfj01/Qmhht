<template>
  <div>
    <el-form
      class="elform"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
    >
      <div class="title">APP更新</div>
      <el-form-item label="Appid" prop="appid">
        <el-input
          v-model="form.appid"
          placeholder="(如uni.UNIDF972B3)"
        ></el-input>
      </el-form-item>
      <el-form-item label="版本号1" prop="version">
        <el-input v-model="form.version" placeholder="(如1.0.0...)"></el-input>
      </el-form-item>
      <el-form-item label="版本号2" prop="versionnumber">
        <el-input
          v-model="form.versionnumber"
          placeholder="(如100...)"
        ></el-input>
      </el-form-item>
      <el-form-item label="更新内容" prop="note">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="(如1.....2....)"
          v-model="form.note"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="上传APP">
        <input type="file" @change="getFile($event)" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置数据</el-button>
      </el-form-item>
    </el-form>
  </div>
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
        note: "",
      },
      rules: {
        appid: [
          { required: true, message: "请输入软件的Appid", trigger: "blur" },
        ],
        version: [
          { required: true, message: "请输入软件的版本号", trigger: "blur" },
        ],
        versionnumber: [
          { required: true, message: "请输入版本号简写", trigger: "blur" },
        ],
        note: [{ required: true, message: "请输入更新内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    changenote(e) {
      console.log("this.note", this.note);
    },
    getFile(event) {
      var that = this;
      this.file = event.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.file);
      this.$ajax({
        method: "POST",
        url: "http://localhost:33527/MultiFileUpload",
        data: formData,
      }).then((res) => {
        if (res.data.isSuccess == true) {
          that.form.fileurl = res.data.filePathArray[0].filePath;
          console.log("that.form", that.form);
        }
      });
      console.log(this.file);
    },
    getFile2(event) {
      this.file2 = event.target.files[0];
      console.log(this.file2);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit(formName) {
      var notetext = this.form.note.replace(/\n/g, "<br/>");
      console.log(" this.note", notetext);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax({
            method: "POST",
            url: "http://localhost:33527/MultiFileAppUploadd",
            data: this.form,
          }).then((res) => {
            console.log("res", res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.elform {
  width: 30%;
  font-family: "楷体";
  font-size: 1.5rem;
}
.title {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin: 1rem 0;
}
</style>