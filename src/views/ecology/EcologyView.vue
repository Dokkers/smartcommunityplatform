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
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span>项目管理</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span>模型管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">内容管理</el-menu-item>
            <el-menu-item index="2-2">模型编辑</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>生态建模</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">数据映射</el-menu-item>
            <el-menu-item index="3-2">关系标注</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>生态展示</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <template>
      <NavMenu v-if="index == '1'"></NavMenu>
      <ConMana v-if="index == '2-1'"></ConMana>
<!--      <EntityAnno v-if="index == '3-1'"></EntityAnno>-->
      <DataMap v-if="index == '3-1'"></DataMap>
    </template>
  </div>
</template>

<script>
import NavMenu from '@/components/ecology/NavMenu'
import ConMana from '@/components/ecology/ConMana'
import EntityAnno from '@/components/ecology/EntityAnno'
import DataMap from '@/components/ecology/DataMap'
export default {
  name: 'EcologyView',
  components: { DataMap, EntityAnno, ConMana, NavMenu },
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
