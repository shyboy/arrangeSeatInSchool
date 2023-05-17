<el-menu
    class="context-menu"
    v-if="contextMenuOpen"
    :style="{ top: `${contextMenuY}px`, left: `${contextMenuX}px` }"
    :default-active="activeIndex"
    mode="vertical"
  >
    <el-sub-menu index="1" :disabled="!selectedElements.length">
      <template #title>对齐操作</template>
      <el-menu-item index="1-1">顶对齐</el-menu-item>
      <el-menu-item index="1-2">左对齐</el-menu-item>
      <el-menu-item index="1-3">右对齐</el-menu-item>
      <el-menu-item index="1-4">底对齐</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2" :disabled="!selectedElements.length">
      <template #title>分布操作</template>
      <el-menu-item index="2-1">水平分布</el-menu-item>
      <el-menu-item index="2-2">垂直分布</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3" :disabled="!selectedElements.length">
      <template #title>排列操作</template>
      <el-menu-item index="3-1">上移一层</el-menu-item>
      <el-menu-item index="3-2">下移一层</el-menu-item>
      <el-menu-item index="3-3">移到最后</el-menu-item>
      <el-menu-item index="3-4">移到顶部</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4" :disabled="!selectedElements.length">复制</el-menu-item>
    <el-menu-item index="5">粘贴</el-menu-item>
    <el-menu-item index="6" :disabled="!selectedElements.length"><el-text type="danger">删除</el-text></el-menu-item>
  </el-menu>
