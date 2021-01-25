<template>
    <div>
        <div id="container">
        </div>
    </div>
</template>
<script>
    export default {
        created(){
        },
        mounted(){
            var _this = this;
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    //locationSuccess 获取成功的话
                    function(position) {
                        _this.getLongitude = position.coords.longitude; 
                        _this.getLatitude = position.coords.latitude;    
                        console.log(_this.getLongitude)　　　　　 //弹出经度测试
                        console.log(_this.getLatitude)
                        
                    },
                    //locationError  获取失败的话
                    function(error) {
                        var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
                        alert(errorType[error.code - 1]);
                    }
                );
            }
        },
        methods:{
        }
    }
</script>