<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="hanldeCancel()"
      >返回</el-button
    >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="display: flex; justify-content: flex-end"
    >
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入内容" v-model="form.title" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="作者" prop="man">
        <el-input placeholder="请输入内容" v-model="form.man" clearable>
        </el-input>
      </el-form-item>
    </el-form>
    <quillEditor
      v-model="editortext"
      @change="ChangeText"
      class="editorview"
    ></quillEditor>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      form: {
        title: "",
        man: "",
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        man: [{ required: true, message: "请输入作者姓名", trigger: "change" }],
      },
    };
  },
  methods: {
    // 返回上一页
    hanldeCancel: function () {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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