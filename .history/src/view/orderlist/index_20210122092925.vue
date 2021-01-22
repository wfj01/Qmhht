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
      v-loading="loading"
      :element-loading-text="loadingtext"
      element-loading-spinner="el-icon-loading"
      max-height="480"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <!-- <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column> -->
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
      <el-table-column
        prop="updatetime"
        fixed="left"
        label="完成日期"
        width="180"
      >
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
          <el-popconfirm title="这是一段内容确定删除吗？" @confirm="handleDelete(scope.row)">
            <el-button
                type="danger"
                slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
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
        <el-form label-width="70px">
          <el-form-item label="评分">
            <el-rate
              v-model="pingfen"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
              class="rateClass"
            >
            </el-rate>
          </el-form-item>

          <el-form-item label="评价内容">
            <div class="pingjiaText">{{ pingjia }}</div>
          </el-form-item>
          <el-form-item label="评价时间">
            <div class="pingjiaText">{{ pingjiadate }}</div>
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
      Sum: 0,
      loading: false,
      loadingtext: "加载中...",
      pageNo: 1,
      pageSize: 10,
      totalSum: 0,
      pingjiadata: "",
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    // 删除一条订单

    // 查看评价
    LookPinglun: function (row) {
      console.log(row.pingfen != null, row.pinjiaimage);
      if (row.pingfen !== null) {
        this.pingjia = row.pingjia;
        this.pingfen = row.pingfen;
        this.pingjiaimage = JSON.parse(row.pinjiaimage);
        console.log("pingjiaimage", row.pinjiaimage);
        this.pingjiadate = this.$gettime(row.pingjiadate);
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

    // 分页数据封装
    fenye: function (List, pageSize) {
      var result = [];
      let Sum = List.length;
      for (let i = 0; i < Sum; i += pageSize) {
        result.push(List.slice(i, i + pageSize)); // 每10项分成一组
      }
      return result;
      console.log("result", result);
    },

    // 将数据分装
    unique: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].text == arr[j].text) {
            //第一个等同于第二个，splice方法删除第二个
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },

    // 加载数据
    loaddata: function () {
      var that = this;
      this.$get({
        url: this.$ApiList.LoaddataOrderList,
      })
        .then((res) => {
          console.log("res", res);
          that.totalSum = res.data.table;
          that.Sum = res.data.table.length;
          res.data.table.forEach((item) => {
            item.beizhu = item.ladu + "," + item.guige1;
            item.updatetime = this.$gettime(item.updatetime);
          });
          that.fenyeList = this.fenye(that.totalSum, 10);
          that.fenyeList[this.pageNo - 1].forEach((item) => {
            that.tableData.push(item);
          });

          setTimeout(() => {
            this.loading = false;
            this.loadingtext = "加载完成";
          }, 2500);
          setTimeout(() => {
            this.loading = false;
            this.loadingtext = "加载完成";
          }, 2500);
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
.rateClass {
  padding: 6px 0;
  box-sizing: border-box;
}
.pingjiaText {
  color: #007aff;
}
</style>