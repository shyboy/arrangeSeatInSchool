<template>
  <div
    class="context-menu"
    v-if="contextMenuOpen"
    :style="{ top: `${contextMenuY}px`, left: `${contextMenuX}px` }"
  >
    <div class="context-menu-item" @click="handleMenuItemClick('left')">
      <el-text>
        <!-- <el-icon>
        <ElementPlus />
      </el-icon> -->
        左对齐
      </el-text>
    </div>
    <div class="context-menu-item" @click="handleMenuItemClick('right')">
      <el-text>
        <!-- <el-icon>
        <ElementPlus />
      </el-icon> -->
        右对齐
      </el-text>
    </div>
    <div class="context-menu-item" @click="handleMenuItemClick('top')">
      <el-text>
        <!-- <el-icon>
        <ElementPlus />
      </el-icon> -->
        顶对齐
      </el-text>
    </div>
    <div class="context-menu-item" @click="handleMenuItemClick('bottom')">
      <el-text>
        <!-- <el-icon>
        <ElementPlus />
      </el-icon> -->
        底对齐
      </el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Graph, Cell } from '@antv/x6'
import { horizontalAlign, verticalAlign } from '@/utils/align'

const contextMenuOpen = ref(false)
const selectedElements = ref<Array<Cell> | null>(null)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const handleMenuItemClick = (option: string) => {
  console.log(`You clicked ${option}`)
  if (option === "left") {
    horizontalAlign(selectedElements.value, option)
  }else if (option === "right"){
    horizontalAlign(selectedElements.value, option)
  }else if (option === "bottom") {
    verticalAlign(selectedElements.value,option)
  }else if (option === "top") {
    verticalAlign(selectedElements.value,option)
  }
  contextMenuOpen.value = false
}

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
  console.log(cells)
  contextMenuOpen.value = true
  selectedElements.value = cells
  contextMenuX.value = e.clientX
  contextMenuY.value = e.clientY
}
const hideMenu = () => {
  contextMenuOpen.value = false
}
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
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
