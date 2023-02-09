<script setup lang="ts">
import mainNav from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
let isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px  ' : '210px'"><main-nav :is-fold="isFold" /></el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @flod-change="handleFoldChange" />
        </el-header>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
}
.main-container {
  height: 100%;
  .el-aside {
    transition: width 0.3s ease;
  }

  .main-content {
    background: #f0f2f5;
  }
}
</style>
