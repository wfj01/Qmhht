<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="display: flex; justify-content: flex-end"
      :rules="rules"
    >
      <el-form-item label="标题" prop="Title">
        <el-input placeholder="请输入内容" v-model="form.Title" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="作者" prop="Source">
        <el-input placeholder="请输入内容" v-model="form.Source" clearable>
        </el-input>
      </el-form-item>
    </el-form>
    <quillEditor
      v-model="Details"
      @change="ChangeText"
      class="editorview"
    ></quillEditor>
    <div class="bottombutton">
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="hanldeCancel()">返回</el-button>
    </div>
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
      Details: "",
      Jianjie:'',
      form: {
        Title: "",
        Source: "",
      },
      rules: {
        Title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        Source: [{ required: true, message: "请输入作者姓名", trigger: "blur" }],
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
            if(this.Details === ''){
                this.$message.warning('请输入文章内容');
                return;
            }
            else{

            }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取数据
    ChangeText: function (e) {
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
.bottombutton {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>