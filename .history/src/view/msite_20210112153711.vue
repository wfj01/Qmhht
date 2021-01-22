<template>
  <div>
    <el-row>
      <el-button type="primary" @click="goIndexpage()">主要按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MsitePage",
  data() {
    return {};
  },
  methods: {
    // 跳转到index页面
    goIndexpage: function () {
      this.$router.push({ name: "IndexPage", params: { id: "1" } });
    },
  },
};
</script>

<style>
</style>