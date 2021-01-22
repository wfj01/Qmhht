<template>
    <div>
        <el-button type="primary" :loading="isloading">退出登录</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isloading:false
        }
    }
}
</script>

<style scoped>

</style>