<template>
  <div
    id="mapChart"
    class="mapChart"
    style="width: 100%; height: 100%; top: 2%; left: 0%"
  ></div>
</template>

<script>
export default {
  name: "mapChina",
  data() {
    return {
      cityData: "",
      sortCityData: "",
      geoCoordMap: "",
      regions: "",
    };
  },
  mounted() {
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
    (this.regions = [
      //给每个省份的区域加上背景色
      {
        name: "南海诸岛",
        itemStyle: {
          areaColor: "#6F798D",
          opacity: 0.5,
        },
      },
      {
        name: "北京",
        itemStyle: {
          areaColor: "#034DE4",
          opacity: 0.2,
        },
      },
      {
        name: "天津",
        itemStyle: {
          areaColor: "#034DE4",
          opacity: 0.2,
        },
      },
      {
        name: "上海",
        itemStyle: {
          areaColor: "#27E9FD",
          opacity: 0.2,
        },
      },
      {
        name: "重庆",
        itemStyle: {
          areaColor: "#0E7DEB",
          opacity: 0.2,
        },
      },
      {
        name: "河北",
        itemStyle: {
          areaColor: "#034DE4",
          opacity: 0.2,
        },
      },
      {
        name: "河南",
        itemStyle: {
          areaColor: "#034DE4",
          opacity: 0.2,
        },
      },
      {
        name: "云南",
        itemStyle: {
          areaColor: "#20CAF8",
          opacity: 0.2,
        },
      },
      {
        name: "辽宁",
        itemStyle: {
          areaColor: "#034DE4",
          opacity: 0.2,
        },
      },
      {
        name: "黑龙江",
        itemStyle: {
          areaColor: "#17A3F1",
          opacity: 0.2,
        },
      },
      {
        name: "湖南",
        itemStyle: {
          areaColor: "#0554E4",
          opacity: 0.2,
        },
      },
      {
        name: "安徽",
        itemStyle: {
          areaColor: "#27E8FD",
          opacity: 0.2,
        },
      },
      {
        name: "山东",
        itemStyle: {
          areaColor: "#4BFFFF",
          opacity: 0.2,
        },
      },
      {
        name: "新疆",
        itemStyle: {
          areaColor: "#17A3F1",
          opacity: 0.2,
        },
      },
      {
        name: "江苏",
        itemStyle: {
          areaColor: "#00b6f6",
          opacity: 0.2,
        },
      },
      {
        name: "浙江",
        itemStyle: {
          areaColor: "#00b6f6",
          opacity: 0.2,
        },
      },
      {
        name: "江西",
        itemStyle: {
          areaColor: "#01a4f1",
          opacity: 0.2,
        },
      },
      {
        name: "湖北",
        itemStyle: {
          areaColor: "#005ce5",
          opacity: 0.2,
        },
      },
      {
        name: "广西",
        itemStyle: {
          areaColor: "#0088ec",
          opacity: 0.2,
        },
      },
      {
        name: "甘肃",
        itemStyle: {
          areaColor: "#0042df",
          opacity: 0.2,
        },
      },
      {
        name: "山西",
        itemStyle: {
          areaColor: "#01d0fa",
          opacity: 0.2,
        },
      },
      {
        name: "内蒙古",
        itemStyle: {
          areaColor: "#00ccf7",
          opacity: 0.2,
        },
      },
      {
        name: "陕西",
        itemStyle: {
          areaColor: "#01b0f3",
          opacity: 0.2,
        },
      },
      {
        name: "吉林",
        itemStyle: {
          areaColor: "#0051e1",
          opacity: 0.2,
        },
      },
      {
        name: "福建",
        itemStyle: {
          areaColor: "#0158e3",
          opacity: 0.2,
        },
      },
      {
        name: "贵州",
        itemStyle: {
          areaColor: "#0199ef",
          opacity: 0.2,
        },
      },
      {
        name: "广东",
        itemStyle: {
          areaColor: "#00d9fc",
          opacity: 0.2,
        },
      },
      {
        name: "青海",
        itemStyle: {
          areaColor: "#005ae4",
          opacity: 0.2,
        },
      },
      {
        name: "西藏",
        itemStyle: {
          areaColor: "#01e9fd",
          opacity: 0.2,
        },
      },
      {
        name: "四川",
        itemStyle: {
          areaColor: "#0069e8",
          opacity: 0.2,
        },
      },
      {
        name: "宁夏",
        itemStyle: {
          areaColor: "#01b0f3",
          opacity: 0.2,
        },
      },
      {
        name: "海南",
        itemStyle: {
          areaColor: "#00f0ff",
          opacity: 0.2,
        },
      },
      {
        name: "台湾",
        itemStyle: {
          areaColor: "#0067e7",
          opacity: 0.2,
        },
      },
      {
        name: "香港",
        itemStyle: {
          areaColor: "#00dafa",
          opacity: 0.2,
        },
      },
      {
        name: "澳门",
        itemStyle: {
          areaColor: "#00dafa",
          opacity: 0.2,
        },
      },
    ]),
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
  },
  methods: {
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
            // tooltip: {//鼠标放上去提示语
            //     trigger: 'item',
            //     "confine": true,
            //     "formatter": (p)=>{//自定义提示信息
            //         let dataCon = p.data;
            //         txtCon ='其它城市<br>' + dataCon.name+':'+dataCon.value[2];
            //         return txtCon;
            //     }
            // },
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
  created() {
    this.mapFn();
  },
  components: {},
};
</script>
<style scoped>
</style>