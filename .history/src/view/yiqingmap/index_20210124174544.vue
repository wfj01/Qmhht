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
      geoCoordMap: "",
      regions: "",
      isShow: false,
      mydata: [],
    };
  },
  mounted() {
    this.loaddata();
    (this.regions = regions),
      (this.geoCoordMap = {
        //全国市区
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
      });
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
          //鼠标放上去提示
          trigger: "item",
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