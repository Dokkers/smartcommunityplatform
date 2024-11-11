<template>
  <div id="mountNode" class="canvas" ref="mountNode"></div>
</template>

<script>
import G6 from '@antv/g6'
G6.registerNode(
  'tree-node',
  {
    drawShape: function drawShape (cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          fill: '#fff',
          stroke: '#666',
          x: 0,
          y: 0,
          width: 1,
          height: 1
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'rect-shape'
      })
      const content = cfg.name.replace(/(.{19})/g, '$1\n')
      const text = group.addShape('text', {
        attrs: {
          text: content,
          x: 0,
          y: 0,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: '#666'
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'text-shape'
      })
      const bbox = text.getBBox()
      const hasChildren = cfg.children && cfg.children.length > 0
      rect.attr({
        x: -bbox.width / 2 - 4,
        y: -bbox.height / 2 - 6,
        width: bbox.width + (hasChildren ? 26 : 12),
        height: bbox.height + 12
      })
      text.attr({
        x: -bbox.width / 2,
        y: 0
      })
      if (hasChildren) {
        group.addShape('marker', {
          attrs: {
            x: bbox.width / 2 + 12,
            y: 0,
            r: 6,
            symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#666',
            lineWidth: 2
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: 'collapse-icon'
        })
      }
      return rect
    },
    update: (cfg, item) => {
      const group = item.getContainer()
      const icon = group.find((e) => e.get('name') === 'collapse-icon')
      icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse)
    }
  },
  'single-node'
)
const data = {
  name: '社区服务生态健康评估指标',
  children: [
    {
      name: '复杂网络特征',
      children: [
        {
          name: '最邻近点指数'
        },
        {
          name: '核密度'
        },
        {
          name: '中心性'
        },
        {
          name: '结构洞'
        },
        {
          name: '聚类系数'
        }
      ]
    },
    {
      name: '生态系统特征',
      children: [
        {
          name: '生态广度'
        },
        {
          name: '生态重叠'
        },
        {
          name: '多样性'
        },
        {
          name: '稳定性'
        }
      ]
    },
    {
      name: '社会经济特征',
      children: [
        {
          name: '服务公平'
        },
        {
          name: '服务质量'
        },
        {
          name: '服务效率'
        },
        {
          name: '资源利用率'
        }
      ]
    }
  ]
}
export default {
  name: 'HealthTree',
  data () {
    return {
      graph: null
    }
  },
  methods: {
    init () {
      const width = document.getElementById('mountNode').scrollWidth || 800
      const height = document.getElementById('mountNode').scrollHeight || 650
      this.graph = new G6.TreeGraph({
        container: 'mountNode',
        width, // Number，必须，图的宽度
        height, // Number，必须，图的高度
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange (item, collapsed) {
                const data = item.get('model')
                this.graph.updateItem(item, {
                  collapsed
                })
                data.collapsed = collapsed
                return true
              }
            },
            'drag-canvas',
            'zoom-canvas'
          ]
        },
        defaultNode: {
          type: 'tree-node',
          anchorPoints: [
            [0, 0.5],
            [1, 0.5]
          ]
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF'
          }
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId (d) {
            return d.id
          },
          getHeight: function getHeight () {
            return 16
          },
          getWidth: function getWidth () {
            return 16
          },
          getVGap: function getVGap () {
            return 20
          },
          getHGap: function getHGap () {
            return 80
          }
        }
      })
      G6.Util.traverseTree(data, function (item) {
        item.id = item.name
      })
      this.graph.data(data)
      this.graph.render()
      this.graph.fitView()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
