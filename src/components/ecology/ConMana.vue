<template>
  <div>
    <div class="header">
      <div class="mod_title">内容管理</div>
    </div>
    <div class="main">
      <div class="mod_header">
        <el-input class="mod_search" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="inputSearch" @keyup.enter.native="handleSearchIconClick">
        </el-input>
        <el-button class="build-btn" type="primary" icon="el-icon-circle-plus-outline" @click="buildDialogVisible = true">创建模型</el-button>
<!--        <el-button class="build-btn" type="success" icon="el-icon-s-grid" @click="handleViewALl">所有模型</el-button>-->
        <el-dialog title="创建图模型" :visible.sync="buildDialogVisible" width="30%" :before-close="handleClose">
          <el-form ref="buildForm" :model="buildForm" label-width="100px">
            <el-form-item label="名称：" prop="name">
              <el-input v-model="buildForm.name" size="medium" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建者：" prop="builder">
              <el-input v-model="buildForm.builder" size="medium" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建时间：" prop="date">
              <el-date-picker type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd" v-model="buildForm.date" size="medium" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button size="medium" @click="handleCancel">取 消</el-button>
              <el-button type="primary" size="medium" @click="handleBuild">确 定</el-button>
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
                    <div @click="handleCardEdit(index)"><el-dropdown-item>编辑</el-dropdown-item></div>
                    <div @click="handleCardCopy(index)"><el-dropdown-item>复制</el-dropdown-item></div>
                    <div @click="handleCardDelete(index)"><el-dropdown-item>删除</el-dropdown-item></div>
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
import { copyModelCard, getModelCard, saveModelCard } from '@/apis/ecology/modelcard'

export default {
  name: 'ConMana',
  data () {
    return {
      inputSearch: '',
      buildForm: {
        name: '',
        builder: '',
        date: ''
      },
      modelList: [{
        author: 'yuehualiu',
        name: 'CSEM',
        create_time: '2022-12-05'
      }],
      buildDialogVisible: false,
      curIndex: -1
    }
  },
  methods: {
    init () {
      this.handleViewALl()
    },
    handleSearchIconClick () {
      const target = this.modelList.find(item => item.name === this.inputSearch)
      if (target) {
        const name = this.inputSearch
        this.modelList.sort(function (lhs) {
          return lhs.name !== name
        })
        this.$notify.success({
          title: '消息',
          message: '查找成功'
        })
      } else {
        this.$notify.info({
          title: '消息',
          message: '查找失败'
        })
      }
    },
    handleClose (done) {
      this.$refs.buildForm.resetFields()
      done()
    },
    handleViewALl () {
      this.curIndex = -1
      getModelCard().then(res => {
        this.modelList = res.data
        this.$notify.success({
          title: '成功',
          message: '模型加载'
        })
      })
    },
    handleBuild () {
      const tmpData = {
        author: this.buildForm.builder,
        name: this.buildForm.name,
        create_time: this.buildForm.date
      }
      if (this.curIndex === -1) {
        this.modelList.push(tmpData)
        saveModelCard(this.modelList).then(res => {
          this.$notify.success({
            title: '成功'
          })
        })
      } else {
        const oldName = this.modelList[this.curIndex].name
        const newName = this.buildForm.name
        this.modelList[this.curIndex] = tmpData
        saveModelCard(this.modelList, oldName, newName).then(res => {
          this.$notify.success({
            title: '成功'
          })
        })
      }
      this.curIndex = -1
      this.$refs.buildForm.resetFields()
      this.buildDialogVisible = false
    },
    handleCancel () {
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
    },
    handleCardEdit (index) {
      this.curIndex = index
      this.buildForm.name = this.modelList[index].name
      this.buildForm.builder = this.modelList[index].author
      this.buildForm.date = this.modelList[index].create_time
      this.buildDialogVisible = true
    },
    handleCardCopy (index) {
      console.log(index)
      const tmpData = {
        author: this.modelList[index].author,
        name: this.modelList[index].name + '(副本)',
        create_time: this.modelList[index].create_time
      }
      this.modelList.push(tmpData)
      saveModelCard(this.modelList).then(res => {
        this.$notify.success({
          title: '成功'
        })
      })
      copyModelCard(this.modelList[index].name).then(res => {
        this.$notify.success({
          title: '成功'
        })
      })
    },
    handleCardDelete (index) {
      this.$confirm('此操作将删除该元模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.modelList.splice(index, 1)
        saveModelCard(this.modelList).then(res => {
          this.$notify.success({
            title: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
