 <template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="180"> </el-table-column>
    <el-table-column prop="source" label="作者"> </el-table-column>
    <el-table-column prop="jianjie" label="简介" width="180"> </el-table-column>
    <el-table-column prop="datatime" label="创建日期" width="180"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
      this.loaddata();
  },
  methods:{
      loaddata:function(){
          this.$get({
              url:this.$ApiList.GetNoticeList,
          })
          .then((res)=>{
              console.log(res);
              if(res.rtnCode === 0){
                  res.data.table.forEach(element => {
                      element.datatime =  this.$gettime(element.datatime)
                  });
                  this.tableData = res.data.table;
              }
              else{

              }
          })
          .catch((err)=>{
              console.log("err",err)
          })
      }
  }
};
</script>
  <style scoped>
</style>