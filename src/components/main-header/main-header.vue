<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from '@/components/main-header/c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'
const isFold = ref(false)

const emit = defineEmits(['flodChange'])

function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('flodChange', isFold.value)
}
</script>

<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="28px" @click="handleMenuIconClick">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div><header-crumb /></div>
      <header-info />
    </div>
  </div>
</template>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  .menu-icon {
    cursor: pointer;
    margin-right: 20px;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
