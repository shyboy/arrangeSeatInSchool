<template>
  <!-- <vue3-menus v-model:open="contextMenuOpen" :event="eventVal" :menus="menus" hasIcon>
    <template #icon="{item: {activeIndex}}">{{activeIndex}}</template>
    <template #label="{ item: { item } }">插槽：{{ item.label }}</template>
  </vue3-menus> -->
  <div class="div"></div>
  <!-- <div class="div" @click.stop @contextmenu="rightClick">事件方式打开菜单</div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, shallowRef } from 'vue'
import { Graph, Cell } from '@antv/x6'
import { horizontalAlign, verticalAlign } from '@/utils/align'
import { Vue3Menus, menusEvent } from 'vue3-menus'
import { horizontalDistribute, verticalDistribute } from '@/utils/distribute'
import { deleteNodes } from '@/utils/nodesCopy'

// const contextMenuOpen = ref(false)
const selectedElements = ref<Array<Cell>>([])
// const contextMenuX = ref(0)
// const contextMenuY = ref(0)
const handleAlign = (option: string) => {
  console.log(`You clicked ${option}`)
  if (option === 'left') {
    horizontalAlign(selectedElements.value, option)
  } else if (option === 'right') {
    horizontalAlign(selectedElements.value, option)
  } else if (option === 'top') {
    verticalAlign(selectedElements.value, option)
  } else if (option === 'bottom') {
    verticalAlign(selectedElements.value, option)
  }
  // contextMenuOpen.value = false
}

// function rightClick(event) {

//     }



const props = defineProps<{
  graph: Graph
}>()

onMounted(() => {
  console.log(props.graph)

  props.graph.on('cell:contextmenu', showMenu)
  props.graph.on('blank:contextmenu', showMenu)

  // Listen to the blank:click event to close the context menu
  props.graph.on('blank:click', hideMenu)
})

const showMenu = ({ cell, e }): void => {
  // console.log('show',cell, e);

  e.preventDefault()

  const cells = props.graph.getSelectedCells()
  if (!cells.length) {
    return
  }
  // contextMenuOpen.value = false;
  console.log(e)
  // contextMenuOpen.value = true
  selectedElements.value = cells
  // contextMenuX.value = e.clientX
  // contextMenuY.value = e.clientY

  menusEvent(e, menus.value, {})
}
const hideMenu = () => {
  // contextMenuOpen.value = false
}

const menus = shallowRef([
  {
    label: '对齐',
    // tip: 'Alt+向左箭头',
    // click: () => {
    //   window.history.back();
    // }
    children: [
      {
        label: '左对齐',
        click: () => {
          handleAlign('left')
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="8" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '右对齐',
        click: () => {
          handleAlign('right')
        },
        icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="22" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '顶对齐',
        click: () => {
          handleAlign('top')
        },
        icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="8" width="6" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="35" y="8" width="6" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '底对齐',
        click: ():void => {
          handleAlign('bottom')
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="35" y="22" width="6" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>',
        
      }
    ]
  },
  {
    label: '分布',
    // tip: 'Alt+向左箭头',
    // click: () => {
    //   window.history.back();
    // }
    children: [
      {
        label: '垂直分布',
        click: () => {
          verticalDistribute(selectedElements.value)
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="38" y="30" width="28" height="12" transform="rotate(180 38 30)" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><path d="M42 40H6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M42 8L6 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '水平分布',
        click: () => {
           horizontalDistribute(selectedElements.value)
        },
        icon:'<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="28" height="12" transform="rotate(90 30 10)" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><path d="M40 6V42" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M8 6V42" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
    ]
  },
  {
    label: '复制',
    tip: 'Ctrl+C',
  },
  {
    label: '粘贴',
    tip: 'Ctrl+V',
  },
  {
    label: '删除',
    tip: '暂无法撤销',
    style:{
      color:'#F56C6C'
    },
    click: () => {
      deleteNodes(props.graph, selectedElements.value)
    }
  },
])
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border-right: 0;
  border-radius: 6px;
  /* border: 1px solid #ddd; */
  box-shadow: 3px 3px 10px 6px rgba(121, 187, 255, 0.1);
  /* padding: 10px; */
  z-index: 1000;
  color: #303133;
}

.context-menu-item {
  /* margin-bottom: 10px; */
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  cursor: pointer;
}

.context-menu-item:last-child {
  margin-bottom: 0;
}
</style>
