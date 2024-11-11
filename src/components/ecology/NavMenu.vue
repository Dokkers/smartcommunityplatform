<template>
  <div>
    <div class="header">
      <div class="pro_title">生态模型管理</div>
   </div>
    <div class="main">
      <template>
        <div style="width: 54vw">
          <el-input class="pro_search" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="inputSearch" @keyup.enter.native="handleSearchIconClick"></el-input>
          <el-button type="success" style="float: right;margin-top: 10px" icon="el-icon-circle-plus" @click="buildProjectVisible = true, disabled = false">创建</el-button>
        </div>
        <el-scrollbar style="height: 100%">
          <div class="project" v-for="(mProject, index) in projectList" :key="index">
            <div style="font-size: 17px;margin-top: 5px">
              <i class="el-icon-folder"></i>
              {{ mProject.name }}
<!--              <br>{{ mProject.path }}-->
            </div>
            <el-button-group>
              <el-button type="primary" size="medium" icon="el-icon-edit" @click="handleEdit(index)"></el-button>
              <el-button type="danger" size="medium" icon="el-icon-delete" @click="handleDelete(index)"></el-button>
            </el-button-group>
          </div>
          <el-dialog title="创建生态模型" :visible.sync="buildProjectVisible" width="30%" :before-close="handleClose">
            <el-form ref="buildForm" :model="buildForm" label-width="100px">
              <el-form-item label="生态模型名：" prop="name">
                <el-input v-model="buildForm.name" size="medium" clearable></el-input>
              </el-form-item>
              <el-form-item label="数据库名：" prop="database">
                <el-input v-model="buildForm.database" size="medium" clearable :disabled="disabled"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="medium" @click="handleCancel">取 消</el-button>
              <el-button size="medium" type="primary" @click="handleBuild">确 定</el-button>
          </span>
          </el-dialog>
        </el-scrollbar>
      </template>
    </div>
  </div>
</template>

<script>
import { getProjectList, saveProjectList } from '@/apis/ecology/project'

export default {
  name: 'NavMenu',
  data () {
    return {
      inputSearch: '',
      buildProjectVisible: false,
      curIndex: -1,
      disabled: false,
      projectList: [
        {
          name: '长三角智慧社区',
          path: 'D:\\Store\\smartcommunity\\Project'
        },
        {
          name: '济宁社区',
          path: 'D:\\Store\\smartcommunity\\Project'
        }
      ],
      buildForm: {
        name: '',
        database: ''
      }
    }
  },
  methods: {
    init () {
      getProjectList().then(res => {
        this.projectList = res.data
        this.$notify.success({
          title: '成功',
          message: '生态模型列表加载'
        })
      })
    },
    handleSearchIconClick () {
      const target = this.projectList.find(item => item.name === this.inputSearch)
      if (target) {
        const name = this.inputSearch
        this.projectList.sort(function (lhs) {
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
    handleBuild () {
      const tmpData = {
        name: this.buildForm.name,
        database: this.buildForm.database
      }
      if (this.curIndex === -1) {
        const copyProject = [...this.projectList]
        copyProject.push(tmpData)
        saveProjectList(copyProject, this.buildForm.database).then(res => {
          if (res.data.msg === 'success') {
            this.$notify.success({
              title: '成功'
            })
            this.projectList.push(tmpData)
          } else {
            this.$notify.error({
              title: res.data.msg
            })
          }
        })
      } else {
        this.projectList[this.curIndex] = tmpData
        saveProjectList(this.projectList).then(res => {
          this.$notify.success({
            title: '成功'
          })
        })
      }

      this.curIndex = -1
      this.$refs.buildForm.resetFields()
      this.buildProjectVisible = false
    },
    handleCancel () {
      this.$refs.buildForm.resetFields()
      this.buildProjectVisible = false
    },
    handleEdit (index) {
      this.disabled = true
      this.curIndex = index
      this.buildForm.name = this.projectList[index].name
      this.buildForm.database = this.projectList[index].database
      this.buildProjectVisible = true
    },
    handleDelete (index) {
      this.projectList.splice(index, 1)
      saveProjectList(this.projectList).then(res => {
        this.$notify.success({
          title: '删除成功'
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
.pro_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
.main{
  width: 85vw;
  height: 90vh;
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
  margin-right: 100px;
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
