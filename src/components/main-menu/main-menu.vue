<script setup lang="ts">
import { useLoginStore } from '@/store/login/login'

const loginStore = useLoginStore()
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>

    <div class="menu">
      <el-menu class="el-menu-vertical-demo" default-active="3" :collapse="isFold">
        <el-sub-menu :index="item.id.toString()" v-for="item in loginStore.userMenus" :key="item.id">
          <template #title>
            <el-icon> <component :is="item.icon.split('el-icon-')[1]" /></el-icon>
            <span> {{ item.name }}</span>
          </template>

          <el-menu-item :index="subItem.id.toString()" v-for="subItem in item.children" :key="subItem.id">
            {{ subItem.name }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #0c2135;
  .logo {
    display: flex;
    align-items: center;
    padding: 12px 10px 8px 10px;
    background-color: #001529;
    color: #fff;
    white-space: nowrap;

    img {
      margin: 0 10px;
      width: 30px;
      height: 30px;
    }
    .title {
      flex: 1;
      font-size: 20px;
    }
  }
  .el-menu-vertical-demo {
    --el-menu-text-color: #b7bdc3;
    --el-menu-active-color: #fff;
    --el-menu-bg-color: #001529;
    --el-menu-hover-bg-color: #001529;
  }

  .el-menu {
    border-right: none;
  }
  .el-menu-item {
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
    background: transparent;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
