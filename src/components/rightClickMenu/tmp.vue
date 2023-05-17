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