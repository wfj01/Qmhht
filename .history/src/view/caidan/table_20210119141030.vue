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
      <el-table-column type="selection" width="55"> </el-table-column>
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
      <el-table-column
        prop="imagesrc"
        label="图片"
        sortable
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <!-- 使用这个组件 -->
    <!-- <AddUser :dialogAdd="dialogAdd" @update="getUserInfo"></AddUser> -->
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
import AddUser from "@/components/add/adduser.vue"; //引入组件
export default {
  name:'TablePage',
  components: {
    AddUser,
  },
  data() {
    return {
      dialogAdd: {
        show: false,
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1514 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
  },
  mounted(){
    this.loaddata()
  },
  methods: {

    // 加载表格数据
    loaddata:function(){
      this.$get({
        url:this.$ApiList.getTableList,
        data:{
          windowid:windowid
        }
      })
      .then((res)=>{
        console.log("res",res)
      })
      .catch((err)=>{
        console.log("err",err)
      })
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