<template>
    <div>

    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.loaddata();
    },
    methods:{
        loaddata:function(){
            this.$get({
                url:this.$ApiList.LoaddataOrderList,
            })
            .then((res)=>{
                console.log("res",res);
            })
            .catch((err)=>{
                console.log("err",err)
            })
        }
    }
}
</script>

<style scoped>


</style>