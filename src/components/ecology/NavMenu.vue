<template>
  <div>
    <div class="header">
      <div class="pro_title">项目管理</div>
      <el-button class="project_btn" type="text" size="medium" icon="el-icon-s-grid" @click="index = 1">项目</el-button>
      <el-button class="project_btn" type="text" size="medium" icon="el-icon-circle-plus" @click="index = 2">创建</el-button>
      <el-button class="project_btn" type="text" size="medium" icon="el-icon-upload" @click="index = 3">导入</el-button>
    </div>
    <div class="main">
      <template v-if="index == 1">
        <el-input class="pro_search" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input1"></el-input>
        <el-scrollbar style="height: 100%">
          <div class="project">
            <div>
              <i class="el-icon-folder"></i>
              长三角智慧社区<br>D:\Code\IDEA\smartcommunityplatform
            </div>
            <el-button-group>
              <el-button type="primary" size="medium" icon="el-icon-edit"></el-button>
              <el-button type="primary" size="medium" icon="el-icon-delete"></el-button>
            </el-button-group>
          </div>
        </el-scrollbar>
      </template>
      <template v-if="index == 2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>D:\Code</span>
            <el-button style="float: right;padding: 0px 0;font-size: 16px;" type="text" size="small" icon="el-icon-edit">编辑路径</el-button>
          </div>
          <el-scrollbar style="height: 500px;">
            <div v-for="o in 1" :key="o" class="text item">
              <i class="el-icon-folder"></i>
              {{'smartcommunityplatform' + o }}
            </div>
          </el-scrollbar>
        </el-card>
        <el-button type="success" icon="el-icon-plus" style="margin-top: 10px;">在此创建项目</el-button>
      </template>
      <template v-if="index == 3">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>D:\Code</span>
            <el-button style="float: right;padding: 0px 0;font-size: 16px;" type="text" size="small" icon="el-icon-edit">编辑路径</el-button>
          </div>
          <el-scrollbar style="height: 500px;">
            <div v-for="o in 0" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-scrollbar>
        </el-card>
        <el-button type="success" icon="el-icon-upload2" style="margin-top: 10px;" :disabled="true">导入此文件夹</el-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      index: '0',
      input1: ''
    }
  }
}
</script>

<style scoped>
.header{
  width: 85vw;
  height: 15vh;
  background-color: #e3e3e3;
  text-align: center;
}
.pro_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
.main{
  width: 85vw;
  height: 85vh;
  background-color: #f6f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.project_btn{
  width: 100px;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 10px;
  color: black;
  border-radius: 2px 2px 0px 0px;
}
.project_btn:hover,
.project_btn:focus,
.project_btn:active{
  color: blue;
  background-color: white;
  border-bottom: 2px solid blue;
}
.project{
  /*margin: 16px 0px 0px 100px;*/
  height: 30px;
  width: 800px;
  border-radius: 5px;
  background-color: #fdfdfd;
  margin: 10px;
  padding: 12px 16px 20px 16px;
  display: flex;
  text-align: left;
}
.pro_search{
  margin-top: 10px;
  width: 400px;
  cursor: text;
}
.el-button-group{
  position: absolute;
  right: 20px;
}
.box-card{
  margin-top: 10px;
  height: 500px;
  width: 400px;
}
</style>
