<template>
  <div>
    <div
      v-show="true"
      id="mapChart"
      class="mapChart"
      style="width: 100%; height: 100%; top: 2%; left: 0%"
    ></div>
  </div>
</template>

<script>
import regions from "./mapcity";
export default {
  name: "mapChina",
  data() {
    return {
      regions: "",
      isShow: false,
      mydata: [],
    };
  },
  mounted() {
    // this.loaddata();
    this.regions = regions;
    this.mapFn();
  },
  methods: {
    loaddata: function () {
      var that = this;
      this.$get({
        url: this.$ApiList.getloaddataMap,
      })
        .then((res) => {
          if (res.codeid === 10000) {
            res.retdata.forEach((item) => {
              if (item.subList.length > 0) {
                item.subList.forEach((iitem) => {
                  if (iitem.city !== "境外输入") {
                    that.mydata.push(iitem);
                  }
                });
              } else {
                that.mydata.push(item);
              }
            });
            // 获取地址坐标
            that.mydata.forEach((item) => {
              this.$get({
                url: this.$ApiList.getBaiduMap,
                data: {
                  city: item.city,
                },
              }).then((res) => {
                if (res.status === "OK") {
                  item.lng = res.result.location.lng;
                  item.lat = res.result.location.lat;
                }
              });
            });
           
          }
          setTimeout(() => {
            console.log("that.mydata",that.mydata)
          }, 30000);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // 获取地址坐标
    getAddressCode: function (address) {
      this.$axios({
        url:
          "http://api.map.baidu.com/geocoder?address=" +
          address +
          "&output=json&key=ccrbBUEq6Ai1FY3KxhdbFCjXdWZu2RF8",
        method: "get",
        params: {},
      }).then((res) => {
        console.log(res);
        if (res.address === "OK") {
          let codelist = {};
          codelist.lng = res.result.location.lng;
          codelist.lat = res.result.location.lat;
          return codelist;
        }
      });
    },
    goMap: function () {
      this.isShow != this.isShow;
    },
    mapFn() {
      // 基于准备好的dom，初始化echarts实例
      var mapBoxEchart = this.$echarts.init(
        document.getElementById("mapChart")
      );
      mapBoxEchart.on('click', function(param) {
        console.log(param)
      })
      var option = {
        //散点图标题
        tooltip: {
          formatter: function (params) { 
                var info = '<p style="font-size:18px">' + params.name + '</p><p style="font-size:14px">这里可以写一些，想展示在页面上的别的信息</p>' 
                return info; 
            }, 
          //鼠标放上去提示
          
        },
        geo: {
          //城市地图
          map: "china",
          show: true,
          roam: false, //禁止拖拽和伸缩 true为可拖拽
          label: {
            emphasis: {
              show: false,
            },
          },
          
          itemStyle: {
            formatter: function(params) {
            console.log(params)   //打印结果
            return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].data + '%'     //根据需要拼接
          },
            normal: {
              //地图背景色
              areaColor: "#034DE4",
              opacity: 0.5,
            },
            emphasis: {
              //鼠标放上去区域背景色
              areaColor: "#034DE4",
              opacity: 0.5,
            },
          },
          regions: this.regions, //地图上每个省份标不同颜色
        },
        backgroundColor: "#fff", //地图背景色
      };
      mapBoxEchart.setOption(option, true);
    },
  },
};
</script>
<style scoped>
</style>