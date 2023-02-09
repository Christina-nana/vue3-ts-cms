<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useLoginStore } from '@/store/login/login'
import router from '@/router'
const loginStore = useLoginStore()
function editLogin() {
  localCache.removeCache(LOGIN_TOKEN)
  // localCache.removeCache('userInfo')
  // localCache.removeCache('userMenus')
  router.push('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon size="20px" class="icon-style"><Bell /></el-icon>
      </span>
      <span>
        <el-icon size="20px" class="icon-style"><ChatDotRound /></el-icon>
      </span>
      <span class="message">
        <span class="dot" />
        <el-icon size="20px" class="icon-style"><Postcard /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-avatar :size="30" src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg" />
      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="name">{{ loginStore.userInfo.name }}</div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="editLogin">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><WarningFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}
.icon-style {
  margin: 0 8px;
}
.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.info {
  display: flex;
  justify-content: center;
  align-items: center;

  .name {
    margin-left: 10px;
    cursor: pointer;
  }
}
.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
