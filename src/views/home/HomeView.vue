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
import { Dnd } from '@antv/x6-plugin-dnd'
import { MagicStick } from '@element-plus/icons-vue'
import RightClickMenu from '../../components/rightClickMenu/index.vue'
import OperationMenu from '../../components/operationMenu/index.vue'
import { useStudentStore } from '@/stores/students'
import { arrangeSeat, exportList } from '@/components/operationMenu/arrangeSeat/utils'
import { ElMessage } from 'element-plus'
// import VueMarkdownEditor from '@kangc/v-md-editor';
import markdownTxt from '@/assets/guide.md?raw'

let dnd
const dndContainerRef = ref()
const RightClickMenuComponent = ref()
const studentStore = useStudentStore()
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
      // {
      //   name: 'button-remove',
      //   args: {
      //     x: '100%',
      //     y: 0,
      //     offset: { x: -10, y: 10 }
      //   }
      // }
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
// todo 设置画布的宽高
const setGraphWidthHeight = () => {
  let width = window.screen.width - 200
  let height = window.screen.height - 60
  graph.value.resize({
    height,
    width
  })
}
// 复制选择的节点
const copyNode = () => {
  const cells = graph.value.getSelectedCells()
  if (cells.length) {
    graph.value.copy(cells)
  }
  return false
}
// 粘贴
const pastNode = () => {
  if (!graph.value.isClipboardEmpty()) {
    const cells = graph.value.paste({ offset: 32 })
    graph.value.cleanSelection()
    graph.value.select(cells)
  }
  return false
}
onMounted(() => {
  graph.value = new Graph({
    container: graphContainer.value,
    autoResize: true, //可以通过设置 width 和 height 固定画布大小，如果不设置，就会以画布容器大小初始化画布。手动调用resize方法比较好
    panning: {
      enabled: true,
      modifiers: 'alt' // modifiers 参数，设置修饰键后需要按下修饰键并点击鼠标才能触发画布拖拽。
    },
    mousewheel: true, // 缩放与平移
    // width: 800,
    // height: 600,
    // snapline: true,
    // background: {
    //   color: '#F2F7FA'
    // },
    grid: {
      visible: true
      // type: 'doubleMesh',
      // args: [
      //   {
      //     color: '#eee', // 主网格线颜色
      //     thickness: 1 // 主网格线宽度
      //   },
      //   {
      //     color: '#ddd', // 次网格线颜色
      //     thickness: 1, // 次网格线宽度
      //     factor: 4 // 主次网格线间隔
      //   }
      // ]
    }
  })
  // graph.value.fromJSON(data)
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
        // maxWidth: 200,
        minHeight: 1,
        // maxHeight: 150,
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

  graph.value.bindKey('ctrl+c', copyNode)

  graph.value.bindKey('ctrl+v', pastNode)

  graph.value.bindKey('ctrl+z', () => {
    graph.value.undo()
  })
  graph.value.bindKey('ctrl+shift+z', () => {
    graph.value.redo()
  })

  graph.value.bindKey('backspace', () => {
    const cells = graph.value.getSelectedCells()
    if (cells.length) {
      graph.value.removeCells(cells)
    }
  })

  // addSeat(0, 0, 'A1', '向书晗')
  setGraphWidthHeight()

  dnd = new Dnd({
    target: graph.value,
    scaled: false,
    dndContainer: dndContainerRef.value
  })
  RightClickMenuComponent.value = RightClickMenu
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
const handleFitGraph = () => {
  graph.value.zoomToFit({ maxScale: 1 })
}
const startDrag = (event: any) => {
  const target = event.target
  const type = target.attributes['data-type'].value

  const seatKey = 'A1'
  const name = 'test'
  let node
  if (type === 'seat') {
    node = graph.value.createNode({
      // x,
      // y,
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
  } else {
    node = graph.value.createNode({
      width: 100,
      height: 40,
      shape: 'rect',
      label: '讲台/门',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff'
        }
      },
      tools: [
        {
          name: 'node-editor'
        }
      ]
    })
  }

  dnd.start(node, event as any)
}
const guideDialogVisible = ref(false)
const handleShowGuide = () => {
  // 展示说明
  guideDialogVisible.value = true
}
const handleDownloadModelExcel = () => {
  exportList()
}
const handleArrangeSeat = () => {
  if (!studentStore.canArrange) {
    ElMessage({
      message: '请先在“操作”中上传名单excel',
      type: 'warning'
    })
    return
  }
  arrangeSeat(graph.value)
}
</script>

<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px">
      <el-scrollbar>
        <el-button
          class="arrange_seat_btn_area"
          @click="handleArrangeSeat"
          type="primary"
          :icon="MagicStick"
          >编排座位</el-button
        >

        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Files /></el-icon>组件库
            </template>
            <div class="dnd_wrap" ref="dndContainerRef">
              <div class="dnd_item">
                <div data-type="seat" className="dnd_seat" @mousedown="startDrag">
                  <p data-type="seat">座位号</p>
                  <p data-type="seat">姓名</p>
                </div>
              </div>
              <div className="dnd_item">
                <div class="dnd-rect" @mousedown="startDrag" data-type="rect">讲台/门</div>
              </div>
            </div>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><CopyDocument /></el-icon>模板
            </template>
            暂无内容
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>操作
            </template>
            <OperationMenu :graph="graph"></OperationMenu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header height="60px" style="text-align: right; font-size: 12px">
        <div class="toolbar_area">
          <el-dropdown popper-class="toolbar">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--left" style="margin-right: 8px; margin-top: 1px"
                ><Service
              /></el-icon>
              <span>帮助</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleDownloadModelExcel"
                  ><el-text class="menu-item">
                    <el-icon><Download /></el-icon>
                    下载excel模板
                  </el-text></el-dropdown-item
                >
                <el-dropdown-item @click="handleShowGuide"
                  ><el-text class="menu-item">
                    <el-icon><Tickets /></el-icon>
                    使用说明
                  </el-text></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown popper-class="toolbar">
            <span class="el-dropdown-link">
              <el-icon class="el-icon--left" style="margin-right: 8px; margin-top: 1px"
                ><Operation
              /></el-icon>
              <span>菜单</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="download"
                  ><el-text>
                    <el-icon><Download /></el-icon>
                    保存座位
                  </el-text></el-dropdown-item
                >
                <el-dropdown-item @click="download"><el-text>
                  <el-icon><Upload /></el-icon>
                    导入座位
                  </el-text></el-dropdown-item>
                <el-dropdown-item @click="download"><el-text>
                  <el-icon><Picture /></el-icon>
                    保存图片
                  </el-text></el-dropdown-item>
                <el-dropdown-item @click="handleAddBlankSeat"><el-text>
                  <el-icon><Plus /></el-icon>
                    添加座位
                  </el-text></el-dropdown-item>
                <el-dropdown-item @click="handleFitGraph"><el-text>
                  <el-icon><Location /></el-icon>
                    画布居中
                  </el-text></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <div class="container" ref="graphContainer"></div>
      </el-main>
    </el-container>
  </el-container>
  <component :is="RightClickMenuComponent" v-if="RightClickMenuComponent" :graph="graph" />
  <!-- <RightClickMenu :graph="graph.value"/> -->
  <el-dialog v-model="guideDialogVisible" title="用户指南">
    <v-md-preview :text="markdownTxt"></v-md-preview>
  </el-dialog>
</template>

<style lang="scss" scoped>
.layout-container-demo .el-header {
  position: relative;
  // background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding: 0;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  // border-right: 10px var(--el-text-color-primary);
  // box-shadow: 10px 0 20px 0px var(--el-text-color-primary);
  // background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.layout-container-demo {
  height: 100vh;
  width: 100vw;
}
.container {
  border-top: 1px solid var(--el-color-info-light-5);
  border-left: 1px solid var(--el-color-info-light-5);
}
.arrange_seat_btn_area {
  display: flex;
  box-sizing: border-box;
  height: var(--el-header-height);
  width: 100%;
  align-items: center;
  border-radius: 0px;
}
.dnd_wrap {
  box-sizing: border-box;
  min-height: 25vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--el-color-info-light-9);
}
.dnd_item {
  display: flex;
  position: relative;
  background-color: white;
  margin-bottom: 16px;
}
.dnd_seat {
  display: flex;
  color: #5f95ff;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #5f95ff;
  position: relative;
  cursor: move;
}
.dnd_seat :first-child {
  font-size: 10px;
  position: absolute;
  top: -20px;
  left: 0px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  color: #303133;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  // background-color:var(--el-color-primary);
}
.dnd-rect {
  width: 100px;
  height: 40px;
  // margin: 16px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #8f8f8f;
  // border-radius: 6px;
  cursor: move;
}
:global(.toolbar .el-dropdown-menu__item .el-text:hover) {
  color: var(--el-dropdown-menuItem-hover-color);
}
</style>
