<template>
  <div>
    <el-button @click="hanldeAdd()">添加</el-button>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      max-height="250"
      :default-sort="{ prop: 'date', order: 'descending' }"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column label="序号" width="85">
        <!--slot-scope="scope" 这里取到当前单元格,scope.$index就是索引 默认从0开始这里从1开始-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
             scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dishname" label="姓名" sortable width="120">
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable width="120">
      </el-table-column>
      <el-table-column prop="score" label="评分" sortable width="120">
      </el-table-column>
      <el-table-column prop="time" label="所需时间" sortable width="120">
      </el-table-column>
      <el-table-column prop="windows" label="窗口" sortable width="120">
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
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <FoodList :form="selectdata"></FoodList>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="resetDateFilter">清除日期过滤器</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
    </div>
  </div>
</template>

<script>
import FoodList from '@/components/add/foodlist';
export default {
  name: "TablePage",
  components:{
    FoodList:FoodList
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      windowid: "",
      multipleSelection: [],
      selectdata:{}
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    // 获取当前编辑列表格数据
    handleEdit: function (list) {
      console.log("list", list);
      this.selectdata = list;
      this.dialogVisible = true;
    },

    // 查看当前列表格数据
    handleClick(row) {
      console.log(row);
    },

    // 加载表格数据
    loaddata: function () {
      this.$get({
        url: this.$ApiList.getTableList,
        data: {
          windowid: this.windowid,
        },
      })
        .then((res) => {
          if (res.rtnCode === 0) {
            res.data.table.forEach((item, index) => {
              item.imagesrc = "http://42.193.106.104:8001/" + item.imagesrc;
              item.updatetime = this.$gettime(item.updatetime);
            });
            this.tableData = res.data.table;
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
      this.dialogAdd.show = true;
    },
    formatter(row, column) {
      return row.address;
    },
    resetDateFilter() {
      this.$refs.multipleTable.clearFilter("date");
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
</style>