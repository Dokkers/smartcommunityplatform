<template>
  <div>
    <div class="header">
      <div class="mod_title">生态展示</div>
    </div>
    <div class="main">
        <el-row>
          <el-col :span="6">
            <div style="margin-top: 10px;padding-left: 30px">
              生态模型：
              <el-select v-model="database" filterable placeholder="请选择" style="width: 60%" size="medium">
                <el-option
                  v-for="item in ecology"
                  :key="item.name"
                  :label="item.name"
                  :value="item.database">
                </el-option>
              </el-select>
            </div>
            <div style="margin-top: 10px;padding-left: 30px">
              展示方式：
              <el-select v-model="method" filterable placeholder="请选择" style="width: 60%" size="medium">
                <el-option
                  v-for="item in shows"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <div style="margin-top: 10px;padding-left: 30px">
              <el-button type="primary" size="medium" @click="handleClick">确认</el-button>
            </div>
            <el-card v-if="index === 1" style="width: 80%;margin-left: 30px;margin-top: 50px; height: 50vh">
                <div style="width: 100%; display: inline-block; ">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-statistic
                        group-separator=","
                        :value="nodeNums"
                        title="节点数量"
                      ></el-statistic>
                    </el-col>
                    <el-col :span="8">
                      <el-statistic
                        group-separator=","
                        :value="edgeNums"
                        title="边数量"
                      ></el-statistic>
                    </el-col>
                    <el-col :span="8">
                      <el-statistic
                        group-separator=","
                        :value="nodeNums + edgeNums"
                        title="图元数量"
                      ></el-statistic>
                    </el-col>
                  </el-row>
                </div>
                <div style="margin-top: 20px; width: 100%">
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix">
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.NAME }}</div>
                      <span class="addr">{{ item.LAT + ' ' }}</span>
                      <span class="addr">{{ item.LON }}</span>
                      <br>
                      <span class="addr">{{ item.DATETIME }}</span>
                    </template>
                  </el-autocomplete>
                </div>
              </el-card>
          </el-col>
          <el-col :span="18" style="height: 90vh;background-color: #f6f5f5">
            <KnowledgeShow v-if="index == 1" @graphData="receivedGraphData" :selectNode="selectNodeId"></KnowledgeShow>
            <GisShow v-if="index == 2"></GisShow>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { getProjectList } from '@/apis/ecology/project'
import KnowledgeShow from '@/components/ecology/KnowledgeShow'
import GisShow from '@/components/ecology/GisShow'

export default {
  name: 'GraphShow',
  components: { GisShow, KnowledgeShow },
  data () {
    return {
      database: null,
      ecology: [],
      method: null,
      index: 0,
      nodeNums: '',
      edgeNums: '',
      shows: ['知识图谱形态展示', 'GIS形态展示'],
      state: '',
      nodeData: null,
      selectNodeId: null
    }
  },
  methods: {
    init () {
      getProjectList().then(res => {
        this.ecology = res.data
      })
    },
    handleClick () {
      if (this.database === null) {
        this.$notify.error({
          message: '请选择相应生态模型'
        })
      } else if (this.method === null) {
        this.$notify.error({
          message: '请选择相应展示方式'
        })
      } else if (this.method === 'GIS形态展示') {
        this.index = 2
      } else {
        this.index = 1
      }
    },
    receivedGraphData (nodeLen, edgeLen, nodeData) {
      this.nodeNums = nodeLen
      this.edgeNums = edgeLen
      this.nodeData = nodeData
    },
    querySearch (queryString, cb) {
      const nodeData = this.nodeData
      const results = queryString ? nodeData.filter(this.createFilter(queryString)) : nodeData
      // 调用 callback 返回建议列表的数据
      // console.log(results)
      cb(results)
    },
    createFilter (queryString) {
      return (nodeData) => {
        return (nodeData.NAME.indexOf(queryString) === 0)
      }
    },
    handleSelect (item) {
      this.state = item.NAME
      this.selectNodeId = item.id
      // console.log(item.id)
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
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}
</style>
