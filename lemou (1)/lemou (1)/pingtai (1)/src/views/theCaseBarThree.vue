<template>
  <div class="caseBarThree chartBg">
    <chart :options="orgOptions" ref="caseBarThree" :data="data" :auto-resize="true" class="chart"></chart>
  </div>
</template>

<script>
let label = {
  //上边的总数
  normal: {
    show: true,
    position: "top",
    color: "#333333"
  }
};
export default {
  name: "theCaseBarThree",
  props: {
    data: Array //父组件传过来的值 如果请求接口拿的数据 放到子组件里面
  },
  data() {
    return {
      orgOptions: {
        // 图表配置项
        title: {
          text: "每日通道统计",
          left: 10,
          top: 5,
          textStyle: {
            color: "green",
            fontSize: 22,
            fontWeight: 400
          }
        },
        barGap: "60%" /*多个并排柱子设置柱子之间的间距*/,
        barCategoryGap: "50%" /*设置柱子的粗细值越大越细*/,
        tooltip: {
          trigger: "axis"
        },
        legend: {
          show: false
        },
        color: ["#5E72F9"],
        xAxis: {
          type: "category",
          axisLabel: {
            //x轴数据倾斜设置
            interval: 0,
            formatter: function(params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 3;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            }
          },
          data: [
            "支付宝个码",
            "微信个码",
            "云闪付个码",
            "支付宝商码",
            "微信商码",
            "银行卡",
            "拼多多支付宝",
            "拼多多微信",
            "聚合码",
            "支付宝固态码"
          ],
          axisLabel: {
            rotate: 50
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            label: label,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0]
          }
        ]
      }
    };
  },
  computed: {},
  watch: {
    data: function(val) {
      if (val) {
        this.setData(); //检测数据是否发生了变化
      }
    }
  },
  created() {},
  methods: {
    setData() {
      this.orgOptions.series[0].data = [];
      this.data.forEach((item, index) => {
        this.orgOptions.series[0].data.push({
          value: item.money
        });
        this.orgOptions.xAxis.data[index] = item.code;
      });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.caseBarThree {
  width: 510px;
  height: 390px;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>