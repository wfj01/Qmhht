<template>
  <div>
    <el-row>
      <el-button type="primary" :loading="isloading" @click="goIndexpage()">主要按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MsitePage",
  data() {
    return {
        isloading:false
    };
  },
  methods: {
    // 跳转到index页面
    goIndexpage: function () {
      this.$router.push({ name: "IndexPage", params: { id: "150" } });
    },
  },
};
</script>

<style>
</style>