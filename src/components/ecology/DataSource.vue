<template>
  <div>
    <div class="header">
      <div class="data_source_title">数据源管理</div>
    </div>
    <div class="main">
      <div style="width: 80%;height: 100%">
        <el-card style="height: 100%">
          <div>
            <el-input class="file_search" placeholder="搜索：查找文件名称" suffix-icon="el-icon-search" v-model="input" @keyup.enter.native="handleSearchIconClick"></el-input>
            <el-button class="build-btn" type="danger" @click="handleDeleteMulti">批量删除</el-button>
            <el-button class="build-btn" type="primary" @click="fileSubmitDialog = true">上传文件</el-button>
          </div>
          <el-divider></el-divider>
          <el-table
            height="480"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%;">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              sortable
              prop="name"
              label="文件名称">
            </el-table-column>
            <el-table-column
              sortable
              prop="date"
              label="创建时间">
            </el-table-column>
            <el-table-column
              sortable
              prop="size"
              label="大小">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="handleFileDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
<!--          <el-pagination-->
<!--            background-->
<!--            layout="prev, pager, next"-->
<!--            :total="tableData.length">-->
<!--          </el-pagination>-->
        </el-card>
      </div>
    </div>
    <el-dialog
      title="新增数据文件"
      :visible.sync="fileSubmitDialog"
      width="30%">
      <div style="margin-top: 10px">
        数据选择：
        <el-input v-model="fileName" :disabled="true" style="width: 80%">
          <el-upload action="#" slot="append" :multiple="false" :limit="1"
                     :show-file-list = "false" :auto-upload="false" accept=".csv"
                     :on-change="handleFileChange" :on-exceed="handleExceed">
            <el-button slot="trigger" icon = "el-icon-folder-add" size="small" style=""></el-button>
          </el-upload>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFileSubmit('cancel')">取 消</el-button>
        <el-button type="primary" @click="handleFileSubmit('enter')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delFile, getFileList, submitFile } from '@/apis/ecology/datasource'
import { saveModelCard } from '@/apis/ecology/modelcard'

export default {
  name: 'DataSource',
  data () {
    return {
      activeName: 'first',
      input: '',
      tableData: [],
      fileSubmitDialog: false,
      file: '',
      fileName: '',
      multipleSelection: []
    }
  },
  methods: {
    init () {
      getFileList().then(res => {
        this.tableData = res.data
      })
    },
    handleSearchIconClick () {
      const target = this.tableData.find(item => item.name === (this.input + '.csv'))
      if (target) {
        const name = this.input + '.csv'
        this.tableData.sort(function (lhs) {
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
    handleFileChange (file, fileList) {
      this.file = file
      this.fileName = file.name
    },
    handleExceed (files, fileList) {
      this.handleFileChange(files[0], fileList)
    },
    handleFileSubmit (op) {
      if (op === 'enter') {
        submitFile(this.file).then(res => {
          if (res.data.data === '200') {
            this.$notify.success({
              message: res.data.msg
            })
            this.init()
          } else if (res.data.data === '305') {
            this.$notify.warning({
              message: res.data.msg
            })
          } else {
            this.$notify.error({
              message: '文件上传失败！'
            })
          }
        })
      }
      this.fileSubmitDialog = false
      this.fileName = ''
    },
    handleFileDelete (rowData) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delFile(rowData.name).then(
          this.$notify.success({
            message: '文件删除成功！'
          }),
          this.init()
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleDeleteMulti () {
      this.multipleSelection.forEach(item => {
        delFile(item.name)
      })
      this.$notify.success({
        message: '文件删除成功！'
      })
      this.init()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
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
  justify-content: center;
  flex-direction: row;
}
.data_source_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
.file_search{
  width: 300px;
  cursor: text;
}
.build-btn{
  margin-left: 5px;
  float: right;
}
.el-pagination{
  text-align: center;
}
</style>
