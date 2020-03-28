<template>
  <div class="table-line">
    <!-- <div class="table-title" style="width:100%">国内地域分布数据折线表</div> -->
    <div id="mapContainer"></div>
  </div>
</template>
<script>
/* eslint-disable */
  // 主模块
  let echarts = require('echarts/lib/echarts')
  // 散点图
  require('echarts/lib/chart/scatter')
  // 散点图放大
  require('echarts/lib/chart/effectScatter')
  // 地图
  require('echarts/lib/chart/map')
  // 图例
  require('echarts/lib/component/legend')
  // 提示框
  require('echarts/lib/component/tooltip')
  // 地图geo
  require('echarts/lib/component/geo')
  // 中国地图
  require('echarts/map/js/china')
  import chinaPric from '@/assets/chinaPric'
  import {statistical} from '@/api'
  export default {
    name: '',
    data () {
        return{
            data: [],
            // sun: []
        }
    },
    mounted () {
        this.statisticalFun()
    },
    methods: {
        // 调用接口
        statisticalFun() {
            statistical().then((res) => {
                this.data = res.data.data
                this.data.map((item, index) => {
                    chinaPric.map((val,index) => {
                        if (val.name == item.regionName) {
                            val.value.push(parseInt(item.comSum))
                            val.value.push(parseInt(item.itemSum))
                            
                        }
                    })
                })
                this.initEcarts()
            })
        },
        initEcarts() {
            var myChart = this.$echarts.init(document.getElementById('mapContainer'));
            myChart.setOption({
                backgroundColor: '#fff',
            // 标题
            title: {
                text: '兰众云物管合作伙伴分布图',
                left: 'center',
                textStyle: {
                    color: '#000'
                }
            },
            // 地图上圆点的提示
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    console.log(params)
                    if(params.value[2] === undefined){
                        params.value[2] = 0
                        params.value[3] = 0
                    }
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px;"> '+ params.name + '<br />' + '公司:' + params.value[2] + '个' + '<br />' + '小区' + ':' + params.value[3] +  '个'
                            '</div>'
                }
            },
            // 图例按钮 点击可选择哪些不显示
            legend: {
                show: true,
                orient: 'vertical',
                left: 'left',
                top: 'bottom',
                data: ['分布数量', 'top5'],
                textStyle: {
                    color: '#ppp'
                }
            },
            // 地理坐标系组件
            geo: {
                map: 'china',
                label: {
                    // true会显示城市名
                    emphasis: {
                        show: true
                    }
                },
                textStyle: {
                    color: '#000'
                },
                zoom: 1,
                scaleLimt: {min:1, max: 3},
                roam: true,
                itemStyle: {
                    // 地图背景色
                    normal: {
                        areaColor: '#5159f9',
                        borderColor: '#fff'
                    },
                    // 悬浮时
                    emphasis: {
                        areaColor: '#878cf3'
                    }
                }
            },
            visualMap: {  
                show : true,  
                x: 'left',  
                y: 'bottom',  
                splitList: [   
                    {start: 30, end:35},{start: 25, end: 30},  
                    {start: 15, end: 20},{start: 10, end: 15},  
                    {start: 5, end: 10},{start: 0, end: 5},  
                ],  
                color: ['#5475f5', '#9feaa5', '#85daef','#74e2ca', '#9fb5ea', '#e6ac53']  
            },
            // 系列列表
            series: [
            {
                name: '市级位置',
                // 表的类型 这里是散点
                type: 'scatter',
                // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                coordinateSystem: 'geo',
                data: chinaPric,
                // 标记的大小
                symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                // 鼠标悬浮的时候在圆点上显示数值
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f25f31',
                        // shadowBlur: 10,
                        // shadowColor: '#333'
                    },
                    // 鼠标悬浮的时候圆点样式变化
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            }]
          })
        }
    }
  }
</script>
<style lang="less">
.table-line{
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    #mapContainer{
        width: 1000px;
        height: 80%;
    }
}
</style>
