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
      <el-input v-model="form.windows"></el-input>
    </el-form-item>
    <el-form-item label="所需时间">
      <el-input v-model="form.time"></el-input>
    </el-form-item>
    <el-form-item label="初始数量">
      <el-input v-model="form.number"></el-input>
    </el-form-item>
    <el-form-item label="照片">
      <el-image :src="form.imagesrc">
        <div slot="error" class="image-slot">
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
  fileChange(e){
      // 通过DOM取文件数据
      const file = this.$refs.file.files[0]
      // 计算文件大小 KB
      const size = Math.floor(file.size / 1024)
      // 显示本地图片
      this.img = window.URL.createObjectURL(file)

      // 使用 FormData 构建表单数据
      const formData = new FormData()
      formData.append('file', file)
      console.log("formData",formData)
  }
};
</script>

<style scoped>
</style>