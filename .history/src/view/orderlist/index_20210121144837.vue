<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" width="180"> </el-table-column>
      <el-table-column prop="updatetime" label="完成日期" width="180"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    loaddata: function () {
      this.$get({
        url: this.$ApiList.LoaddataOrderList,
      })
        .then((res) => {
          console.log("res", res);
          res.data.table.forEach((item) => {
            item.updatetime = this.$gettime(item.updatetime);
          });
          this.tableData = res.data.table;
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