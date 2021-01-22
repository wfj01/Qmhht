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
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    getFile2(event) {
      this.file2 = event.target.files[0];
      console.log(this.file2);
    },
  },
};
</script>

<style scoped>
</style>