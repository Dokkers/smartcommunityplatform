<template>
  <div class="container">
    <div class="aside">
      <el-button class="back" icon="el-icon-back" plain @click="back"></el-button>
    </div>
    <div>
      <div class="header">
        <div class="title">元模型建模：{{this.$route.query.name}}</div>
      </div>
      <div class="model_toolbar">
        <div @click="nodeDialogVisible = true">
          <div><i class="el-icon-circle-plus-outline"></i></div>
          <div style="font-size: 12px;">创建点</div>
        </div>
        <div @click="edgeDialogVisible = true">
          <div><i class="el-icon-remove-outline"></i></div>
          <div style="font-size: 12px;">创建边</div>
        </div>
        <div @click="handleGraphSave">
          <div><i class="el-icon-circle-check"></i></div>
          <div style="font-size: 12px;">保存</div>
        </div>
<!--        <div @click="handleCellEdit">-->
<!--          <div><i class="el-icon-edit"></i></div>-->
<!--          <div style="font-size: 12px;">编辑</div>-->
<!--        </div>-->
        <div @click="handleCellDelete">
          <div><i class="el-icon-delete"></i></div>
          <div style="font-size: 12px;">删除</div>
        </div>
        <div @click="graph.undo()">
          <div><i class="el-icon-arrow-left"></i></div>
          <div style="font-size: 12px;">撤销</div>
        </div>
        <div @click="graph.zoom(0.1)">
          <div><i class="el-icon-zoom-in"></i></div>
          <div style="font-size: 12px;">放大</div>
        </div>
        <div @click="graph.zoom(-0.1)">
          <div><i class="el-icon-zoom-out"></i></div>
          <div style="font-size: 12px;">缩小</div>
        </div>
        <div @click="graph.centerContent()">
          <div><i class="el-icon-c-scale-to-original"></i></div>
          <div style="font-size: 12px;">适应屏幕</div>
        </div>
        <div @click="graph.zoomTo(1)">
          <div><i class="el-icon-full-screen"></i></div>
          <div style="font-size: 12px;">实际大小</div>
        </div>
      </div>
      <div id="mountNode" class="main" ref="mountNode">
      </div>
    </div>
    <el-dialog title="节点" :visible.sync="nodeDialogVisible" :before-close="handleNodeAdd" top="5vh" width="30%">
      <el-form ref="nodeForm" :model="nodeForm" label-width="100px">
        <el-form-item label="点名称：" prop="label">
          <el-input v-model="nodeForm.id" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="样式：" prop="builder" style="padding-top: 10px">
          <el-color-picker v-model="nodeForm.color" size="medium"></el-color-picker>
        </el-form-item>
        <el-form-item label="属性：">
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
                <div class="props-delete"><i class="el-icon-delete" @click="nodeForm.props.splice(index, 1)"></i></div>
              </el-col>
            </div>
            <div class="props-plus"><i class="el-icon-circle-plus" @click="nodeForm.props.push({name: '', type: ''})"></i></div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleNodeAdd('cancel')">取 消</el-button>
        <el-button type="primary" size="medium" @click="handleNodeAdd('add')">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="边" :visible.sync="edgeDialogVisible" :before-close="handleEdgeAdd" top="5vh" width="30%">
      <el-form ref="edgeForm" :model="nodeForm" label-width="100px">
        <el-form-item label="边名称：" prop="name">
          <el-input v-model="edgeForm.label" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="起点：">
          <el-select v-model="edgeForm.source" placeholder="请选择" size="small">
            <el-option
              v-for="item in nodeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终点：">
          <el-select v-model="edgeForm.target" placeholder="请选择" size="small">
            <el-option
              v-for="item in nodeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性：">
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
                <div class="props-delete"><i class="el-icon-delete" @click="edgeForm.props.splice(index, 1)"></i></div>
              </el-col>
            </div>
            <div class="props-plus"><i class="el-icon-circle-plus" @click="edgeForm.props.push({name: '', type: ''})"></i></div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="handleEdgeAdd('cancel')">取 消</el-button>
        <el-button type="primary" size="medium" @click="handleEdgeAdd('add')">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Graph, ObjectExt, Line, Path, Curve } from '@antv/x6'
import { getSchema, saveSchema } from '@/apis/ecology/schema'
// #region 注册基础图形
Graph.registerNode(
  'class',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body'
      },
      {
        tagName: 'rect',
        selector: 'name-rect'
      },
      {
        tagName: 'rect',
        selector: 'attrs-rect'
      },
      {
        tagName: 'rect',
        selector: 'methods-rect'
      },
      {
        tagName: 'text',
        selector: 'name-text'
      },
      {
        tagName: 'text',
        selector: 'attrs-text'
      },
      {
        tagName: 'text',
        selector: 'methods-text'
      }
    ],
    attrs: {
      rect: {
        width: 160
      },
      body: {
        stroke: '#fff'
      },
      'name-rect': {
        fill: '#5f95ff',
        stroke: '#fff',
        strokeWidth: 0.5
      },
      'attrs-rect': {
        fill: '#eff4ff',
        stroke: '#fff',
        strokeWidth: 0.5
      },
      'methods-rect': {
        fill: '#eff4ff',
        stroke: '#fff',
        strokeWidth: 0.5
      },
      'name-text': {
        ref: 'name-rect',
        refY: 0.5,
        refX: 0.5,
        textAnchor: 'middle',
        fontWeight: 'bold',
        fill: '#fff',
        fontSize: 12
      },
      'attrs-text': {
        ref: 'attrs-rect',
        refY: 0.5,
        refX: 5,
        textAnchor: 'left',
        fill: 'black',
        fontSize: 10
      },
      'methods-text': {
        ref: 'methods-rect',
        refY: 0.5,
        refX: 5,
        textAnchor: 'left',
        fill: 'black',
        fontSize: 10
      }
    },
    propHooks (meta) {
      const { name, attributes, methods, ...others } = meta

      if (!(name && attributes && methods)) {
        return meta
      }

      const rects = [
        { type: 'name', text: name },
        { type: 'attrs', text: attributes },
        { type: 'methods', text: methods }
      ]

      let offsetY = 0
      rects.forEach((rect) => {
        const height = rect.text.length * 12 + 16
        ObjectExt.setByPath(
          others,
          `attrs/${rect.type}-text/text`,
          rect.text.join('\n')
        )
        ObjectExt.setByPath(others, `attrs/${rect.type}-rect/height`, height)
        ObjectExt.setByPath(
          others,
          `attrs/${rect.type}-rect/transform`,
          'translate(0,' + offsetY + ')'
        )
        offsetY += height
      })

      others.size = { width: 160, height: offsetY }

      return others
    }
  },
  true
)
// 关联
Graph.registerEdge(
  'association',
  {
    inherit: 'edge',
    attrs: {
      line: {
        strokeWidth: 1,
        targetMarker: {
          name: 'path',
          d: 'M 6 10 L 18 4 C 14.3333 6 10.6667 8 7 10 L 18 16 z',
          fill: 'black',
          offsetX: -5
        }
      }
    }
  },
  true
)
// 连线规则
Graph.registerConnector(
  'multi-smooth',
  (
    sourcePoint,
    targetPoint,
    routePoints,
    options // : { raw?: boolean; index?: number; total?: number; gap?: number }
  ) => {
    const { index = 0, total = 5, gap = 30 } = options
    const line = new Line(sourcePoint, targetPoint)
    const centerIndex = (total - 1) / 2
    const dist = index - centerIndex
    const diff = Math.abs(dist)
    const factor = diff === 0 ? 1 : diff / dist
    const vertice = line
      .pointAtLength(line.length() / 2 + gap * factor * Math.ceil(diff))
      .rotate(90, line.getCenter())

    const points = [sourcePoint, vertice, targetPoint]
    const curves = Curve.throughPoints(points)
    const path = new Path(curves)
    return options.raw ? path : path.serialize()
  },
  true
)
const nodeFormSample = {
  id: '',
  color: '#5F95FF',
  props: [
    {
      name: 'NAME',
      type: 'STRING'
    }]
}
const edgeFormSample = {
  id: '',
  label: '',
  source: '',
  target: '',
  props: [
    {
      name: 'NAME',
      type: 'STRING'
    }]
}
const indexOfEdge = [2, 1, 3, 0, 4]
export default {
  name: 'SchemaView',
  data () {
    return {
      graph: null,
      nodeDialogVisible: false,
      edgeDialogVisible: false,
      dataDialogVisible: false,
      editDialogVisible: false,
      nodeForm: JSON.parse(JSON.stringify(nodeFormSample)),
      nodeOptions: [],
      typeOptions: ['STRING', 'INT', 'NUMBER', 'BOOLEAN', 'OBJECT', 'ENUM', 'TUPLE', 'SET'],
      edgeCreateState: null,
      edgeForm: JSON.parse(JSON.stringify(edgeFormSample)),
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
        grid: true, // 网格
        scroller: false, // Scroller 使画布具备滚动、平移、居中、缩放等能力
        panning: true, // 画布的拖拽平移，不要同时使用 scroller 和 panning，因为两种形式在交互上有冲突。
        keyboard: true, // 键盘快捷键
        history: true, // 撤销/重做 Undo/Redo
        selecting: { // 点选/框选，默认禁用。创建画布时，通过以下配置开启选择交互，开启后可以通过点击或者套索框选节点
          enable: false,
          multiple: true, // 是否启用点击多选
          multipleSelectionModifiers: ['ctrl'] // 设置修饰键后需按下修饰键才能触发点选多选,默认值是 ['ctrl', 'meta']
        },
        clipboard: { // 剪切板
          enabled: false,
          useLocalStorage: true // 开启 useLocalStorage 后，被复制的节点/边同时被保存到 localStorage 中，浏览器刷新或者关闭后重新打开，复制/粘贴也能正常工作。
        },
        mousewheel: { // 配合修饰键来实现滚轮缩放画布
          enabled: true,
          modifiers: ['ctrl'],
          minScale: 0.5,
          maxScale: 3
        },
        resizing: { // 缩放节点
          enabled: false,
          preserveAspectRatio: true // 缩放过程中是否保持节点的宽高比例
        },
        rotating: false, // 旋转节点
        interacting: { // 定制节点和边的交互行为
          edgeMovable: false, // 边是否可以被移动。
          arrowheadMovable: false // 边的起始/终止箭头是否可以被移动。
        },
        connecting: { // 配置全局的连线规则
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowLoop: true, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
          allowNode: true, // 是否允许边链接到节点（非节点上的链接桩）
          allowEdge: false, // 是否允许边链接到另一个边
          allowMulti: 'withPort', // 是否允许在相同的起始节点和终止之间创建多条边
          snap: {
            radius: 20 // 距离节点或者连接桩 20px 时会触发自动吸附
          }
        }
      })
      getSchema(this.$route.query.name).then(res => {
        this.graph.fromJSON(res.data)
        this.graph.centerContent()
        res.data.forEach(cell => {
          if (cell.shape === 'class') {
            this.nodeOptions.push(cell.id)
          }
        })
      })
      // 事件绑定/解绑
      this.graph.on('blank:click', () => {
        this.graph.cleanSelection()
      })
      this.graph.on('node:selected', ({ node }) => {
        node.addTools([
          {
            name: 'boundary'
          }
        ])
      })
      this.graph.on('node:unselected', ({ node }) => {
        node.removeTools()
      })
      this.graph.on('node:click', ({ node }) => {
        this.graph.cleanSelection()
        this.graph.select(node)
      })
      this.graph.on('node:added', ({ node, index, options }) => {
        this.nodeOptions.push(node.id)
      })
      this.graph.on('node:removed', ({ node, index, options }) => {
        const idx = this.nodeOptions.indexOf(node.id)
        if (idx !== -1) {
          this.nodeOptions.splice(idx, 1)
        }
      })
      this.graph.on('edge:selected', ({ edge }) => {
        edge.addTools([
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
      this.graph.on('edge:unselected', ({ edge }) => {
        edge.removeTools()
      })
      this.graph.on('edge:click', ({ edge }) => {
        this.graph.cleanSelection()
        edge.addTools('vertices')
        this.graph.select(edge)
      })
    },
    back () {
      this.$router.push('/ecology')
    },
    handleNodeAdd (op) {
      const attributes = []
      this.nodeForm.props.forEach(item => {
        attributes.push('+ ' + item.name)
      })
      if (op === 'add') {
        this.graph.startBatch('addNode')
        const node = this.graph.addNode({
          id: this.nodeForm.id,
          shape: 'class',
          name: [this.nodeForm.id],
          attributes: [...attributes],
          methods: [],
          position: {
            x: 300,
            y: 40
          },
          attrs: {
            'name-rect': {
              fill: this.nodeForm.color
            }
          }
        })
        delete this.nodeForm.color
        node.setData(this.nodeForm)
        this.graph.stopBatch('addNode')
      }
      this.nodeForm = JSON.parse(JSON.stringify(nodeFormSample))
      this.nodeDialogVisible = false
    },
    handleEdgeAdd (op) {
      if (op === 'add') {
        const id = this.edgeForm.source + '-' + this.edgeForm.target + ':' + this.edgeForm.label
        const label = this.edgeForm.label
        const source = this.graph.getNodes().find(node => node.getData().id === this.edgeForm.source)
        const target = this.graph.getNodes().find(node => node.getData().id === this.edgeForm.target)
        const edges = this.graph.getEdges()
        let total = 0
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].getData().source === source.id && edges[i].getData().target === target.id) {
            total++
          }
        }
        if (total >= 5) {
          this.$message.error({
            message: '添加边数过多！'
          })
          return
        }
        this.graph.startBatch('addEdge')
        const edge = this.graph.addEdge({
          id,
          label,
          source,
          target
        })
        if (source === target) {
          const oldX = edge.getSourceNode().prop().position.x
          const oldY = edge.getSourceNode().prop().position.y
          edge.prop('source', { x: oldX + 80 + 10 * total, y: oldY })
          edge.prop('target', { x: oldX + 160, y: oldY + 20 })
          edge.setVertices([{ x: oldX + 80 + 10 * total, y: oldY - 20 * (total + 1) }, { x: oldX + 160 + 20 * (total + 1), y: oldY - 20 * (total + 1) }, { x: oldX + 160 + 20 * (total + 1), y: oldY + 20 }])
        } else {
          edge.setConnector({
            name: 'multi-smooth',
            args: {
              index: indexOfEdge[total]
            }
          })
        }
        this.edgeForm.id = id
        edge.setData(this.edgeForm)
        this.graph.stopBatch('addEdge')
      }
      this.edgeForm = JSON.parse(JSON.stringify(edgeFormSample))
      this.edgeDialogVisible = false
    },
    handleGraphSave () {
      saveSchema(this.$route.query.name, this.graph.toJSON()).then(res => {
        console.log(res.message)
        this.$message.success({
          message: '保存成功'
        })
      })
    },
    handleCellDelete () {
      const cells = this.graph.getSelectedCells()
      cells.forEach(cell => {
        this.graph.removeCell(cell)
      })
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
  width: 500px;
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
</style>
