<template>
  <div>
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
    
    </el-form>
    文件上传表单
    <form>
      <input type="text" value="" v-model="appid" placeholder="请输入appid" />
      <input
        type="text"
        value=""
        v-model="version"
        placeholder="请输入version"
      />
      <input
        type="text"
        value=""
        v-model="versionnumber"
        placeholder="请输入versionnumber"
      />
      <textarea @input="changenote"></textarea>
      <input type="file" @change="getFile($event)" />
      <!-- <input type="file" @change="getFile2($event)" /> -->
      <button @click="submit($event)">提交</button>
    </form>
  </div>
</template>

<script>
import { strRebuild, lastSubstring } from "@/utils/strUtil";
import { message } from "@/utils/message";
import axios from "axios";
export default {
  data() {
    return {
      //文件
      file: "",
      file2: "",
      appid: "",
      version: "",
      versionnumber: "",
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
    submit(event) {
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.file);
      this.$ajax({
        method: "post",
        url:
          "http://localhost:33527/MultiFileAppUpload?appid=" +
          this.appid +
          "&version=" +
          this.version +
          "&versionnum=" +
          this.versionnumber +
          "&note=" +
          this.note,
        data: formData,
      }).then((resp) => {
        if (resp.data.flag != true) {
          // 失败
          this.$message({
            message: "上传药材图片失败",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>