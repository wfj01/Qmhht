<template>
  <div>
    <el-switch
      style="display: block; margin-bottom: 20px"
      v-model="value2"
      active-color="#409eff"
      inactive-color="#13ce66"
      active-text="开启操作"
      inactive-text="隐藏操作"
    >
    </el-switch>
    <el-table :data="tableData" style="width: 100%" border max-height="480" 
     :cell-style="{ textAlign: 'center' }"
     :header-cell-style="{textAlign: 'center'}">
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="客户昵称" width="100">
      </el-table-column>
      <el-table-column prop="name" label="客户姓名" width="100">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="客户地址"
        width="200"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="windows" label="购买窗口" width="100">
      </el-table-column>
      <el-table-column prop="time" label="所需时间" width="100">
      </el-table-column>
      <el-table-column prop="price" label="商品单价" width="100">
      </el-table-column>
      <el-table-column prop="sumprice" label="商品总价" width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        label="商品数量"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="beizhu"
        label="备注"
        width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="updatetime" label="完成日期" width="180">
      </el-table-column>
      <el-table-column class="columnstyle" label="图片">
        <div slot-scope="scope" style="width: 60px">
          　<el-image
            style="width: 40px; height: 40px"
            :src="scope.row.imageSrc"
          >
          </el-image
          >　
        </div>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" class="caozuo">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Sum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      value2: true,
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    //   加载数据
    loaddata: function () {
      this.$get({
        url: this.$ApiList.LoaddataOrderList,
      })
        .then((res) => {
          console.log("res", res);
          res.data.table.forEach((item) => {
            item.beizhu = item.ladu + "," + item.guige1;
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
.block {
  text-align: right;
  margin-top: 10px;
}
</style>