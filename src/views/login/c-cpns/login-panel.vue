<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

// 是否记住密码功能
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd'))
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

const accountRef = ref<InstanceType<typeof PanelAccount>>()

const activeName = ref('account')

const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <div>
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <span class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">登录账号</span>
            </span>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </span>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="control-password">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" size="large" @click="handleLoginBtnClick"> 立即登录 </el-button>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 330px;
  .title {
    margin-bottom: 15px;
    text-align: center;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    margin-left: 5px;
  }
  .control-password {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
