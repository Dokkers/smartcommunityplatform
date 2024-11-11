<template>
  <div class="container">
    <div class="aside">
      <div class="title">
        <i class="el-icon-d-arrow-left" @click="back"></i>
        <span>社区数字生态</span>
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        @select="handleSelect">
<!--        <el-menu-item index="1">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-folder"></i>-->
<!--            <span>项目管理</span>-->
<!--          </template>-->
<!--        </el-menu-item>-->
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span>元模型管理</span>
          </template>
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="2-1">模型设计</el-menu-item>-->
<!--            <el-menu-item index="2-2">模型编辑</el-menu-item>-->
<!--          </el-menu-item-group>-->
        </el-menu-item>
        <el-menu-item index="2">
          <template slot="title">
            <i class="el-icon-coin"></i>
            <span>社区服务数据管理</span>
          </template>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>服务生态模型管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">生态模型管理</el-menu-item>
            <el-menu-item index="3-2">生态模型创建</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>生态展示</span>
          </template>
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="4-1" @click="$router.push({path: '/ecology/gis-graph'})">图展示</el-menu-item>-->
<!--            <el-menu-item index="4-2">健康展示</el-menu-item>-->
<!--          </el-menu-item-group>-->
        </el-menu-item>
        <el-menu-item index="5">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span>生态分析</span>
          </template>
        </el-menu-item>

      </el-menu>
    </div>
    <template>
      <ConMana v-if="index == '1'"></ConMana>
      <DataSource v-if="index == '2'"></DataSource>
<!--      <EntityAnno v-if="index == '3-1'"></EntityAnno>-->
      <NavMenu v-if="index == '3-1'"></NavMenu>
      <DataMap v-if="index == '3-2'"></DataMap>
      <GraphShow v-if="index == '4'"></GraphShow>
      <Analysis v-if="index == '5'"></Analysis>
<!--      <HealthShow v-if="index == '4-2'"></HealthShow>-->
<!--      <AnalysisView v-show="index == '5'"></AnalysisView>-->

<!--      <FigShow v-if="index == '4-2'"></FigShow>-->
    </template>
  </div>
</template>

<script>
import NavMenu from '@/components/ecology/NavMenu'
import ConMana from '@/components/ecology/ConMana'
import EntityAnno from '@/components/ecology/EntityAnno'
import DataMap from '@/components/ecology/DataMap'
import FigShow from '@/components/ecology/KnowledgeShow'
import DataSource from '@/components/ecology/DataSource'
import HealthShow from '@/components/ecology/HealthShow'
import AnalysisView from '@/components/ecology/KnowledgeShow'
import GraphShow from '@/components/ecology/GraphShow'
import Analysis from '@/components/ecology/Analysis'
export default {
  name: 'EcologyView',
  components: { Analysis, GraphShow, DataSource, DataMap, ConMana, NavMenu },
  data () {
    return {
      url: require('@/assets/back.png'),
      index: '1'
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    handleSelect (index, indexPath) {
      this.index = index
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.container{
  display: flex;
  align-items:center;
  overflow: hidden;
}
.aside{
  width: 15vw;
  height: 100vh;
  background-color: white;
}
.el-menu-vertical{
  width: 100%;
  height: 100%;
}
.title{
  height: 10vh;
  font-size: 25px;
  font-weight: 800;
}
.el-icon-d-arrow-left{
  margin-top: 15px;
  margin-left: 10px;
  font-size: 25px;
  height: 30px;
  width: 30px;
}
.el-icon-d-arrow-left:hover{
  cursor: pointer;
  color: #5cb6ff;
}
</style>
