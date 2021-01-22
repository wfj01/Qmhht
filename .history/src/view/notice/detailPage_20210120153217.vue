<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="hanldeCancel()"
      >返回</el-button
    >
    <el-form>
      <el-form-item>
        <label for="">标题</label>
        <el-input placeholder="请输入内容" v-model="title" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <label for="">作者</label>
        <el-input placeholder="请输入内容" v-model="man" clearable>
        </el-input>
      </el-form-item>
    </el-form>
    <quillEditor
      v-model="editortext"
      @change="ChangeText"
      class="editorview"
    ></quillEditor>
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
      title:'',
      man:''
    };
  },
  methods: {
    // 返回上一页
    hanldeCancel: function () {
      this.$router.go(-1);
    },

    // 获取数据
    ChangeText: function (e) {
      console.log("获取数据", this.editortext);
      console.log("获取数据", e);
    },
  },
};
</script>

<style scoped>
.editorview {
  background-color: #ffffff;
  height: 450px;
  border: 1px solid #cccccc;
  border-radius: 10px;
}
</style>