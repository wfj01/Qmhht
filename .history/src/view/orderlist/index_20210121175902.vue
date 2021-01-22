<template>
  <div>
    <el-switch
      style="display: block; margin-bottom: 20px"
      v-model="isCaozuo"
      active-color="#409eff"
      inactive-color="#13ce66"
      active-text="开启操作"
      inactive-text="隐藏操作"
    >
    </el-switch>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      max-height="480"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderid" label="订单编号" width="80">
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
      <el-table-column label="查看评价" width="100">
        <template slot-scope="scope">
          <el-button @click="LookPinglun(scope.row)">
            详情
          </el-button></template
        ></el-table-column
      >
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        class="caozuo"
        v-if="isCaozuo"
      >
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
    <el-dialog title="查看评价" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form>
          <el-form-item label="评价内容">
            <el-input v-model="pingjia" disabled></el-input>
          </el-form-item>
          <el-form-item label="评分">
           
            <el-rate
              v-model="pingfen"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </el-form-item>
          <el-form-item label="客户晒图"> </el-form-item>
          <div class="imageList">
            <el-image
              v-for="(item, index) in pingjiaimage"
              :key="index"
              :src="item"
              class="imageitem"
            ></el-image>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Sum: 0,
      tableData: [],
      isCaozuo: true,
      dialogVisible: false,
      pingjia: "",
      pingfen: "",
      pingjiadate: "",
      pingjiaimage: [],
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    // 查看评价
    LookPinglun: function (row) {
      console.log(row.pingfen != null, row.pinjiaimage);
      if (row.pingfen !== null) {
        this.pingjia = row.pingjia;
        this.pingfen = row.pingfen;
        this.pingjiaimage = JSON.parse(row.pinjiaimage);
        console.log("pingjiaimage", row.pinjiaimage);
        this.pingjiadate = this.$gettime(row.pinjiaimage);
        this.dialogVisible = true;
      } else {
        this.$message.warning("此条订单还没有完成");
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.tableData = [];
      this.fenyeList = this.fenye(this.totalSum, this.pageSize);
      this.fenyeList[0].forEach((item) => {
        this.tableData.push(item);
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.tableData = [];
      this.fenyeList[this.pageNo - 1].forEach((item) => {
        this.tableData.push(item);
      });
      console.log(
        "测试数据",
        this.pageSize - 1,
        this.tableData,
        this.fenyeList
      );
    },

    // 加载数据
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
.imageList {
  display: table;
  width: 100%;
}
.imageitem {
  width: 31.3%;
  margin: 0 1%;
  height: 150px;
}
</style>