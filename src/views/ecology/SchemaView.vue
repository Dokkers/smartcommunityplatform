<template>
  <div class="container">
    <div class="aside">
      <div>
        <el-badge class="build_model" value="√" type="success">
          <i class="el-icon-box" @click="step = 1"></i>
        </el-badge>
        <div style="font-size: 12px;margin-left: 10px;margin-top: 10px;">创建模型</div>
      </div>
      <div>
        <el-badge class="mapping_data" value="!" type="warning">
          <i class="el-icon-s-operation" @click="step = 2"></i>
        </el-badge>
        <div style="font-size: 12px;margin-left: 10px;margin-top: 10px;">映射数据</div>
      </div>
      <el-button class="back" icon="el-icon-back" plain @click="back"></el-button>
    </div>
    <div>
      <div class="header">
        <div class="title">图模型：{{this.$route.query.name}}</div>
      </div>
      <div class="model_toolbar" v-show="step == 1">
        <div>
          <div><i class="el-icon-circle-plus-outline" @click="nodeDialogVisible = true"></i></div>
          <div style="font-size: 12px;">创建点</div>
        </div>
        <div>
          <div><i class="el-icon-remove-outline" @click="handleEdgeCreate(edgeCreateState)"></i></div>
          <div style="font-size: 12px;">创建边</div>
        </div>
        <div>
          <div><i class="el-icon-circle-check" @click="handleGraphSave"></i></div>
          <div style="font-size: 12px;">保存</div>
        </div>
        <div>
          <div><i class="el-icon-edit"></i></div>
          <div style="font-size: 12px;">编辑</div>
        </div>
        <div>
          <div><i class="el-icon-delete"></i></div>
          <div style="font-size: 12px;">删除</div>
        </div>
        <div>
          <div><i class="el-icon-arrow-left"></i></div>
          <div style="font-size: 12px;">撤销</div>
        </div>
        <div>
          <div><i class="el-icon-zoom-in"></i></div>
          <div style="font-size: 12px;">放大</div>
        </div>
        <div>
          <div><i class="el-icon-zoom-out"></i></div>
          <div style="font-size: 12px;">缩小</div>
        </div>
        <div>
          <div><i class="el-icon-c-scale-to-original"></i></div>
          <div style="font-size: 12px;">适应屏幕</div>
        </div>
        <div>
          <div><i class="el-icon-full-screen"></i></div>
          <div style="font-size: 12px;">实际大小</div>
        </div>
      </div>
      <div class="data_toolbar" v-show="step == 2">
        <div>
          <div><i class="el-icon-document-add" @click="dataDialogVisible = true"></i></div>
          <div style="font-size: 12px;">选择数据</div>
        </div>
        <div>
          <div><i class="el-icon-set-up" @click="handleEdgeCreateOfData(edgeCreateState)"></i></div>
          <div style="font-size: 12px;">建立映射</div>
        </div>
        <div>
          <div><i class="el-icon-document-copy"></i></div>
          <div style="font-size: 12px;">复制映射</div>
        </div>
        <div>
          <div><i class="el-icon-document-checked"></i></div>
          <div style="font-size: 12px;">保存映射</div>
        </div>
        <div>
          <div><i class="el-icon-delete"></i></div>
          <div style="font-size: 12px;">删除</div>
        </div>
      </div>
      <div id="mountNode" class="main" ref="mountNode">
      </div>
    </div>
    <el-dialog title="创建点" :visible.sync="nodeDialogVisible" :before-close="handleNodeAdd" top="5vh" width="30%">
      <el-form ref="nodeForm" :model="nodeForm" label-width="100px">
        <el-form-item label="点类型名称：" prop="name">
          <el-input v-model="nodeForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="样式：" prop="builder" style="padding-top: 10px">
          <el-color-picker v-model="nodeForm.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="属性：" prop="date">
          <div>
            <el-divider><span style="color: #c0c4cc">单击"+"添加属性</span></el-divider>
            <div v-for="(item, index) in nodeForm.props" :key="index">
              <el-col :span="11">
                <el-input v-model="item.name" size="small" clearable placeholder="属性名称"></el-input>
              </el-col>
              <el-col :span="1" style="font-size: 30px">-</el-col>
              <el-col :span="11">
                <el-select v-model="item.type" size="small" placeholder="属性类型">
                  <el-option
                    v-for="tp in typeOptions"
                    :key="tp"
                    :label="tp"
                    :value="tp">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1">
                <div class="props-delete"><i class="el-icon-delete"></i></div>
              </el-col>
            </div>
            <div class="props-plus"><i class="el-icon-circle-plus" @click="nodeForm.props.push({name: '', type: ''})"></i></div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleNodeAdd('cancel')">取 消</el-button>
        <el-button type="primary" @click="handleNodeAdd('add')">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="创建边" :visible.sync="edgeDialogVisible" :before-close="handleEdgeAdd" top="5vh" width="30%">
      <el-form ref="edgeForm" :model="nodeForm" label-width="100px">
        <el-form-item label="边类型名称：" prop="name">
          <el-input v-model="edgeForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="起止点：" prop="builder" style="padding-top: 10px">
          <el-col :span="11" style="text-align: center">
            {{edgeForm.source}}
          </el-col>
          <el-col :span="1" style="font-size: 30px">-</el-col>
          <el-col :span="11" style="text-align: center">
            {{edgeForm.target}}
          </el-col>
        </el-form-item>
        <el-form-item label="属性：" prop="date">
          <div>
            <el-divider><span style="color: #c0c4cc">单击"+"添加属性</span></el-divider>
            <div v-for="(item, index) in edgeForm.props" :key="index">
              <el-col :span="11">
                <el-input v-model="item.name" size="small" clearable placeholder="属性名称"></el-input>
              </el-col>
              <el-col :span="1" style="font-size: 30px">-</el-col>
              <el-col :span="11">
                <el-select v-model="item.type" size="small" placeholder="属性类型">
                  <el-option
                    v-for="tp in typeOptions"
                    :key="tp"
                    :label="tp"
                    :value="tp">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1">
                <div class="props-delete"><i class="el-icon-delete"></i></div>
              </el-col>
            </div>
            <div class="props-plus"><i class="el-icon-circle-plus" @click="edgeForm.props.push({name: '', type: ''})"></i></div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEdgeAdd('cancel')">取 消</el-button>
        <el-button type="primary" @click="handleEdgeAdd('add')">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择数据" :visible.sync="dataDialogVisible" top="5vh" width="50%">
      <el-tabs v-model="activeName" tab-position="left">
        <el-tab-pane label="公共目录" name="first">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-search" style="margin-top: 10px;width: 300px;cursor: text;"></el-input>
          <el-table
            height="400"
            ref="multipleSelection"
            :data="publicDirectoryData"
            tooltip-effect="dark"
            border
            style="width: 100%;margin-top: 10px;"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="文件名称"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="timestamp"
              label="创建时间"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="size"
              label="大小"
              sortable
              width="180">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="SQL数据源" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="TXT" name="third">TXT</el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <el-button style="float: left;">取 消</el-button>
        <el-button>预 览</el-button>
        <el-button type="primary" @click="handleFileSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import insertCss from 'insert-css'
import { Selection } from '@antv/x6-plugin-selection'
import { Scroller } from '@antv/x6-plugin-scroller'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Graph } from '@antv/x6'
// insertCss(`
//
// `)
Graph.registerNode(
  'er-rect',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body'
      },
      {
        tagName: 'text',
        selector: 'label'
      }
    ],
    attrs: {
      rect: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#5F95FF'
      },
      label: {
        fontWeight: 'bold',
        fill: '#ffffff',
        fontSize: 12
      }
    },
    ports: {
      groups: {
        list: {
          markup: [
            {
              tagName: 'rect',
              selector: 'portBody'
            },
            {
              tagName: 'text',
              selector: 'portNameLabel'
            },
            {
              tagName: 'text',
              selector: 'portTypeLabel'
            }
          ],
          attrs: {
            portBody: {
              width: 150,
              height: 24,
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
              magnet: true
            },
            portNameLabel: {
              ref: 'portBody',
              refX: 6,
              refY: 6,
              fontSize: 10
            },
            portTypeLabel: {
              ref: 'portBody',
              refX: 95,
              refY: 6,
              fontSize: 10
            }
          },
          position: 'erPortPosition'
        }
      }
    }
  },
  true
)
// 实现
Graph.registerEdge(
  'mapping',
  {
    inherit: 'edge',
    attrs: {
      line: {
        strokeWidth: 1,
        strokeDasharray: '3,3'
      }
    }
  },
  true
)
Graph.registerPortLayout(
  'erPortPosition',
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: (index + 1) * 24
        },
        angle: 0
      }
    })
  },
  true
)
export default {
  name: 'SchemaView',
  data () {
    return {
      graph: null,
      step: '1',
      nodeDialogVisible: false,
      edgeDialogVisible: false,
      dataDialogVisible: false,
      nodeForm: {
        name: '',
        color: '#5F95FF',
        props: [{
          name: 'ID',
          type: 'STRING'
        },
        {
          name: 'NAME',
          type: 'STRING'
        }]
      },
      typeOptions: ['STRING', 'INT', 'NUMBER', 'BOOLEAN', 'OBJECT'],
      edgeCreateState: null,
      edgeForm: {
        name: '',
        source: '无',
        target: '无',
        props: []
      },
      activeName: 'first',
      publicDirectoryData: [{
        name: '组织.csv',
        timestamp: '2023-1-11',
        size: '1.14KB'
      }],
      multipleSelection: []
    }
  },
  methods: {
    init () {
      const width = document.getElementById('mountNode').scrollWidth || 800
      const height = document.getElementById('mountNode').scrollHeight || 500
      this.graph = new Graph({
        container: this.$refs.mountNode,
        width, // Number，必须，图的宽度
        height, // Number，必须，图的高度
        background: {
          color: '#F2F7FA'
        },
        grid: false,
        panning: true,
        keyboard: true,
        clipboard: {
          enabled: true,
          useLocalStorage: true
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl'],
          minScale: 0.5,
          maxScale: 3
        },
        resizing: {
          enabled: true,
          preserveAspectRatio: true
        },
        rotating: true,
        interacting: {
          edgeMovable: true,
          arrowheadMovable: true
        },
        connecting: {
          router: {
            name: 'normal'
          },
          connector: {
            name: 'normal'
          },
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: true,
          allowNode: true,
          snap: {
            radius: 20 // 距离节点或者连接桩 20px 时会触发自动吸附
          },
          validateConnection ({ sourceMagnet, targetMagnet }) {
            return true
          }
        }
      })
      // 事件绑定/解绑
      this.graph.use(
        new Scroller({
          enabled: true
        })
      )
      // TODO 小地图
      // this.graph.use(
      //   new MiniMap({
      //     container: this.$refs.mountNode,
      //   })
      // )
      this.graph.on('blank:click', () => {
        this.graph.getCells().forEach(cell => {
          cell.removeTools()
        })
      })
      this.graph.on('node:click', ({ node }) => {
        console.log(node.getLabel())
        this.graph.getCells().forEach(cell => {
          cell.removeTools()
        })
        node.addTools([
          {
            name: 'boundary'
          }
        ])
        if (this.edgeCreateState === 'selectSource') {
          this.edgeForm.source = node.getLabel()
          const h = this.$createElement
          this.$message({
            showClose: true,
            message: h('p', null, [
              h('span', null, '创建边 '),
              h('i', { style: 'color: teal' }, '请选择终止点'),
              h('i', { style: 'color: gray' }, '  如果需要停止创建边，请再次单击退出创建边!')
            ])
          })
          this.edgeCreateState = 'selectTarget'
          console.log(node.attrs.label)
        } else if (this.edgeCreateState === 'selectTarget') {
          this.edgeForm.target = node.getLabel()
          node.removeTools()
          this.edgeDialogVisible = true
          console.log(node.attrs.label)
        } else if (this.edgeCreateState === 'mappingFirst') {
          this.edgeForm.source = node.getLabel()
          const h = this.$createElement
          this.$message({
            showClose: true,
            message: h('p', null, [
              h('span', null, '建立映射 '),
              h('i', { style: 'color: teal' }, '请选择点或者边以建立映射'),
              h('i', { style: 'color: gray' }, '  如果需要停止添加数据映射，请再次点击退出数据映射状态!!')
            ])
          })
          this.edgeCreateState = 'mappingSecond'
        } else if (this.edgeCreateState === 'mappingSecond') {
          this.edgeForm.target = node.getLabel()
          node.removeTools()
          this.graph.addEdge({
            shape: 'mapping',
            source: this.edgeForm.source,
            target: this.edgeForm.target
          })
          console.log(node.attrs.label)
        }
      })
      this.graph.on('edge:mouseenter', ({ cell }) => {
        cell.addTools([
          {
            name: 'source-arrowhead'
          },
          {
            name: 'target-arrowhead',
            args: {
              attrs: {
                fill: 'red'
              }
            }
          }
        ])
      })
      this.graph.on('edge:mouseleave', ({ cell }) => {
        cell.removeTools()
      })
      // this.graph.fromJSON([
      //   {
      //     id: '1',
      //     shape: 'er-rect',
      //     label: '学生',
      //     width: 150,
      //     height: 24,
      //     position: {
      //       x: 24,
      //       y: 150
      //     },
      //     ports: [
      //       {
      //         id: '1-1',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'ID'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       },
      //       {
      //         id: '1-2',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'Name'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       },
      //       {
      //         id: '1-3',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'Class'
      //           },
      //           portTypeLabel: {
      //             text: 'NUMBER'
      //           }
      //         }
      //       },
      //       {
      //         id: '1-4',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'Gender'
      //           },
      //           portTypeLabel: {
      //             text: 'BOOLEAN'
      //           }
      //         }
      //       }
      //     ]
      //   },
      //   {
      //     id: '2',
      //     shape: 'er-rect',
      //     label: '课程',
      //     width: 150,
      //     height: 24,
      //     position: {
      //       x: 250,
      //       y: 210
      //     },
      //     ports: [
      //       {
      //         id: '2-1',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'ID'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       },
      //       {
      //         id: '2-2',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'Name'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       },
      //       {
      //         id: '2-3',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'StudentID'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       },
      //       {
      //         id: '2-4',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'TeacherID'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       },
      //       {
      //         id: '2-5',
      //         group: 'list',
      //         attrs: {
      //           portNameLabel: {
      //             text: 'Description'
      //           },
      //           portTypeLabel: {
      //             text: 'STRING'
      //           }
      //         }
      //       }
      //     ]
      //   },
      //   {
      //     id: '4',
      //     shape: 'edge',
      //     source: '1',
      //     target: '2'
      //   }
      // ])
    },
    back () {
      this.$router.push('/ecology')
    },
    handleNodeAdd (op) {
      if (op === 'add') {
        const ports = []
        this.nodeForm.props.forEach(item => {
          ports.push({
            // id: '3-1',
            group: 'list',
            attrs: {
              portNameLabel: {
                text: item.name
              },
              portTypeLabel: {
                text: item.type
              }
            }
          })
        })
        this.graph.addNode({
          id: this.nodeForm.name,
          shape: 'er-rect',
          label: this.nodeForm.name,
          width: 150,
          height: 24,
          position: {
            x: 24,
            y: 150
          },
          attrs: {
            rect: {
              fill: this.nodeForm.color
            }
          },
          ports: ports,
          data: this.nodeForm.props
        })
      }
      this.$refs.nodeForm.resetFields()
      this.nodeDialogVisible = false
    },
    handleEdgeCreate (state) {
      const h = this.$createElement
      if (state == null) {
        this.$message({
          showClose: true,
          message: h('p', null, [
            h('span', null, '创建边 '),
            h('i', { style: 'color: teal' }, '请选择起始点'),
            h('i', { style: 'color: gray' }, '  如果需要停止创建边，请再次单击退出创建边!')
          ])
        })
        this.edgeCreateState = 'selectSource'
      } else {
        this.$message({
          showClose: true,
          message: h('p', null, [
            h('span', null, '创建边 '),
            h('i', { style: 'color: teal' }, '退出创建边！')
          ])
        })
        this.edgeCreateState = null
      }
    },
    handleEdgeAdd (op) {
      if (op === 'add') {
        this.graph.addEdge({
          labels: this.edgeForm.name,
          source: this.edgeForm.source,
          target: this.edgeForm.target,
          data: this.nodeForm.props
        })
      }
      this.$refs.edgeForm.resetFields()
      this.edgeDialogVisible = false
      this.edgeCreateState = null
    },
    handleGraphSave () {
      console.log(this.graph.toJSON())
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleFileSelect () {
      console.log(this.multipleSelection)
      // TODO 选择数据逻辑补充
      this.multipleSelection.forEach(item => {
        this.graph.addNode({
          id: item.name,
          shape: 'circle',
          x: 40,
          y: 40,
          width: 60,
          height: 60,
          label: item.name
        })
      })
      this.dataDialogVisible = false
    },
    handleEdgeCreateOfData (state) {
      const h = this.$createElement
      if (state == null) {
        this.$message({
          showClose: true,
          message: h('p', null, [
            h('span', null, '建立映射 '),
            h('i', { style: 'color: teal' }, '请选择数据文件作为起始点'),
            h('i', { style: 'color: gray' }, '  如果需要停止添加数据映射，请再次点击退出数据映射状态!')
          ])
        })
        this.edgeCreateState = 'mappingFirst'
      } else {
        this.$message({
          showClose: true,
          message: h('p', null, [
            h('span', null, '建立映射 '),
            h('i', { style: 'color: teal' }, '退出映射！')
          ])
        })
        this.edgeCreateState = null
      }
    }
  },
  mounted () {
    this.init()
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
  width: 5vw;
  height: 100vh;
  position: relative;
  background-color: white;
}
.header{
  width: 95vw;
  height: 10vh;
  text-align: center;
  background-color: #e3e3e3;
}
.main{
  width: 95vw;
  height: 82vh;
}
.title{
  font-size: 24px;
  font-weight: 800;
  padding-top: 15px;
}
.back{
  position: absolute;
  left: 10px;
  bottom: 10px;
  cursor: pointer;
}
.model_toolbar{
  width: 530px;
  height: 8vh;
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 40px;
  text-align: center;
  font-size: 25px;
  color: #545454;
  padding: 5px;
}
.model_toolbar div:hover{
  color: blue;
  cursor: pointer;
}
.model_toolbar div{
  margin-left: 10px;
}
.data_toolbar{
  width: 350px;
  height: 8vh;
  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 40px;
  text-align: center;
  font-size: 25px;
  color: #545454;
  padding: 5px;
}
.data_toolbar div:hover{
  color: blue;
  cursor: pointer;
}
.data_toolbar div{
  margin-left: 10px;
}
.el-form-item{
  margin: 0;
}
.props-delete i{
  font-size: 15px;
  margin-left: 5px;
  cursor: pointer
}
.props-delete i:hover{
  color: red;
}
.props-plus i{
  font-size: 20px;
  cursor: pointer;
}
.props-plus i:hover{
  color: blue;
}
.build_model{
  margin-top: 100px;
  margin-left: 19px;
  height: 20px;
  width: 40px;
}
.el-icon-box{
  font-size: 30px;
}
.el-icon-box:hover{
  cursor: pointer;
  color: #5cb6ff;
}
.mapping_data{
  margin-top: 20px;
  margin-left: 19px;
  height: 20px;
  width: 40px;
}
.el-icon-s-operation{
  font-size: 30px;
}
.el-icon-s-operation:hover{
  cursor: pointer;
  color: #5cb6ff;
}
</style>
