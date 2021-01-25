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
import { regions, geoCoordMap } from "./mapcity";
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
    // this.loaddata();
    this.mapFn();
  },
  methods: {
    // loaddata: function () {
    //   var that = this;
    //   this.$get({
    //     url: this.$ApiList.getloaddataMap,
    //   })
    //     .then((res) => {
    //       if (res.codeid === 10000) {
    //         res.retdata.forEach((item) => {
    //           if (item.subList.length > 0) {
    //             item.subList.forEach((iitem) => {
    //               if (iitem.city !== "境外输入") {
    //                 that.mydata.push(iitem);
    //               }
    //             });
    //           } else {
    //             that.mydata.push(item);
    //           }
    //         });
    //         // 获取地址坐标
    //         that.mydata.forEach((item) => {
    //           this.$get({
    //             url: this.$ApiList.getBaiduMap,
    //             data: {
    //               city: item.city,
    //             },
    //           }).then((res) => {
    //             if (res.status === "OK") {
    //               item.lng = res.result.location.lng;
    //               item.lat = res.result.location.lat;
    //             }
    //           });
    //         });
    //       }
    //       setTimeout(() => {
    //         console.log("that.mydata", that.mydata);
    //       }, 30000);
    //     })
    //     .catch((err) => {
    //       console.log("err", err);
    //     });
    // },

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
      mapBoxEchart.on("click", function (param) {
        console.log(param);
      });
      var data = this.cityData;
      var seriesData = [];
      var geoCoordMap = this.geoCoordMap;

      var convertData = function (data) {
        //散点值和市区经纬度组合
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
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
        series: [
          {
            name: "其它城市", //除前五外的城市
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(data),
            //symbol: point, //散点用背景图片，point为连接的图片地址
            symbolSize: function (val) {
              //设置散点大小
              //alert(val);
              return val[2] / (val[2] / 10);
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#ffff00", //除前五外的散点颜色
                fontSize: "12px",
              },
            },
          },
          {
            name: "前五城市", //数据前五的城市
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 5)
            ),
            symbolSize: function (val) {
              //设置散点大小
              return val[2] / (val[2] / 10);
            },
            showEffectOn: "render", //配置何时显示特效。可选：'render' 绘制完成后显示特效
            rippleEffect: {
              //涟漪特效相关配置
              brushType: "stroke", //波纹的绘制方式，可选 'stroke' 和 'fill'
            },
            hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
            },
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
              normal: {
                color: "#ffff00", //前五散点的颜色
                shadowBlur: 10,
                shadowColor: 20,
                fontSize: "12px",
              },
            },
            zlevel: 1,
          },
        ],
      };
      mapBoxEchart.setOption(option, true);
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
  },
  created() {},
  components: {},
};
</script>
<style scoped>
</style>