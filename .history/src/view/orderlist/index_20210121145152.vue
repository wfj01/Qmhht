<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="客户昵称" width="180"> </el-table-column>
      <el-table-column prop="name" label="客户姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180"> </el-table-column>
      <el-table-column prop="address" label="客户地址" width="180"> </el-table-column>
      <el-table-column prop="windows" label="购买窗口" width="180"> </el-table-column>
      <el-table-column prop="time" label="所需时间" width="180"> </el-table-column>
      <el-table-column prop="price" label="商品单价" width="180"> </el-table-column>
      <el-table-column prop="sumprice" label="商品总价" width="180"> </el-table-column>
      <el-table-column prop="number" label="商品数量" width="180"></el-table-column>
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