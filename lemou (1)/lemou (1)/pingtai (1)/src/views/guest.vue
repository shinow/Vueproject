<template>
  <div id="guest">
    <el-card shadow="never" body-style="padding:0px">
      <el-row slot="header">
        <el-col :span="15">
          <div>访问人数变化图</div>
        </el-col>
        <el-col :span="9" class="pull-right">
          <el-button class="pull-right" :span="2" size="small" type="primary" icon="el-icon-search"></el-button>
          <el-select style="width:40%" size="small" v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
          style="width:40%"
            v-model="value6"
            type="daterange"
            size="small"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>
    </el-card>
    <div style="width: 100%;height: 800px">
      <div id="mapContainer"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
  let echarts = require('echarts/lib/echarts')
  // 折线图
  require('echarts/lib/chart/line')
  require('echarts/lib/component/legend')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: '',
    data() {
      return {
        xdata: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        ydata: [820, 932, 901, 934, 1290, 1330, 1320],
        // 小区数据
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: '',
        value6: ''
      }
    },
    mounted() {
      this.initEcharts()
    },
    methods: {
      initEcharts () {
        var myChart = this.$echarts.init(document.getElementById('mapContainer'));
        console.log('eqeqqeq')
        myChart.setOption({
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: 'blue'
                  }
              }
          },
          legend: {
              name: 'fangke',
              data:['通行人数'],
              show: true,
              orient: 'vertical',
              left: 'left',
              top: 'bottom',
              zlevel: 1,
              itemWidth: 6
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.xdata
          },
          yAxis: {
              type: 'value',
              name: '访客人数'
          },
          series: [{
              name: 'fangke',
              data: this.ydata,
              type: 'line',
              areaStyle: {
                nomarl: {
                  color: 'blue'
                }
              }
          }]
        })
      }
    }
  }
</script>
<style lang="less">
#guest{
  #mapContainer{
    width: 500px;
    height: 500px;
  }
}
</style>
