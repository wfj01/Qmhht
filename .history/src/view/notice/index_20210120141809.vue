 <template>
  <el-table
    :data="tableData"
    style="width: 100%"
    max-height="480"
    border
    v-loading="loading"
    :element-loading-text="loadingtext"
    element-loading-spinner="el-icon-loading"
  >
    <el-table-column label="序号" width="85">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180"> </el-table-column>
    <el-table-column prop="source" label="作者" width="180"> </el-table-column>
    <el-table-column prop="jianjie" label="简介" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="datatime" label="创建日期" width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      loadingtext: "加载中...",
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    loaddata: function () {
      this.$get({
        url: this.$ApiList.GetNoticeList,
      })
        .then((res) => {
          console.log(res);
          if (res.rtnCode === 0) {
            res.data.table.forEach((element) => {
              element.datatime = this.$gettime(element.datatime);
            });
            this.tableData = res.data.table;
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
</style>