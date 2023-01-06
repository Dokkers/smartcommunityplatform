<template>
  <div>
    <div class="header">
      <div class="mod_title">内容管理</div>
    </div>
    <div class="main">
      <div class="mod_header">
        <el-input class="mod_search" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input1"></el-input>
        <el-button class="build-btn" type="primary" icon="el-icon-circle-plus-outline" @click="buildDialogVisible = true">创建模型</el-button>
        <el-dialog title="创建图模型" :visible.sync="buildDialogVisible" width="30%" :before-close="handleClose">
          <el-form ref="buildForm" :model="buildForm" label-width="100px">
            <el-form-item label="名称：" prop="name">
              <el-input v-model="buildForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建者：" prop="builder">
              <el-input v-model="buildForm.builder" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间：" prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="buildForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="handleBuild('cancel')">取 消</el-button>
              <el-button type="primary" @click="handleBuild('confirm')">确 定</el-button>
            </span>
        </el-dialog>
      </div>
      <el-divider></el-divider>
      <el-scrollbar style="width: 85vw;height: 80vh;">
        <el-row>
          <el-col :span="4" v-for="(m, index) in modelList" :key="index">
            <el-card class="box-card">
              <div><span class="mod_create">创建者：</span><span class="mod_create_auth">{{m.author}}</span></div>
              <div class="mod_name">{{m.name}}</div>
              <div style="text-align: center;padding: 10px;"><span class="mod_create_info">创建时间:</span><span class="mod_create_time">{{ m.create_time }}</span></div>
              <div style="text-align: center;padding: 10px;">
                <el-button class="mod_check" type="primary" size="mini" icon="el-icon-view" plain @click="handleModelCheck(m.name)">查看模型</el-button>
              </div>
              <div style="float: right;">
                <el-dropdown trigger="click" size="medium">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>编辑</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConMana',
  data () {
    return {
      input1: '',
      buildForm: {
        name: '',
        builder: '',
        data: ''
      },
      modelList: [{
        author: 'yuehualiu',
        name: 'demo',
        create_time: '2022-12-05'
      }],
      buildDialogVisible: false
    }
  },
  methods: {
    handleClose (done) {
      this.$refs.buildForm.resetFields()
      done()
    },
    handleBuild (op) {
      if (op === 'confirm') {
        // TODO 模型卡片添加，后端接口链接
      }
      this.$refs.buildForm.resetFields()
      this.buildDialogVisible = false
    },
    handleModelCheck (name) {
      this.$router.push({
        path: '/ecology/schema',
        query: {
          name: name
        }
      })
    }
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
.mod_header{
  height: 5vh;
  margin-top: 20px;
}
.mod_search{
  margin-left: 5px;
  width: 300px;
  cursor: text;
}
.build-btn{
  margin-right: 20px;
  float: right;
}
.box-card{
  width: 200px;
  height: 220px;
  margin: 0px 10px 20px 5px;
  border-radius: 20px;
}
.mod_name{
  font-size: 20px;
  padding-top: 40px;
  text-align: center;
}
.mod_create{
  font-size: 10px;
  color: gray;
}
.mod_create_auth{
  font-size: 10px;
  color: #409EFF;
}
.mod_create_info{
  font-size: 10px;
  color: gray;
}
.mod_create_time{
  font-size: 10px;
}
.mod_check{
  border-radius: 20px;
  text-align: center;
}
.el-dropdown-link i{
  cursor: pointer;
}
.el-dropdown-link i:hover{
  color: #409EFF;
}
</style>
