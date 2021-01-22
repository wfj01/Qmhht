<template>
  <div>
    <el-button style="margin-bottom: 10px" @click="hanldeAdd()">添加</el-button>
    <el-button style="margin-bottom: 10px" @click="clearFilter"
      >清除所有过滤器</el-button
    >
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      max-height="480"
      :default-sort="{ prop: 'date', order: 'descending' }"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      :element-loading-text="loadingtext"
      element-loading-spinner="el-icon-loading"
    >
      >
      <el-table-column label="序号" width="85">
        <!--slot-scope="scope" 这里取到当前单元格,scope.$index就是索引 默认从0开始这里从1开始-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dishname" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable width="120">
      </el-table-column>
      <el-table-column prop="score" label="评分" sortable width="120">
      </el-table-column>
      <el-table-column prop="time" label="所需时间" sortable width="120">
      </el-table-column>
      <el-table-column
        prop="windows"
        label="窗口"
        width="120"
        :filters="windowsList"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column class="columnstyle" label="图片">
        <div slot-scope="scope" style="width: 80px">
          <img :src="scope.row.imagesrc" width="40" height="40" />
          　　
        </div>
      </el-table-column>
      <el-table-column prop="updatetime" label="创建时间" sortable width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-popconfirm
            title="是否确定要删除这条数据？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            @confirm="handleClick(scope.row)"
          >
            <el-button slot="reference" type="text" size="small"
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
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <FoodList :form="selectdata" @selectdatafun="selectdatafun"></FoodList>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="CloseDialog()" :loading="buloading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FoodList from "@/components/add/foodlist";
export default {
  name: "TablePage",
  components: {
    FoodList: FoodList,
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      windowid: "",
      multipleSelection: [],
      selectdata: {},
      datatime: "",
      loading: true,
      loadingtext: "加载中...",
      windowsList: [],
      pageSize: 10,
      pageNo: 1,
      totalSum: [],
      Sum: 0,
      fenyeList: [],
      buloading: false,
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
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
    selectdatafun: function (data) {
      console.log("data", data);
      this.selectdata.imagesrc = data;
    },

    // 关闭弹窗
    CloseDialog: function () {
      this.buloading = true;
      this.$post({
        url: this.$ApiList.getCaidanList,
        data: this.selectdata,
      })
        .then((res) => {
          console.log("res", res);
          if (res.rtnCode === 0) {
            this.dialogVisible = false;
            this.datatime = this.$gettime(res.data);
            setTimeout(() => {
              this.$notify({
                title: this.datatime,
                message: "新增一条数据成功",
                type: "success",
              });
            }, 1500);

            this.loaddata();
          } else {
            this.$message.error("数据新增失败");
          }
          this.buloading = false;
        })
        .catch((err) => {
          console.log("err", err);
          this.buloading = false;
        });
    },

    // 获取当前编辑列表格数据
    handleEdit: function (list) {
      console.log("list", list);
      this.selectdata = list;
      this.dialogVisible = true;
    },

    // 查看当前列表格数据
    handleClick(row) {
      console.log(row.id);
      this.$get({
        url: this.$ApiList.removeList,
        data: {
          id: row.id,
        },
      })
        .then((res) => {
          console.log("res", res);
          if (res.rtnCode === 0) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
          }
          this.loaddata();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
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

    fenye: function (List, pageSize) {
      var result = [];
      let Sum = List.length;
      for (let i = 0; i < Sum; i += pageSize) {
        result.push(List.slice(i, i + pageSize)); // 每10项分成一组
      }
      return result;
      console.log("result", result);
    },

    // 加载表格数据
    loaddata: function () {
      var that = this;
      this.$get({
        url: this.$ApiList.getTableList,
        data: {
          windowid: this.windowid,
        },
      })
        .then((res) => {
          if (res.rtnCode === 0) {
            let bb = [];
            this.tableData = [];
            that.Sum = res.data.table.length;
            that.totalSum = res.data.table;
            that.fenyeList = this.fenye(that.totalSum, 10);
            that.fenyeList[this.pageNo - 1].forEach((item) => {
              this.tableData.push(item);
            });
            res.data.table.forEach((item, index) => {
              item.updatetime = this.$gettime(item.updatetime);
              let aa = {};
              aa.text = item.windows;
              aa.value = item.windows;
              bb.push(aa);
            });
            this.windowsList = this.unique(bb);
            setTimeout(() => {
              this.loading = false;
              this.loadingtext = "加载完成";
            }, 2500);
          } else {
            this.$message({
              showClose: true,
              message: res.rtnMsg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    //添加
    hanldeAdd() {
      this.selectdata = {};
      this.dialogVisible = true;
    },
    formatter(row, column) {
      return row.address;
    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter();
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style scoped>
.columnstyle {
  width: 100px;
}
.block {
  text-align: right;
  margin-top: 10px;
}
</style>