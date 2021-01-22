<template>
  <div>
    <el-button @click="hanldeAdd()">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="250"
      :default-sort="{ prop: 'date', order: 'descending' }"
      ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55" prop=""> </el-table-column>
      <el-table-column prop="dishname" label="姓名" sortable width="120">
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable width="120">
      </el-table-column>
      <el-table-column prop="score" label="评分" sortable width="120">
      </el-table-column>
      <el-table-column prop="remarks" label="最新评价" sortable width="120">
      </el-table-column>
      <el-table-column prop="time" label="所需时间" sortable width="120">
      </el-table-column>
      <el-table-column prop="windows" label="窗口" sortable width="120">
      </el-table-column>
      <el-table-column prop="updatetime" label="创建时间" sortable width="120">
      </el-table-column>
      <el-table-column label="图片" sortable show-overflow-tooltip>
        <template slot-scope="scope">
          <img
            :src="scope.row.imagesrc"
            width="40"
            height="40"
            class="head_pic"
          />
          　　</template
        >
      </el-table-column>
    </el-table>

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
export default {
  name: "TablePage",
  data() {
    return {
      dialogAdd: {
        show: false,
      },
      tableData: [],
      windowid: "",
      multipleSelection: [],
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    // 时间戳获取时间
    gettime(num) {
      // 定义一个变量，类型为Date类型
      let date = new Date();
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000，
      if (num.toString().length == 10) {
        date = new Date(num * 1000);
      } else {
        date = new Date(num);
      }
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM; //月补0
      let d = date.getDate();
      d = d < 10 ? "0" + d : d; //天补0
      let h = date.getHours();
      h = h < 10 ? "0" + h : h; //小时补0
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m; //分钟补0
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s; //秒补0
      // return y + '-' + MM + '-' + d; //年月日
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s; //年月日时分秒
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
              item.updatetime = this.gettime(item.updatetime);
              console.log("item.updatetime", item.updatetime);
            });
            this.tableData = res.data.table;
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    hanldeAdd() {
      //添加
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