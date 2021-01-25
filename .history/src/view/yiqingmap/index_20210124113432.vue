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
import regions from './mapcity';
export default {
  name: "mapChina",
  data() {
    return {
      cityData: "",
      sortCityData: "",
      geoCoordMap: "",
      regions: "",
      isShow:false,
    };
  },
  mounted() {
    this.loaddata();
    this.cityData = [
      //每个散点的数据
      { name: "海门", value: 9 },
      { name: "鄂尔多斯", value: 12 },
      { name: "招远", value: 12 },
      { name: "舟山", value: 12 },
      { name: "齐齐哈尔", value: 14 },
      { name: "盐城", value: 15 },
      { name: "赤峰", value: 16 },
      { name: "青岛", value: 18 },
      { name: "乳山", value: 18 },
      { name: "金昌", value: 19 },
      { name: "泉州", value: 21 },
      { name: "莱西", value: 21 },
      { name: "日照", value: 21 },
      { name: "胶南", value: 22 },
      { name: "南通", value: 23 },
      { name: "拉萨", value: 24 },
      { name: "云浮", value: 24 },
      { name: "梅州", value: 25 },
      { name: "文登", value: 25 },
      { name: "上海", value: 25 },
    ];
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
    this.sortCityData = this.cityData
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .slice(0, 6);
    this.mapFn();
  },
  methods: {

    loaddata:function(){
      this.$get({
        url:this.$ApiList.getloaddataMap,
        header:{"authoration":"apicode","apicode":"adec68dcd625445f859dde53857bacdc"}
      })
      .then((res)=>{
        console.log("res",res)
      })
      .catch((err)=>{
        console.log("err",err)
      })
    },

    goMap:function(){
      this.isShow != this.isShow;
    },
    mapFn() {
      // 基于准备好的dom，初始化echarts实例
      var mapBoxEchart = this.$echarts.init(
        document.getElementById("mapChart")
      );
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
            tooltip: {//鼠标放上去提示语
                trigger: 'item',
                "confine": true,
                "formatter": (p)=>{//自定义提示信息
                    let dataCon = p.data;
                    txtCon ='其它城市<br>' + dataCon.name+':'+dataCon.value[2];
                    return txtCon;
                }
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
            // tooltip: {
            //     formatter: (p)=>{
            //         let dataCon = p.data;
            //         txtCon ='前五城市<br>' + dataCon.name+':'+dataCon.value[2];
            //         return txtCon;

            //     },
            //     position: 'right'
            // },
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