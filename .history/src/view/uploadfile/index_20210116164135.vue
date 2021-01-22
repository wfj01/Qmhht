<template>
  <el-form class="elform" ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="Appid" prop="appid">
      <el-input v-model="form.appid" placeholder="(如uni.....)"></el-input>
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
        @input="changenote"
      >
      </el-input>
    </el-form-item>
    <el-form-item label="上传APP">
      <input type="file" @change="getFile($event)" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('form')">立即创建</el-button>
      <el-button @click="resetForm('form')">取消</el-button>
    </el-form-item>
  </el-form>
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
        note:'',
      },
      rules:{
          appid:[
               { required: true, message: '请输入软件的Appid', trigger: 'blur' },
          ],
          version:[
               { required: true, message: '请输入软件的版本号', trigger: 'blur' },
          ],
          versionnumber:[
               { required: true, message: '请输入版本号简写', trigger: 'blur' },
          ],
          note:[
               { required: true, message: '请输入更新内容', trigger: 'blur' },
          ]
      }
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
    submit(formName) {
        this.$refs[formName].validate((valid) => {
            console.log("valid",valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });  
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
.elform {
  width: 30%;
}
</style>