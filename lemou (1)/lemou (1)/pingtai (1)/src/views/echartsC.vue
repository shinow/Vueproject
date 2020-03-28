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
      zong: "",
      shu: "",
      orgOptions: {
        title: {
          text: "总计",
          subtext: "0",
          x: "center",
          y: "center",
          top: 180,
          textStyle: {
            color: "green",
            fontSize: 15
          },
          subtextStyle: {
            color: "red",
            fontSize: 16
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "今日佣金",
            type: "pie",
            radius: [40, 80],
            center: ["50%", "60%"],
            data: [{ value: 0, name: "一级" }, { value: 0, name: "二级" }],

            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                label: {
                  show: true,
                  formatter: "{b}:{c}" // 展示具体数值，b：展示数据的名称； c：展示数据的值
                },
                labelLine: { show: true } // 是否显示线
              }
            }
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
  },
  methods: {
    setData() {
      this.orgOptions.series[0].data = [];
      this.data.forEach(item => {
        this.orgOptions.series[0].data.push({
          value: item.value,
          name: item.key
        });

        if (item.key == "总计") {
          this.orgOptions.title.text = item.key;
          this.orgOptions.title.subtext = item.value;
        }
      });
      this.orgOptions.series[0].data.pop();
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.casePie {
  width: 350px;
  height: 350px;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>