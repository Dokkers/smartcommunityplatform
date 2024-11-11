<template>
  <div>
    <div class="header">
      <div class="mod_title">生态分析</div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="10" style="height: 90vh;background-color: #f6f5f5">
          <HealthTree></HealthTree>
        </el-col>
        <el-col :span="14">
          <el-row style="height: 200px;padding-top: 50px">
            <el-col :span="12">
              <div style="margin-top: 10px;padding-left: 30px;width: 400px">
                生态模型：
                <el-select v-model="database" filterable placeholder="请选择" style="width: 50%" size="medium" @change="changeHealthData">
                  <el-option
                    v-for="item in ecology"
                    :key="item.name"
                    :label="item.name"
                    :value="item.database">
                  </el-option>
                </el-select>
              </div>
              <div style="margin-top: 10px;padding-left: 30px;width: 400px">
                分析方法：
                <el-select v-model="method" filterable placeholder="请选择" style="width: 50%" size="medium">
                  <el-option-group
                    v-for="group in mthOptions"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </div>
              <div style="margin-top: 10px;padding-left: 30px">
                <el-button type="primary" size="medium" @click="handleClick">确认</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <el-card style="width: 100%;margin-left: 30px;margin-top: 10px;width: 300px;height: 120px">
                <div style="width: 100%; display: inline-block; ">
                  <div style="font-size: 15px;text-align: left;margin-top: -10px">
                    结果
                  </div>
                  <div style="font-size: 18px;text-align: center;padding-top: 20px">
                    {{ result }}
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div style="margin-top: 50px">
            <el-row>
              <el-col :span="12">
                <el-card style="height: 350px;width: 350px;margin-left: 10px;margin-top: 10px">
                  <div id="healthCurve" ref="healthCurve" style="height: 340px;width: 300px"></div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card style="height: 350px;width: 350px;margin-top: 10px">
                  <div id="healthAssess" ref="healthAssess" style="height: 340px;width: 350px"></div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProjectList } from '@/apis/ecology/project'
import HealthTree from '@/components/ecology/HealthTree'
import { Chart } from '@antv/g2'
// const annualHealthData = [
//   { year: '2012', value: 30 },
//   { year: '2013', value: 40 },
//   { year: '2014', value: 35 },
//   { year: '2015', value: 50 },
//   { year: '2016', value: 49 },
//   { year: '2017', value: 60 },
//   { year: '2018', value: 70 },
//   { year: '2019', value: 90 },
//   { year: '2020', value: 93 },
//   { year: '2021', value: 93 },
//   { year: '2022', value: 96 }
// ]
// const standardHealthdata = [
//   { item: '服务质量', type: '2021', score: 70 },
//   { item: '服务质量', type: '2022', score: 75 },
//   { item: '服务多样化', type: '2021', score: 60 },
//   { item: '服务多样化', type: '2022', score: 65 },
//   { item: '稳定性', type: '2021', score: 50 },
//   { item: '稳定性', type: '2022', score: 60 },
//   { item: '服务公平', type: '2021', score: 40 },
//   { item: '服务公平', type: '2022', score: 50 },
//   { item: '服务效率', type: '2021', score: 60 },
//   { item: '服务效率', type: '2022', score: 70 },
//   { item: '资源利用率', type: '2021', score: 60 },
//   { item: '资源利用率', type: '2022', score: 70 }
// ]

export default {
  name: 'Analysis',
  components: { HealthTree },
  data () {
    return {
      database: null,
      result: 'NaN',
      curve: null,
      radar: null,
      results: [0.1203, 2.150, 510, 11, '较为焦聚', 1.1211, 0.231, 35, 'NaN', 'NaN', 'NaN', 'NaN'],
      ecology: [],
      method: null,
      mthOptions: [{
        label: '复杂网络特征',
        options: [{
          value: 0,
          label: '最邻近点指数'
        }, {
          value: 1,
          label: '核密度'
        }, {
          value: 2,
          label: '中心性'
        }, {
          value: 3,
          label: '结构洞'
        }, {
          value: 4,
          label: '聚类系数'
        }]
      }, {
        label: '生态系统特征',
        options: [{
          value: 5,
          label: '生态广度'
        }, {
          value: 6,
          label: '生态重叠'
        }, {
          value: 7,
          label: '多样性'
        }, {
          value: 8,
          label: '稳定性'
        }]
      }, {
        label: '社会经济特征',
        options: [{
          value: 9,
          label: '服务公平'
        }, {
          value: 10,
          label: '服务质量'
        }, {
          value: 11,
          label: '服务效率'
        }]
      }]
    }
  },
  methods: {
    init () {
      getProjectList().then(res => {
        this.ecology = res.data
      })
      this.curve = new Chart({
        container: this.$refs.healthCurve,
        autoFit: true
      })
      this.curve
        .data(this.getAnnualHealthData())
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
          dx: 0,
          dy: 0
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
        .data(this.getHealthData())
        .scale('x', { padding: 0.5, align: 0 })
        .scale('y', { tickCount: 5, domainMax: 100 })
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
    },
    handleClick () {
      if (this.database === null) {
        this.$notify.error({
          message: '请选择相应生态模型'
        })
      } else if (this.method === null) {
        this.$notify.error({
          message: '请选择相应分析方法'
        })
      } else {
        this.result = this.results[this.method]
      }
    },
    getHealthData () {
      return [
        { item: '服务质量', type: '', score: Math.random() * 100 },
        { item: '服务多样化', type: '', score: Math.random() * 100 },
        { item: '稳定性', type: '', score: Math.random() * 100 },
        { item: '服务公平', type: '', score: Math.random() * 100 },
        { item: '服务效率', type: '', score: Math.random() * 100 },
        { item: '资源利用率', type: '', score: Math.random() * 100 }
      ]
    },
    getAnnualHealthData () {
      return [
        { year: '2012', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2013', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2014', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2015', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2016', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2017', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2018', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2019', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2020', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2021', value: Math.floor(Math.random() * 40 + 60) },
        { year: '2022', value: Math.floor(Math.random() * 40 + 60) }
      ]
    },
    changeHealthData () {
      this.radar.data(this.getHealthData())
      this.radar.render()
      this.curve.data(this.getAnnualHealthData())
      this.curve.render()
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
