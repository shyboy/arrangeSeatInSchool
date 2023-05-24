<template>
  <!-- <vue3-menus v-model:open="contextMenuOpen" :event="eventVal" :menus="menus" hasIcon>
    <template #icon="{item: {activeIndex}}">{{activeIndex}}</template>
    <template #label="{ item: { item } }">插槽：{{ item.label }}</template>
  </vue3-menus> -->
  <div class="div"></div>
  
  <!-- <div class="div" @click.stop @contextmenu="rightClick">事件方式打开菜单</div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, shallowRef, type Ref } from 'vue'
import { inject } from '@vue/runtime-core'
import { Graph, Cell } from '@antv/x6'
import { horizontalAlign, verticalAlign } from '@/utils/align'
import { Vue3Menus, menusEvent } from 'vue3-menus'
import { horizontalDistribute, verticalDistribute } from '@/utils/distribute'

import {
  copyNodes,
  deleteNodes,
  pasteNodes,
  nodes2Bottom,
  nodes2Top,
  moveDownNodes,
  moveUpNodes
} from '@/utils/nodeOperation'
import { switch2Seats } from './utils'
import { ElMessage } from 'element-plus'
import { useOthersStore } from '@/stores/others'

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

const handleReArrangeSeats = () => {
  // 打开重新安排弹窗
  const otherStore = useOthersStore()
  
  otherStore.showReArrangeDialog = true
  console.log(otherStore.showReArrangeDialog);
  
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
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="16" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="22" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '顶对齐',
        click: () => {
          handleAlign('top')
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="8" width="6" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="35" y="8" width="6" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '底对齐',
        click: (): void => {
          handleAlign('bottom')
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><rect x="35" y="22" width="6" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
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
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="10" width="28" height="12" transform="rotate(90 30 10)" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><path d="M40 6V42" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M8 6V42" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      }
    ]
  },
  {
    label: '排列',
    // tip: 'Alt+向左箭头',
    // click: () => {
    //   window.history.back();
    // }
    children: [
      {
        label: '移到顶层',
        click: () => {
          nodes2Top(selectedElements.value)
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41 18H19C18.4477 18 18 18.4477 18 19V41C18 41.5523 18.4477 42 19 42H41C41.5523 42 42 41.5523 42 41V19C42 18.4477 41.5523 18 41 18Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><path d="M9.96906 6H6V10.0336" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M9.99705 30H6V26.012" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M26.0023 6H30V10.0152" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M16.0283 6H20.0083" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M6 16C6 18.6536 6 19.9869 6 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M30 16C30 18.6765 30 19.3456 30 18.0074" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M15.9922 30H17.9996" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>'
      },
      {
        label: '上移一层',
        click: () => {
          moveUpNodes(selectedElements.value)
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="34" width="36" height="8" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><rect x="6" y="20" width="36" height="8" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><path d="M30 12L24 6L18 12V12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M24 28V34" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M24 6V20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '下移一层',
        click: () => {
          moveDownNodes(selectedElements.value)
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="8" transform="matrix(1 0 0 -1 6 14)" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><rect width="36" height="8" transform="matrix(1 0 0 -1 6 28)" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="miter"/><path d="M30 36L24 42L18 36V36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M24 42V28" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M24 14V20" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '移到底层',
        click: () => {
          nodes2Bottom(selectedElements.value)
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 18H41C41.5523 18 42 18.4477 42 19V41C42 41.5523 41.5523 42 41 42H19C18.4477 42 18 41.5523 18 41V30" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M9.96906 6H6V10.0336" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M9.99705 30H6V26.012" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M26 30H29.9971V26.012" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M26.0023 6H30V9.99785" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M16.0283 6H20.0083" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M6 16V20.0148" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M30 16V20.0148" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M15.9922 30H19.9996" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      }
    ]
  },
  {
    label: '座位',
    // tip: 'Alt+向左箭头',
    // click: () => {
    //   window.history.back();
    // }
    children: [
      {
        label: '两者交换',
        click: () => {
          if (!switch2Seats(selectedElements.value)) {
            ElMessage({
              message: '请选择两个座位',
              type: 'warning'
            })
          }
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40 33L44 37L40 41" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M40 7L44 11L40 15" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M44 11H37C29.8203 11 24 16.8203 24 24C24 31.1797 29.8203 37 37 37H44" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M4 37H11C18.1797 37 24 31.1797 24 24C24 16.8203 18.1797 11 11 11H4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>'
      },
      {
        label: '重排座位号',
        click: () => {
          handleReArrangeSeats()
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="38" height="38" rx="2" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M5 18H43" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M5 30H43" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M17 5V43" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M30 5V43" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>'
      },
      {
        label: '不排座',
        click: () => {
          switch2Seats(selectedElements.value)
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M15 15L33 33" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      }
    ]
  },

  // {
  //   label: '编组',
  //   tip: 'Ctrl+G',
  // },
  // {
  //   label: '解组',
  //   tip: 'Ctrl+Shift+G',
  // },

  {
    label: '历史',
    // tip: 'Alt+向左箭头',
    // click: () => {
    //   window.history.back();
    // }
    children: [
      {
        label: '撤销',
        tip: 'Ctrl+Z',
        click: () => {
          props.graph.undo()
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9998 8L6 14L12.9998 21" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      },
      {
        label: '重做',
        tip: 'Ctrl+Shift+Z',
        click: () => {
          props.graph.redo()
        },
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/><path d="M42 8V17H33" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="miter"/></svg>'
      }
    ]
  },
  {
    label: '复制',
    tip: 'Ctrl+C',
    click: () => {
      copyNodes(props.graph, selectedElements.value)
    }
  },
  {
    label: '粘贴',
    tip: 'Ctrl+V',
    click: () => {
      pasteNodes(props.graph)
    }
  },
  {
    label: '删除',
    tip: '可撤销',
    style: {
      color: '#F56C6C'
    },
    click: () => {
      deleteNodes(props.graph, selectedElements.value)
    }
  }
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
