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
      class="editorview aa"
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
      Jianjie: "",
      form: {
        Title: "",
        Source: "",
      },
      rules: {
        Title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        Source: [
          { required: true, message: "请输入作者姓名", trigger: "blur" },
        ],
      },
      id:'',
      tableData:{}
    };
  },
  mounted(){
      this.id = this.$route.params.id;
      console.log("this.id",this.id)
  },
  methods: {
    // 返回上一页
    hanldeCancel: function () {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.Details === "") {
            this.$message.warning("请输入文章内容");
            return;
          } else {
            this.form.Details = this.Details;
            this.form.Jianjie = this.Jianjie;
            console.log("this.form", this.form);
            this.$post({
              url: this.$ApiList.AddNoticeText,
              data: this.form,
            }).then((res) => {
              if (res.rtnCode === 0) {
                setTimeout(() => {
                  this.$notify({
                    message: "新增一条数据成功",
                    type: "success",
                  });
                }, 1500);
              } else {
                this.$message.error("数据新增失败");
              }
            });
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
      this.Jianjie = e.text;
    },
    // 加载数据
    loaddata: function (id) {
      this.$get({
        url: this.$ApiList.GetNoticeList,
        data:{id:id}
      })
        .then((res) => {
          console.log(res);
          if (res.rtnCode === 0) {
            res.data.table.forEach((element) => {
              element.datatime = this.$gettime(element.datatime);
            });
            this.tableData = res.data.table[0];
            this.form.Title = this.tableData.title;
            this.form.Source = this.tableData.Source;
            setTimeout(() => {
              this.loading = false;
              this.loadingtext = "加载完成";
            }, 2500);
          } else {
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
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
  overflow-y: overlay;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-x: hidden;
  overflow-y: auto;
}
.bottombutton {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.editorview::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>