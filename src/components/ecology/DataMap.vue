<template>
  <div>
    <div class="header">
      <div class="ety_title">数据映射</div>
    </div>
    <div class="main">
      <div class="select-data-model">
        <div style="margin-top: 10px">
          模型选择：
          <el-select v-model="model" clearable placeholder="请选择" style="width: 70%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          点边选择：
          <el-select v-model="model" clearable placeholder="请选择" style="width: 70%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px;margin-left: 22px;">
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
<!--        <div style="margin-top: 10px;margin-left: 22px;text-align: left">模型预览：</div>-->
<!--        <div>-->
<!--          <el-empty :image-size="180"></el-empty>-->
<!--        </div>-->
      </div>
      <div class="es-mapping">
        <div style="margin-top: 10px">
          数据选择：
          <el-input style="width: 70%">
            <el-button slot="append" icon="el-icon-folder-add"></el-button>
          </el-input>
        </div>
        <div style="margin-top: 20px;margin-left: 22px;text-align: left">数据预览：</div>
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
      <div class="load-data">
        <div>
          <el-row style="margin-top: 15px;margin-left: 22px">
            <el-col :span="5">建立映射：</el-col>
            <el-col :span="5" :offset="13"><el-button type="primary" size="mini" style="text-align: right">自动匹配</el-button></el-col>
          </el-row>
        </div>
        <div style="margin-top: 10px;margin-left: 22px;">
          <el-table
            :data="previewData"
            height="520"
            border
            style="width: 95%">
            <el-table-column
              prop="fieldName"
              label="模型属性">
            </el-table-column>
            <el-table-column
              prop="sampleData"
              label="数据字段">
            </el-table-column>
            <el-table-column
              prop="sampleData"
              label="状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 10px;">
          <el-button type="success" size="medium" icon="el-icon-finished">加载数据</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataMap',
  data () {
    return {
      model: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      previewData: [{
        fieldName: 'id_card_no',
        sampleData: '1'
      }],
      attributeData: [{
        name: 'id',
        type: 'STRING'
      }]
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
  display: flex;
  align-items: center;
  flex-direction: row;
}
.ety_title{
  padding: 16px;
  font-size: 24px;
  font-weight: 800;
}
.select-data-model{
  width: 33%;
  height: 100%;
  text-align: center;
}
.es-mapping{
  width: 33%;
  height: 100%;
  text-align: center;
  background-color: #f7f6e7;
}
.load-data{
  width: 34%;
  height: 100%;
  text-align: center;
  background-color: #c1c0b9;
}
</style>
