<template>
  <div>
    <el-button type="primary" :loading="isloading" @click="open"
      >退出登录</el-button
    >
  </div>
</template>

<script>
export default {
    data(){
        return{
            isloading:false
        }
    },
    methods:{
        open() {
        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      }
    }
}
</script>

<style scoped>
</style>