<template>
  <div>
    <div class="header">
      <div class="ety_title">数据映射</div>
    </div>
    <div class="main">
      <div class="select-model">
        <div style="margin-top: 10px">
          元模型选择：
          <el-select v-model="model" filterable placeholder="请选择" style="width: 65%" @change="handelModelSelect">
            <el-option
              v-for="item in modelsOpt"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          节点边选择：
          <el-select v-model="cell" placeholder="请选择" style="width: 65%" @change="handleCellSelect">
            <el-option-group
              v-for="group in cellsOpt"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </div>
        <div style="margin-top: 18px;margin-left: 22px;">
          <el-table
            :data="attributeData"
            height="500"
            border
            style="width: 95%">
            <el-table-column
              prop="name"
              label="属性名称"
              fixed="left">
            </el-table-column>
            <el-table-column
              prop="type"
              label="属性类型">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="select-data">
        <div style="margin-top: 10px;">
          生态模型：
          <el-select v-model="database" filterable placeholder="请选择" style="width: 70%">
            <el-option
              v-for="item in ecology"
              :key="item.name"
              :label="item.name"
              :value="item.database">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          数据选择：
          <el-select v-model="fileName" filterable placeholder="请选择" style="width: 70%" @change="handelFileSelect">
            <el-option
              v-for="item in filesOpt"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 18px;margin-left: 22px;">
          <el-table
            :data="previewData"
            height="500"
            border
            style="width: 95%">
            <el-table-column
              prop="fieldName"
              label="字段名称"
              fixed="left">
            </el-table-column>
            <el-table-column
              prop="sampleData"
              label="样例数据">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="map-model-data">
        <div>
          <el-row style="margin-top: 15px;margin-left: 22px">
            <el-col :span="5">建立映射：</el-col>
<!--            <el-col :span="5" :offset="13"><el-button type="primary" size="mini" style="text-align: right">自动匹配</el-button></el-col>-->
          </el-row>
        </div>
        <div style="margin-top: 10px;margin-left: 22px;">
          <el-card :body-style="{height: '480px', width: '95%'}">
            <el-divider><span>Source Key</span></el-divider>
            <el-row>
              <el-col :span="10">
                <el-select v-model="keys.sourceKey" size="medium" :disabled="disabled" placeholder="模型字段">
                  <el-option
                    v-for="(item, index) in stOptions.sourceOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1" style="font-size: 25px">-</el-col>
              <el-col :span="10">
                <el-select v-model="keys.fieldId1" size="medium" :disabled="disabled" placeholder="数据字段">
                  <el-option
                    v-for="(pre, index) in previewData"
                    :key="index"
                    :label="pre.fieldName"
                    :value="pre.fieldName"
                    :disabled="pre.disabled">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-divider><span>Target Key</span></el-divider>
            <el-row>
              <el-col :span="10">
                <el-select v-model="keys.targetKey" size="medium" :disabled="disabled" placeholder="模型字段">
                  <el-option
                    v-for="(item, index) in stOptions.targetOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1" style="font-size: 25px">-</el-col>
              <el-col :span="10">
                <el-select v-model="keys.fieldId2" size="medium" :disabled="disabled" placeholder="数据字段">
                  <el-option
                    v-for="(pre, index) in previewData"
                    :key="index"
                    :label="pre.fieldName"
                    :value="pre.fieldName"
                    :disabled="pre.disabled">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-divider><span>单击"+"添加映射</span></el-divider>
            <el-scrollbar style="width: 95%;height: 280px">
              <div v-for="(item, idx) in mappingData[0].length" :key="idx">
                <el-row style="margin-top: 5px">
                  <el-col :span="10">
                    <el-select v-model="mappingData[0][idx]" size="medium" placeholder="模型字段">
                      <el-option
                        v-for="(item, index) in attributeData"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                        :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-col>
                    <el-col :span="1" style="font-size: 25px">-</el-col>
                  <el-col :span="10">
                    <el-select v-model="mappingData[1][idx]" size="medium" placeholder="数据字段">
                      <el-option
                        v-for="(pre, index) in previewData"
                        :key="index"
                        :label="pre.fieldName"
                        :value="pre.fieldName"
                        :disabled="pre.disabled">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2" :offest="1">
                    <div class="props-delete"><i class="el-icon-delete" @click="handleMapDelete(idx)"></i></div>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-col :span="2">
                  <div class="props-plus"><i class="el-icon-circle-plus" @click="handleMapAdd"></i></div>
                </el-col>
              </div>
            </el-scrollbar>
          </el-card>
        </div>
        <div style="margin-top: 10px;">
          <el-button type="success" size="medium" icon="el-icon-finished" @click="loadingData" v-loading.fullscreen.lock="fullscreenLoading">加载数据</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCells, getFiles, getModels, getPreviewData, loadingData } from '@/apis/ecology/modeling'
import { getProjectList } from '@/apis/ecology/project'

export default {
  name: 'DataMap',
  data () {
    return {
      schema: [],
      model: '',
      modelsOpt: ['demo'],
      database: null,
      ecology: [],
      cell: '',
      cellsOpt: [],
      fileName: '',
      filesOpt: [],
      // attributeData: [{"name": "NAME","type": "STRING"}]
      keysSample: {
        sourceKey: '',
        targetKey: '',
        fieldId1: '',
        fieldId2: ''
      },
      keys: {
        sourceKey: '',
        targetKey: '',
        fieldId1: '',
        fieldId2: ''
      },
      disabled: true,
      stOptions: {
        sourceOptions: [],
        targetOptions: []
      },
      // attributeData: [{ label: 'Source', options: [] }, { label: 'Target', options: [] }, { label: 'Props', options: [] }],
      attributeData: [],
      previewData: [], // previewData: [{ fieldName: '统一社会信用代码', sampleData: '51230103MJY890956L ' }],
      mappingData: [[], []],
      mappingDialogVisible: false,
      rowData: {},
      fieldOptions: [],
      fullscreenLoading: false,
      a: ''
    }
  },
  computed: {

  },
  methods: {
    init () {
      getModels().then(res => {
        this.modelsOpt = res.data
      })
      getFiles().then(res => {
        this.filesOpt = res.data.fileList
      })
      getProjectList().then(res => {
        this.ecology = res.data
      })
    },
    handelModelSelect () {
      getCells(this.model).then(res => {
        console.log(res.data)
        this.schema = res.data
        const tmpOpt = [{
          label: 'Node',
          options: []
        },
        {
          label: 'Edge',
          options: []
        }]
        res.data.nodes.forEach(node => {
          tmpOpt[0].options.push({ value: node.id })
        })
        res.data.edges.forEach(edge => {
          tmpOpt[1].options.push({ value: edge.id })
        })
        this.cellsOpt = tmpOpt
      })
    },
    handleCellSelect () {
      let flag = false
      const nodes = this.schema.nodes
      const edges = this.schema.edges
      this.keys = { ...this.keysSample }
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === this.cell) {
          this.disabled = true
          this.attributeData = nodes[i].props
          flag = true
          break
        }
      }
      if (!flag) {
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].id === this.cell) {
            for (let j = 0; j < nodes.length; j++) {
              if (nodes[j].id === edges[i].source) {
                // this.attributeData[0].options = nodes[i].props
                this.stOptions.sourceOptions = nodes[i].props
              }
              if (nodes[j].id === edges[i].target) {
                // this.attributeData[1].options = nodes[i].props
                this.stOptions.targetOptions = nodes[i].props
              }
            }
            this.disabled = false
            this.attributeData = edges[i].props
            break
          }
        }
      }
    },
    handelFileSelect () {
      getPreviewData(this.fileName).then(res => {
        this.previewData = res.data.previewData
        this.previewData.forEach(item => {
          this.fieldOptions.push(item.fieldName)
        })
        console.log(res.data)
      })
    },
    handleMapAdd () {
      this.mappingData[0].push('')
      this.mappingData[1].push('')
    },
    handleMapDelete (index) {
      this.mappingData[0].splice(index, 1)
      this.mappingData[1].splice(index, 1)
    },
    handleEdit (index, row) {
      this.mappingDialogVisible = true
      console.log(index)
      this.rowData.index = index
      this.rowData.attributeName = row.attributeName
    },
    loadingData () {
      this.fullscreenLoading = true
      loadingData(this.cell, this.fileName, this.keys, this.mappingData, this.database).then(res => {
        console.log(this.cell)
        if (res.data === 'success') {
          console.log('success')
          this.$notify.success({
            message: '加载成功'
          })
        } else {
          this.$notify.error({
            message: '加载失败'
          })
        }
      })
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 500)
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
  display: flex;
  align-items: center;
  flex-direction: row;
}
.ety_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
.select-model{
  width: 33%;
  height: 100%;
  text-align: center;
}
.select-data{
  width: 33%;
  height: 100%;
  text-align: center;
  background-color: #f7f6e7;
}
.map-model-data{
  width: 34%;
  height: 100%;
  text-align: center;
  background-color: #c1c0b9;
}
.props-delete i{
  font-size: 20px;
  margin-top: 5px;
  margin-left: 5px;
  cursor: pointer
}
.props-delete i:hover{
  color: red;
}
.props-plus i{
  font-size: 20px;
  cursor: pointer;
  margin-top: 5px;
}
.props-plus i:hover{
  color: blue;
}
</style>
