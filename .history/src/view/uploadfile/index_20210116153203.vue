<template>
  <!--文件上传表单-->
  <form>
    <!-- <input type="text" value="" v-model="name" placeholder="请输入用户名" /> -->
    <!-- <input type="text" value="" v-model="age" placeholder="请输入年龄" /> -->
    <input type="file" @change="getFile($event)" />
    <!-- <input type="file" @change="getFile2($event)" /> -->
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
        url: "http://localhost:33527/MultiFileAppUpload",
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