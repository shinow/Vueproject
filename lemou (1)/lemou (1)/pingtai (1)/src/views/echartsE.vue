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
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        
        series: [
          {
            name: "今日订单",
            type: "pie",
            radius: "40%",
            center: ["48%", "60%"],
            data: [
              { value: 0, name: "已开通" },
              { value: 0, name: "已关闭" }
            ],
            
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal:{
                  label:{
                    show: true,
                    formatter: '{b}:{c}' // 展示具体数值，b：展示数据的名称； c：展示数据的值
                  },
                  labelLine :{show:true} // 是否显示线
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
      });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.casePie {
   width:420px;
  height: 300px;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>