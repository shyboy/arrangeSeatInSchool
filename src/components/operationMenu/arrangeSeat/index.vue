<template>
  <el-divider content-position="left">安排座位</el-divider>
  <el-upload
    style="width: 100%; margin-bottom: 10px"
    :file-list="fileList"
    :auto-upload="false"
    :on-change="handleFileUpload"
    :before-upload="() => false"
    :limit="1"
    :on-remove="removeFile"
    :multiple="false"
    ><el-tooltip effect="dark" content="只支持xlsx类型的excel文件" placement="top-start"
      ><el-button style="width: 100%" slot="trigger" size="small" text type="primary"
        >导入名单</el-button
      ></el-tooltip
    >
  </el-upload>
  <el-button
    v-if="studentStore.canArrange"
    style="width: 100%"
    size="small"
    type="success"
    slot="trigger"
    @click="submitUpload"
    >编排座位</el-button
  >
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElUpload } from 'element-plus'
import { useStudentStore } from '@/stores/students'
import type { Graph, Node } from '@antv/x6'
import {arrangeSeat, readXlsx} from './utils'

export default defineComponent({
  name: 'ExcelReader',
  components: {
    [ElUpload.name]: ElUpload
  },
  props: {
    graph: null
  },
  setup(props) {
    const studentStore = useStudentStore()
    const canRead = ref(false)
    const fileList = ref([]) // 存储用户选择的文件列表

    const handleFileUpload = (file: File) => {
      fileList.value = [file]
      canRead.value = true

      readXlsx(file.raw)
    }

    
    const submitUpload = () => {
      arrangeSeat(props.graph)
    }

    
    // const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay))
    

    const removeFile = () => {
        canRead.value = false
        studentStore.studentsExcel = []
    }
    return {
      fileList,
      handleFileUpload,
      canRead,
      submitUpload,
      props,
      removeFile,
      studentStore
    }
  }
})
</script>
<style lang="scss" scoped>
:deep(.el-upload) {
  width: 100%;
}
</style>
