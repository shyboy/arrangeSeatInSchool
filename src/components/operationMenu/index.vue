<template>
  <div class="op_container">
    <el-divider content-position="left">批量创建座位</el-divider>
    <!-- <p :style="`font-size: var(--el-font-size-extra-small);margin-bottom:10px;`"></p> -->
    <el-row class="sizeInput">
      <el-col
        :span="4"
        class="size_input_title"
        :style="`font-size: var(--el-font-size-extra-small);`"
        >行</el-col
      >
      <el-col :span="20" style="display: flex; justify-content: end"
        ><el-input-number size="small" controls-position="right"
      /></el-col>
    </el-row>
    <el-row class="sizeInput">
      <el-col
        :span="4"
        class="size_input_title"
        :style="`font-size: var(--el-font-size-extra-small);`"
        >列</el-col
      >
      <el-col :span="20" style="display: flex; justify-content: end"
        ><el-input-number size="small" controls-position="right"
      /></el-col>
    </el-row>
    <el-row class="sizeInput">
      <el-col
        :span="4"
        class="size_input_title"
        :style="`font-size: var(--el-font-size-extra-small);`"
      >
        <el-tooltip
          effect="dark"
          content="多少列合并成一组，若为0则不会合并。可以和行组共同生效，形成网格的组"
          placement="top-start"
          >列组</el-tooltip
        >
      </el-col>
      <el-col :span="20" style="display: flex; justify-content: end"
        ><el-input-number size="small" controls-position="right"
      /></el-col>
    </el-row>
    <el-row class="sizeInput">
      <el-col
        :span="4"
        class="size_input_title"
        :style="`font-size: var(--el-font-size-extra-small);`"
      >
        <el-tooltip
          effect="dark"
          content="多少行合并成一组，若为0则不会合并。可以和列组共同生效，形成网格的组"
          placement="top-start"
          >行组</el-tooltip
        >
      </el-col>
      <el-col :span="20" style="display: flex; justify-content: end"
        ><el-input-number size="small" controls-position="right"
      /></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><el-button type="primary" class="full_btn" size="small">创建</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style lang="scss" scoped>
.op_container {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  // padding-top: 10px;
  padding-left: calc(var(--el-menu-base-level-padding));
  padding-right: 10px;
  padding-bottom: 10px;
}
.sizeInput {
  margin-bottom: 10px;
}
.size_input_title {
  box-sizing: border-box;
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.full_btn {
  width: 100%;
}
</style>
