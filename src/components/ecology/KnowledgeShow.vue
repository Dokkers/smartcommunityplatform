<template>
<!--  <div class="container">-->
<!--    <div class="aside">-->
<!--&lt;!&ndash;      <div class="function" @click="index = 1">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="el-icon-s-operation" style="font-size: 30px"></div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div>过滤</div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--      <div class="function" @click="index = 2">-->
<!--        <div class="el-icon-search" style="font-size: 30px"></div>-->
<!--        <div>统计</div>-->
<!--      </div>-->
<!--      <div class="function" @click="index = 3">-->
<!--        <div class="el-icon-data-line" style="font-size: 30px"></div>-->
<!--        <div>分析</div>-->
<!--      </div>-->
<!--      <el-button class="back" icon="el-icon-back" plain @click="$router.push('/ecology')"></el-button>-->
<!--    </div>-->
<!--    <div>-->
<!--      <div class="header">-->
<!--        <div style="font-size: 24px;font-weight: 800;">图展示</div>-->
<!--      </div>-->
<!--      <div class="main">-->
<!--        <div id="mountNode" class="canvas" ref="mountNode"></div>-->
<!--        <el-card v-show="index == 1" style="position: absolute;top: 5vh;left: 5vw;width: 300px;height: 95%">-->
<!--          <div slot="header" style="font-size: 15px;font-weight: 600">-->
<!--            <span>过滤</span>-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <el-card v-show="index == 2" style="position: absolute;top: 5vh;left: 5vw;width: 300px;height: 95%">-->
<!--          <div slot="header" style="font-size: 15px;font-weight: 600">-->
<!--            <span>图统计</span>-->
<!--          </div>-->
<!--          <div style="font-size: 15px;font-weight: 600">-->
<!--            <span>生态图统计</span>-->
<!--          </div>-->
<!--          <el-statistic-->
<!--            group-separator=","-->
<!--            :precision="2"-->
<!--            value="10005"-->
<!--          ></el-statistic>-->
<!--          <div style="font-size: 15px;font-weight: 600">-->
<!--            <span>当前图统计</span>-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <el-card v-show="index == 3" style="position: absolute;top: 5vh;left: 5vw;width: 300px;height: 95%">-->
<!--          <div slot="header" style="font-size: 15px;font-weight: 600">-->
<!--            <span>图分析</span>-->
<!--          </div>-->
<!--          <div style="font-size: 15px;font-weight: 600">-->
<!--            <span>布局方案</span>-->
<!--          </div>-->
<!--          <div style="margin-top: 10px">-->
<!--            <el-select v-model="layout" placeholder="请选择" size="medium" style="width: 180px">-->
<!--              <el-option-->
<!--                v-for="item in layoutOptions"-->
<!--                :key="item"-->
<!--                :label="item"-->
<!--                :value="item">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--            <el-button type="primary" size="medium" style="float: right" @click=handleLayout>确定</el-button>-->
<!--          </div>-->
<!--          <div style="font-size: 15px;font-weight: 600;margin-top: 10px">-->
<!--            <span>图算法</span>-->
<!--          </div>-->
<!--          <div style="margin-top: 10px">-->
<!--            <el-select v-model="algorithm" placeholder="请选择" size="medium" style="width: 180px">-->
<!--              <el-option-->
<!--                v-for="item in algorithmOptions"-->
<!--                :key="item"-->
<!--                :label="item"-->
<!--                :value="item">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--            <el-button type="primary" size="medium" style="float: right" @click="handleAlgorithm">确定</el-button>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div id="mountNode" class="canvas" ref="mountNode"></div>
</template>

<script>
import G6, { Algorithm } from '@antv/g6'
import insertCss from 'insert-css'
import { getFigure, graphQuery } from '@/apis/ecology/figure'
insertCss(`
  .g6-component-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`)
const colors = [
  '#BDD2FD',
  '#BDEFDB',
  '#C2C8D5',
  '#FBE5A2',
  '#F6C3B7',
  '#B6E3F5',
  '#D3C6EA',
  '#FFD8B8',
  '#AAD8D8',
  '#FFD6E7'
]
const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e) => {
    const outDiv = document.createElement('div')
    outDiv.style.width = 'fit-content'
    outDiv.style.height = 'fit-content'
    const model = e.item.getModel()
    if (e.item.getType() === 'node') {
      outDiv.innerHTML = `Type：${model.TYPE}<br/>Name：${model.NAME}`
    } else {
      const source = e.item.getSource()
      const target = e.item.getTarget()
      outDiv.innerHTML = `来源：${source.getModel().NAME}<br/>去向：${target.getModel().NAME}`
    }
    return outDiv
  }
})
const animateCfg = { duration: 200, easing: 'easeCubic' }
const toolbar = new G6.ToolBar({
  position: { x: 350, y: 10 },
  getContent: () => `
  <ul class='g6-component-toolbar'>
    <li  code='zoomOut'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M658.432 428.736a33.216 33.216 0 0 1-33.152 33.152H525.824v99.456a33.216 33.216 0 0 1-66.304 0V461.888H360.064a33.152 33.152 0 0 1 0-66.304H459.52V296.128a33.152 33.152 0 0 1 66.304 0V395.52H625.28c18.24 0 33.152 14.848 33.152 33.152z m299.776 521.792a43.328 43.328 0 0 1-60.864-6.912l-189.248-220.992a362.368 362.368 0 0 1-215.36 70.848 364.8 364.8 0 1 1 364.8-364.736 363.072 363.072 0 0 1-86.912 235.968l192.384 224.64a43.392 43.392 0 0 1-4.8 61.184z m-465.536-223.36a298.816 298.816 0 0 0 298.432-298.432 298.816 298.816 0 0 0-298.432-298.432A298.816 298.816 0 0 0 194.24 428.8a298.816 298.816 0 0 0 298.432 298.432z"></path>
      </svg>
    </li>
    <li code='zoomIn'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M639.936 416a32 32 0 0 1-32 32h-256a32 32 0 0 1 0-64h256a32 32 0 0 1 32 32z m289.28 503.552a41.792 41.792 0 0 1-58.752-6.656l-182.656-213.248A349.76 349.76 0 0 1 480 768 352 352 0 1 1 832 416a350.4 350.4 0 0 1-83.84 227.712l185.664 216.768a41.856 41.856 0 0 1-4.608 59.072zM479.936 704c158.784 0 288-129.216 288-288S638.72 128 479.936 128a288.32 288.32 0 0 0-288 288c0 158.784 129.216 288 288 288z" p-id="3853"></path>
      </svg>
    </li>
    <li code='realZoom'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
        <path d="M384 320v384H320V320h64z m256 0v384H576V320h64zM512 576v64H448V576h64z m0-192v64H448V384h64z m355.968 576H92.032A28.16 28.16 0 0 1 64 931.968V28.032C64 12.608 76.608 0 95.168 0h610.368L896 192v739.968a28.16 28.16 0 0 1-28.032 28.032zM704 64v128h128l-128-128z m128 192h-190.464V64H128v832h704V256z"></path>
      </svg>
    </li>
    <li code='autoZoom'>
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
        <path d="M684.288 305.28l0.128-0.64-0.128-0.64V99.712c0-19.84 15.552-35.904 34.496-35.712a35.072 35.072 0 0 1 34.56 35.776v171.008h170.944c19.648 0 35.84 15.488 35.712 34.432a35.072 35.072 0 0 1-35.84 34.496h-204.16l-0.64-0.128a32.768 32.768 0 0 1-20.864-7.552c-1.344-1.024-2.816-1.664-3.968-2.816-0.384-0.32-0.512-0.768-0.832-1.088a33.472 33.472 0 0 1-9.408-22.848zM305.28 64a35.072 35.072 0 0 0-34.56 35.776v171.008H99.776A35.072 35.072 0 0 0 64 305.216c0 18.944 15.872 34.496 35.84 34.496h204.16l0.64-0.128a32.896 32.896 0 0 0 20.864-7.552c1.344-1.024 2.816-1.664 3.904-2.816 0.384-0.32 0.512-0.768 0.768-1.088a33.024 33.024 0 0 0 9.536-22.848l-0.128-0.64 0.128-0.704V99.712A35.008 35.008 0 0 0 305.216 64z m618.944 620.288h-204.16l-0.64 0.128-0.512-0.128c-7.808 0-14.72 3.2-20.48 7.68-1.28 1.024-2.752 1.664-3.84 2.752-0.384 0.32-0.512 0.768-0.832 1.088a33.664 33.664 0 0 0-9.408 22.912l0.128 0.64-0.128 0.704v204.288c0 19.712 15.552 35.904 34.496 35.712a35.072 35.072 0 0 0 34.56-35.776V753.28h170.944c19.648 0 35.84-15.488 35.712-34.432a35.072 35.072 0 0 0-35.84-34.496z m-593.92 11.52c-0.256-0.32-0.384-0.768-0.768-1.088-1.088-1.088-2.56-1.728-3.84-2.688a33.088 33.088 0 0 0-20.48-7.68l-0.512 0.064-0.64-0.128H99.84a35.072 35.072 0 0 0-35.84 34.496 35.072 35.072 0 0 0 35.712 34.432H270.72v171.008c0 19.84 15.552 35.84 34.56 35.776a35.008 35.008 0 0 0 34.432-35.712V720l-0.128-0.64 0.128-0.704a33.344 33.344 0 0 0-9.472-22.848zM512 374.144a137.92 137.92 0 1 0 0.128 275.84A137.92 137.92 0 0 0 512 374.08z"></path>
      </svg>
    </li>
  </ul>`,
  handleClick: (code, graph) => {
    switch (code) {
      case 'zoomOut':
        graph.zoom(1.2, undefined, true, animateCfg)
        break
      case 'zoomIn':
        graph.zoom(0.8, undefined, true, animateCfg)
        break
      case 'realZoom':
        graph.zoomTo(1, undefined, true, animateCfg)
        break
      case 'autoZoom':
        graph.fitView(20, undefined, true, animateCfg)
        break
    }
  }
})
const typeConfigs = {
  服务: {
    type: 'circle',
    style: {
      fill: '#BDEFDB'
    }
  },
  资源: {
    type: 'circle',
    style: {
      fill: '#F6C3B7'
    }
  },
  组织: {
    type: 'circle',
    style: {
      fill: '#5B8FF9'
    }
  }
}
const legendData = {
  nodes: [
    {
      id: '0',
      label: '服务',
      size: 20,
      ...typeConfigs['服务']
    },
    {
      id: '1',
      label: '资源',
      size: 20,
      ...typeConfigs['资源']
    },
    {
      id: '2',
      label: '组织',
      size: 20,
      ...typeConfigs['组织']
    }
  ]
}
const legend = new G6.Legend({
  data: legendData,
  align: 'center',
  layout: 'horizontal', // vertical
  position: 'bottom-left',
  vertiSep: 12,
  horiSep: 24,
  offsetX: 20,
  offsetY: -50,
  padding: [16, 16, -16, 16],
  containerStyle: {
    fill: '#ccc',
    lineWidth: 2
  },
  filter: {
    enable: true,
    multiple: true,
    trigger: 'click',
    graphActiveState: 'activeByLegend',
    graphInactiveState: 'inactiveByLegend',
    filterFunctions: {
      0: (d) => {
        if (d.rType === '服务') return true
        return false
      },
      1: (d) => {
        if (d.rType === '资源') return true
        return false
      },
      2: (d) => {
        if (d.rType === '组织') return true
        return false
      }
    }
  }
})
export default {
  name: 'KnowledgeShow',
  data () {
    return {
      graph: null,
      result: '',
      index: 0,
      infoVisible: true,
      textarea: '',
      checked: false,
      tmp: '',
      tmpOptions: [
        {
          name: '标识id',
          value: 412
        },
        {
          name: '类型',
          value: 'Organization'
        },
        {
          name: '名称',
          value: '上海消防中心'
        },
        {
          name: '信用代码',
          value: '12558465'
        }
      ],
      itemType: '',
      itemAttributes: [],
      layout: '',
      layoutOptions: ['Force', 'Grid', 'Random', 'Darge', 'Fruchterman'],
      algorithm: '',
      algorithmOptions: ['labelPropagation', 'louvain', 'pageRank'],
      resultOfAl: ''
    }
  },
  props: {
    selectNode: String
  },
  methods: {
    init () {
      const width = document.getElementById('mountNode').scrollWidth || 800
      const height = document.getElementById('mountNode').scrollHeight || 600
      this.graph = new G6.Graph({
        container: 'mountNode',
        width, // Number，必须，图的宽度
        height, // Number，必须，图的高度
        // 配置插件
        plugins: [tooltip, toolbar, legend], //, legend
        enabledStack: false,
        fitCenter: true,
        // TODO 全局元素配置
        nodeStateStyles: {
          activeByLegend: {
            lineWidth: 5,
            strokeOpacity: 0.5
          },
          inactiveByLegend: {
            opacity: 0.5
          },
          selected: {
            stroke: '#f00',
            lineWidth: 3
          }
        },
        defaultNode: {
          size: 15
        },
        defaultEdge: {
          style: {
            stroke: '#000',
            lineWidth: 1
          }
        },
        layout: {
          type: 'gForce'
        },
        modes: {
          default: ['drag-canvas', 'scroll-canvas', 'drag-node', 'click-select']
        }
      })
      // this.graph.on('node:mouseenter', (e) => {
      //   this.graph.setItemState(e.item, 'active', true)
      // })
      // this.graph.on('node:mouseleave', (e) => {
      //   this.graph.setItemState(e.item, 'active', false)
      // })
      this.graph.on('nodeselectchange', (e) => {
        console.log(e.selectedItems, e.select)
      })
      getFigure().then(res => {
        this.graph.node(function (node) {
          return {
            label: node.NAME.substring(0, 5) + '...',
            ...typeConfigs[node.rType]
          }
        })
        this.graph.data(res.data)
        this.graph.render()// 渲染图
        const graphData = this.graph.save()
        // console.log(graphData.nodes)
        this.$emit('graphData', graphData.nodes.length, graphData.edges.length, graphData.nodes)
      })
    }
  },
  watch: {
    selectNode (newValue, oldValue) {
      console.log(oldValue + ' ' + newValue)
      const oldNode = this.graph.findById(oldValue)
      this.graph.clearItemStates(oldNode)
      const newNode = this.graph.findById(newValue)
      this.graph.setItemState(newNode, 'selected', true)
      this.graph.focusItem(newNode, true)
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
  /*position: relative;*/
  text-align: center;
  background-color: white;
}
.header{
  width: 95vw;
  height: 5vh;
  text-align: center;
  background-color: #e3e3e3;
}
.main{
  width: 95vw;
  height: 95vh;
}
.canvas{
  width: 95vw;
  height: 95vh;
  /*position: relative;*/
}
.function{
  margin-top: 25px;
  padding-top: 10px;
  cursor: pointer;
}
.function:hover{
  color: blue;
}
.back{
  /*margin-top: 56vh;*/
  margin-top: 65vh;
  cursor: pointer;
}
.textarea{
  margin-top: 10px;
}
</style>
