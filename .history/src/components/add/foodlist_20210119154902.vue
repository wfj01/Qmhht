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
        <img :src="form.imagesrc"  width="100" height="100" >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    form: Object,
  },
};
</script>

<style scoped>
</style>