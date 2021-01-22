<template>
  <div>
    <el-row>
      <el-button type="primary" :loading="isloading" @click="goIndexpage()">主要按钮</el-button>
    </el-row>
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsitePage",
  data() {
    return {
      isloading: false,
    };
  },
  methods: {
    // 跳转到index页面
    goIndexpage: function () {
      this.isloading = true;
      setTimeout(() => {
        this.$router.push({ name: "IndexPage", params: { id: "150" } });
      }, 2000);
    },
  },
};
</script>

<style>
</style>