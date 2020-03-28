<template>
  <div class="casePie chartBg">
    <chart :options="orgOptions" ref="casePie" :auto-resize="true" :data="data" class="chart"></chart>
  </div>
</template>

<script>
export default {
  name: "Pdalipay",
  props: {
    data: Array
  },
  data() {
    return {
      orgOptions: {
        tooltip: {
          //鼠标悬停
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          //图例
          show: true,
          left: "5%",
          top: "center",
          orient: "vertical", //竖向排列
          itemGap: 20,
          itemWidth: 10, //图例的宽度
          // itemHeight:10,//图例的高度
          textStyle: {
            //图例文字的样式
            fontSize: 13,
            fontWeight: 400
          },
          data: []
        },
        color: ["#5E72F9", "#F65177", "#78AEF9"],
        calculable: true,
        series: [
          {
            //主配置项
            name: "拼多多微信",
            type: "pie",
            center: ["50%", "50%"], //1左右 2上下
            radius: ["15%", "60%"],
            avoidLabelOverlap: true,
            itemStyle: {
              //图形样式
              normal: {
                //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label: {
                  //饼图图形上的文本标签
                  show: true, //平常不显示
                  // formatter: '{c}\n{b}' //自定义显示格式(b:name, c:value, d:百分比)
                  formatter: "{d}" + "%"
                },
                labelLine: {
                  //标签的视觉引导线样式
                  show: false, //平常不显示
                  length: 0,
                  length2: 0
                }
              },
              emphasis: {
                //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                label: {
                  //饼图图形上的文本标签
                  show: true,
                  position: "center",
                  textStyle: {
                    fontSize: "14",
                    fontWeight: "normal",
                    color: "#000"
                  }
                }
              }
            },
            roseType: "radius", //图行大小的依据，radius根据角度区分大小，area以区域/半径区分大小
            data: [
              { value: 10, name: "调解" },
              { value: 15, name: "裁决" },
              { value: 15, name: "撤回" }
            ]
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    data: function(val) {
      if (val) {
        this.setData();
      }
    }
  },
  created() {
    console.log(this.data);
  },
  methods: {
    setData() {
      console.log(this.data);
      this.orgOptions.series[0].data = [];
      this.orgOptions.legend.data = [];
      this.data.forEach(item => {
        this.orgOptions.series[0].data.push({
          value: item.count,
          name: item.status
        });
        this.orgOptions.legend.data.push({
          name: item.status
        });
      });
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.casePie {
  width: 3.6rem;
  height: 3rem;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>