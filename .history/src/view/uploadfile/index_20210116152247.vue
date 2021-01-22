<template>
  <!--文件上传表单-->
  <form>
    <input type="text" value="" v-model="name" placeholder="请输入用户名" />
    <input type="text" value="" v-model="age" placeholder="请输入年龄" />
    <input type="file" @change="getFile($event)" />
    <input type="file" @change="getFile2($event)" />
    <button @click="submit($event)">提交</button>
  </form>
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
    };
  },
  methods: {
    // 清空表单
    clear() {
      // 清空附件
      this.$refs.upload.clearFiles();
    },

    // 附件检查
    // 检查附件是否属于可上传类型
    // 检查附件是否超过限制大小
    checkFile() {
      var flag = true;
      var tip = "";
      var files = this.$refs.upload.uploadFiles;
      files.forEach((item) => {
        // 文件过大
        if (item.size > this.fileSize * 1024 * 1024) {
          flag = false;
          tip = " 文件超过" + this.fileSize + "M";
        }
        // 文件类型不属于可上传的类型
        if (!this.fileType.includes(lastSubstring(item.name, "."))) {
          flag = false;
          tip = " 文件类型不可上传";
        }
      });
      if (!flag) {
        message("error", tip);
      }
      return flag;
    },

    // 提交附件
    submitUpload() {
      let aa = this.$refs.upload.uploadFiles;
      console.log("aa", aa);
      this.$ajax({
        method: "post",
        url: "http://localhost:33527/MultiFileUpload",
        data: aa,
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

    // 自定义文件上传方法
    uploadFile(file) {
      // 把文件放入 FormData 进行提交
      const param = new FormData();
      param.append("files", file.file);
      uploadFile(param).then((response) => {
        // TODO 一些关闭弹框，上传成功提示等
      });
    },

    // 移除附件
    handleRemove(file, fileList) {
      console.log("移除附件...");
    },

    // 附件上传失败，打印下失败原因
    onError(err) {
      message("error", "附件上传失败");
      console.log(err);
    },

    // 字符串重组
    strRebuild(str) {
      return strRebuild(str);
    },
  },
};
</script>

<style scoped>
</style>