<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9" disabled>备选项</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      radio: 3,
    };
  },
};
</script>

<style>
</style>
