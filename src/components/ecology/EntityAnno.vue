<template>
  <div>
    <div class="header">
      <div class="ety_title">实体标注</div>
    </div>
    <div class="main">
      <el-card :body-style="{height: '85vh'}">
        <div>
          <el-input class="ety_search" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input1"></el-input>
          <el-button class="build-btn" type="danger">批量删除</el-button>
          <el-button class="build-btn" type="primary">批量导入</el-button>
          <el-button class="build-btn" type="primary">新建</el-button>
        </div>
        <el-divider></el-divider>
        <el-table
          height="470"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          border
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            label="类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="builder"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="210">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
              <el-button type="success" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntityAnno'
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
  background-color: #f6f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.ety_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
.ety_search{
  width: 300px;
  cursor: text;
}
.build-btn{
  margin-left: 5px;
  float: right;
}
.el-pagination{
  margin-top: 10px;
  text-align: center;
}
</style>
