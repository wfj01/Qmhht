 <template>
  <div>
    <el-button style="margin-bottom: 10px" @click="hanldeAdd('add', '')"
      >添加</el-button
    >
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="480"
      border
      v-loading="loading"
      :element-loading-text="loadingtext"
      element-loading-spinner="el-icon-loading"
      @filter-change="filterTagTable"
    >
      <el-table-column label="序号" width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column
        prop="source"
        label="作者"
        width="180"
        :filters="sourceList"
        :filter-method="filterHandler"
        column-key="source"
      >
      </el-table-column>
      <el-table-column
        prop="jianjie"
        label="简介"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="datatime" label="创建日期" width="180" sortable>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="hanldeAdd('editor', scope.row)"
            type="text"
            size="small"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      loadingtext: "加载中...",
      sourceList: [],
      pageSize: 10,
      pageNo: 1,
      totalSum: [],
      Sum: 0,
      fenyeList: [],
      buloading: false,
      bb:[],
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    filterTagTable(filters) {
      console.log("filters", filters);
      this.tableData = [];
      let source = filters.source;
      source.forEach((item) => {
        this.shaixuan(item); // 筛选所选项下的所有数据，需要调用后端接口
      });
    },

    // 筛选数据
    shaixuan: function (source) {
      var that = this;
      this.$get({
        url: this.$ApiList.ShaixuanNoticeText,
        data: {
          source: source,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.rtnCode === 0) {
            res.data.table.forEach((item, index) => {
              item.datatime = this.$gettime(item.datatime);
              that.bb.push(item);
            });
            console.log("bb",that.bb.length)
            if (that.bb.length > 10) {
              that.fenyeList = this.fenye(that.bb, 10);
              console.log("fenyeList", that.fenyeList);
              that.fenyeList[this.pageNo - 1].forEach((item) => {
                this.tableData.push(item);
              });
            }else{
              this.tableData = that.bb
            }
            that.Sum = this.tableData.length;

            setTimeout(() => {
              this.loading = false;
              this.loadingtext = "加载完成";
            }, 2500);
            setTimeout(() => {
              this.loading = false;
              this.loadingtext = "加载完成";
            }, 2500);
          } else {
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
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
    // 增加数据
    hanldeAdd: function (type, text) {
      console.log("shuju", type, text.nid);
      if (type === "add") {
        this.$router.push({
          name: "NoticeDetail",
          params: { type: type },
        });
      } else {
        this.$router.push({
          name: "NoticeDetail",
          params: { id: text.nid, type: type },
        });
      }
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
        url: this.$ApiList.GetNoticeList,
      })
        .then((res) => {
          console.log(res);
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
              item.datatime = this.$gettime(item.datatime);
              let aa = {};
              aa.text = item.source;
              aa.value = item.source;
              bb.push(aa);
            });
            this.sourceList = this.unique(bb);
            setTimeout(() => {
              this.loading = false;
              this.loadingtext = "加载完成";
            }, 2500);
            setTimeout(() => {
              this.loading = false;
              this.loadingtext = "加载完成";
            }, 2500);
          } else {
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
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
  },
};
</script>
<style scoped>
.jianjie {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.columnstyle {
  width: 100px;
}
.block {
  text-align: right;
  margin-top: 10px;
}
</style>