<template>
  <el-form :model="form" ref="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.dishname"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="评分">
      <el-input v-model="form.score"></el-input>
    </el-form-item>
    <el-form-item label="窗口">
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- <el-input v-model="form.windows"></el-input> -->
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remarks"></el-input>
    </el-form-item>
    <el-form-item label="所需时间">
      <el-input v-model="form.time"></el-input>
    </el-form-item>
    <el-form-item label="初始数量">
      <el-input v-model="form.number"></el-input>
    </el-form-item>
    <el-form-item label="照片">
      <el-image :src="form.imagesrc" @click="selectFile">
        <div slot="error" class="image-slot" @click="selectFile">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <input
        type="file"
        ref="file"
        style="display: none"
        @change="fileChange"
      />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    form: Object,
  },
  data() {
    return {
      selectdata: {},
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }],
        value: ''
    };
  },
  methods: {
    // 选择文件
    selectFile() {
      this.$refs.file.click();
    },
    fileChange(e) {
      var that = this;
      var file = e.target.files[0];
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", file);
      console.log("file", file);
      console.log("formData", formData);
      this.$post({
        url: this.$ApiList.getUploadApp,
        data: formData,
      })
        .then((res) => {
          if (res.isSuccess == true) {
            that.selectdata.imagesrc =
              "http://42.193.106.104:8001/" + res.filePathArray[0].filePath;
            this.$emit("selectdatafun", that.selectdata.imagesrc);
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
</style>