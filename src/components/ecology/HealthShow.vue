<template>
  <div>
    <div class="header">
      <div class="mod_title">健康展示</div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="12">
          <div id="healthCurve" ref="healthCurve"></div>
        </el-col>
        <el-col :span="12">
          <div id="healthAssess" ref="healthAssess"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2'
const annualHealthData = [
  { year: '2012', value: 30 },
  { year: '2013', value: 40 },
  { year: '2014', value: 35 },
  { year: '2015', value: 50 },
  { year: '2016', value: 49 },
  { year: '2017', value: 60 },
  { year: '2018', value: 70 },
  { year: '2019', value: 90 },
  { year: '2020', value: 93 },
  { year: '2021', value: 93 },
  { year: '2022', value: 96 }
]
const standardHealthdata = [
  { item: '服务质量', type: '2021', score: 70 },
  { item: '服务质量', type: '2022', score: 75 },
  { item: '服务多样化', type: '2021', score: 60 },
  { item: '服务多样化', type: '2022', score: 65 },
  { item: '社会效用', type: '2021', score: 50 },
  { item: '社会效用', type: '2022', score: 60 },
  { item: '服务公平', type: '2021', score: 40 },
  { item: '服务公平', type: '2022', score: 50 },
  { item: '服务效率', type: '2021', score: 60 },
  { item: '服务效率', type: '2022', score: 70 },
  { item: '资源利用率', type: '2021', score: 60 },
  { item: '资源利用率', type: '2022', score: 70 }
]
export default {
  name: 'HealthShow',
  data () {
    return {
      curve: null,
      radar: null
    }
  },
  methods: {
    init () {
      this.curve = new Chart({
        container: this.$refs.healthCurve,
        autoFit: true
      })
      this.curve
        .data(annualHealthData)
        .encode('x', 'year')
        .encode('y', 'value')
        .scale('x', {
          range: [0, 1]
        })
        .scale('y', {
          domainMin: 0,
          nice: true
        })
      this.curve.line().label({
        text: 'value',
        style: {
          dx: -10,
          dy: -12
        }
      })
      this.curve.point().style('fill', 'white').tooltip(false)
      this.curve.render()

      this.radar = new Chart({
        container: this.$refs.healthAssess,
        autoFit: true
      })
      this.radar.coordinate({ type: 'polar' })
      this.radar
        .data(standardHealthdata)
        .scale('x', { padding: 0.5, align: 0 })
        .scale('y', { tickCount: 5, domainMax: 80 })
        .axis('x', {
          grid: true,
          gridLineWidth: 1,
          tick: false,
          gridLineDash: [0, 0]
        })
        .axis('y', {
          zIndex: 1,
          title: false,
          gridConnect: 'line',
          gridLineWidth: 1,
          gridLineDash: [0, 0]
        })
      this.radar
        .area()
        .encode('x', 'item')
        .encode('y', 'score')
        .encode('color', 'type')
        .style('fillOpacity', 0.5)
      this.radar
        .line()
        .encode('x', 'item')
        .encode('y', 'score')
        .encode('color', 'type')
        .style('lineWidth', 2)
      this.radar
        .point()
        .encode('x', 'item')
        .encode('y', 'score')
        .encode('color', 'type')
        .encode('shape', 'point')
        .encode('size', 3)
        .tooltip(null)
      this.radar.interaction('tooltip', { crosshairsLineDash: [4, 4] })
      this.radar.render()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
.header{
  width: 85vw;
  height: 10vh;
  background-color: #e3e3e3;
  text-align: center;
}
.main{
  width: 85vw;
  height: 90vh;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.mod_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
</style>
