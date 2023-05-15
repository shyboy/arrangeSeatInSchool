<script setup lang="ts">
import { Cell, CellView, Graph } from '@antv/x6'
import { ref, onMounted } from 'vue'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Export } from '@antv/x6-plugin-export'
import { Selection } from '@antv/x6-plugin-selection'
import { Transform } from '@antv/x6-plugin-transform'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'

const data = {
  // // 节点
  // nodes: [
  //   {
  //     id: 'node1',
  //     shape: 'rect',
  //     x: 40,
  //     y: 40,
  //     width: 100,
  //     height: 40,
  //     label: 'hello',
  //     attrs: {
  //       body: {
  //         stroke: '#8f8f8f',
  //         strokeWidth: 1,
  //         fill: '#fff',
  //         rx: 6,
  //         ry: 6
  //       }
  //     }
  //   },
  //   {
  //     id: 'node2',
  //     shape: 'rect',
  //     x: 160,
  //     y: 180,
  //     width: 100,
  //     height: 40,
  //     label: 'world',
  //     attrs: {
  //       body: {
  //         stroke: '#8f8f8f',
  //         strokeWidth: 1,
  //         fill: '#fff',
  //         rx: 6,
  //         ry: 6
  //       }
  //     }
  //   }
  // ],
  // // 边
  // edges: [
  //   {
  //     shape: 'edge',
  //     source: 'node1',
  //     target: 'node2',
  //     label: 'x6',
  //     attrs: {
  //       line: {
  //         stroke: '#8f8f8f',
  //         strokeWidth: 1
  //       }
  //     }
  //   }
  // ]
}
const graphContainer = ref()
// const createGraph = (newModel:any) => {
// graph = new Graph({
//   container: graphContainer.value,
//   width: 1500,
//   height: 800,
//   background: { color: '#08ffff' },  // 创建画布时初始化背景相关配置对象
//   grid: { size: 10, visible: true, type: 'mesh' }, //创建画布时，通过配置对象来设置背景网格
// })
const graph = ref()

// 设置座位号方法
const setSeatKey = (thisCell: CellView) => {
  console.log(thisCell.value)
  if (!thisCell.value) {
    return
  }

  thisCell.cell.attr('seatKey', {
    text: thisCell.value
  })
}
Graph.registerNode(
  'seat-node',
  {
    width: 100,
    height: 40,
    markup: [
      {
        tagName: 'rect',
        selector: 'body'
      },
      // {
      //   tagName: 'image',
      //   selector: 'avatar'
      // },
      {
        tagName: 'text',
        selector: 'seatKey'
      },
      {
        tagName: 'text',
        selector: 'name'
      }
    ],
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: '#fff',
        stroke: '#5F95FF',
        strokeWidth: 1,
        rx: 8,
        ry: 8,
        pointerEvents: 'visiblePainted'
      },
      // avatar: {
      //   width: 48,
      //   height: 48,
      //   refX: 8,
      //   refY: 6
      // },
      seatKey: {
        refX: 0.1,
        refY: -10,
        fill: '#5F95FF',
        // fontFamily: 'Courier New',
        fontSize: 10,
        textAnchor: 'start'
      },
      name: {
        refX: 0.5,
        refY: 13,
        fill: '#5F95FF',
        // fontFamily: 'Courier New',
        fontSize: 16,
        fontWeight: '800',
        textAnchor: 'middle'
      }
    },
    tools: [
      {
        name: 'node-editor',
        args: {
          x: 0.2,
          y: -20,
          attrs: {
            backgroundColor: '#EFF4FF'
          },
          setText: setSeatKey
        }
      }
    ]
  },
  true
)

function addSeat(x: number, y: number, seatKey: string, name: string) {
  return graph.value.addNode({
    x,
    y,
    shape: 'seat-node',
    attrs: {
      seatKey: {
        text: seatKey,
        wordSpacing: '-5px',
        letterSpacing: 0
      },
      name: {
        text: name,
        fontSize: 16,
        // fontFamily: 'Arial',
        letterSpacing: 0
      }
    }
  })
}

onMounted(() => {
  graph.value = new Graph({
    container: graphContainer.value,
    // autoResize: true,//可以通过设置 width 和 height 固定画布大小，如果不设置，就会以画布容器大小初始化画布。手动调用resize方法比较好
    panning: {
      enabled: true,
      modifiers: 'alt' // modifiers 参数，设置修饰键后需要按下修饰键并点击鼠标才能触发画布拖拽。
    },
    mousewheel: true, // 缩放与平移
    width: 800,
    height: 600,
    // snapline: true,
    background: {
      color: '#F2F7FA'
    },
    grid: {
      visible: true,
      type: 'doubleMesh',
      args: [
        {
          color: '#eee', // 主网格线颜色
          thickness: 1 // 主网格线宽度
        },
        {
          color: '#ddd', // 次网格线颜色
          thickness: 1, // 次网格线宽度
          factor: 4 // 主次网格线间隔
        }
      ]
    }
  })
  graph.value.fromJSON(data)
  graph.value.use(
    new Keyboard({
      enabled: true
    })
  )
  graph.value.centerContent()
  graph.value.use(
    new Snapline({
      enabled: true
    })
  )
  graph.value.use(new Export())
  graph.value.use(
    new Selection({
      enabled: true,
      showNodeSelectionBox: true,
      showEdgeSelectionBox: true,
      rubberband: true
    })
  )
  graph.value.use(
    new History({
      enabled: true
    })
  ) // 允许撤销重做
  graph.value.use(
    new Transform({
      resizing: {
        enabled: true,
        minWidth: 1,
        maxWidth: 200,
        minHeight: 1,
        maxHeight: 150,
        orthogonal: false,
        restrict: false,
        preserveAspectRatio: false
      },
      rotating: {
        enabled: true,
        grid() {
          return 1
        }
      }
    })
  )
  graph.value.use(
    new Clipboard({
      enabled: true
    })
  )

  graph.value.bindKey('ctrl+c', () => {
    const cells = graph.value.getSelectedCells()
    if (cells.length) {
      graph.value.copy(cells)
    }
    return false
  })

  graph.value.bindKey('ctrl+v', () => {
    if (!graph.value.isClipboardEmpty()) {
      const cells = graph.value.paste({ offset: 32 })
      graph.value.cleanSelection()
      graph.value.select(cells)
    }
    return false
  })
  addSeat(0, 0, 'A1', '向书晗')
})
const zoomOut = () => {
  graph.value.zoom(-0.1)
}
const zoomIn = () => {
  graph.value.zoom(0.1)
}
const download = () => {
  //   graph.value.toSVG((dataUri: string) => {
  //   // 下载
  //   DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
  // })
  graph.value.exportSVG('chart.svg', {
    viewBox: {
      x: 0,
      y: 0,
      width: 800,
      height: 600
    }
  })
}
// todo graph.toJSON 来导出整个画布的数据，graph.fromJSON({
//   nodes: [],
//   edges: [],
// });
// todo clone克隆节点/边。
// todo 我们在实际使用时通常会将某些业务数据存在节点/边的 data 上。当 options.overwrite 为 true 时，替换旧数据
// todo config(...)方法对自定义节点/边非常友好，方便我们为我们的节点/边设置一些预设选项。
// todo 用node.position(...)，translate(...)来对齐节点

// 实现 ctrl cv复制粘贴
const handleAddBlankSeat = () => {
  addSeat(0, 0, 'A1', '向书晗')
}
</script>

<template>
  <div class="container" ref="graphContainer"></div>
  <div class="btn_area">
    <el-button type="primary" @click="download">下载</el-button>
    <el-button type="primary" @click="handleAddBlankSeat">添加座位</el-button>
  </div>
</template>
