<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="hanldeAdd()">返回</el-button>
    <quillEditor v-model="editortext" @change="ChangeText"></quillEditor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      editortext: "",
    };
  },
  methods: {
    ChangeText: function (e) {
      console.log("获取数据", this.editortext);
      console.log("获取数据", e);
    },
  },
};
</script>

<style scoped>
</style>