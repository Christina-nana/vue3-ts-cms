<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToBreadCrumb } from '@/utils/map-menus'
import { useLoginStore } from '@/store/login/login'
const route = useRoute()
const userMenus = useLoginStore().userMenus

const breadCrumb = computed(() => {
  return mapPathToBreadCrumb(userMenus, route.path)
})
</script>

<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadCrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped></style>
