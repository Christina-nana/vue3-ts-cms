<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
import type { IAcount } from '@/types'
import { useLoginStore } from '@/store/login/login'
import { localCache } from '@/utils/cache'

const CACHE_PASSWORD = 'password'
const CACHE_NAME = 'name'

// 1.定义account数据
const account = reactive<IAcount>({
  name: localCache.getCache(CACHE_NAME),
  password: localCache.getCache(CACHE_PASSWORD)
})

// 2.定义校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '必须是6~20个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '必须是3位以上数字',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
// const formRef = ref<InstanceType<typeof ElForm>>()
const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  if (!formRef.value) return
  formRef.value?.validate((valid) => {
    if (valid) {
      // 验证有效
      let { name, password } = account
      // 发送网络请求
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否是记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      // 验证无效
      ElMessage({
        type: 'warning',
        message: '请您输入正确的格式后再操作~~'
      })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<template>
  <div>
    <el-form label-width="60px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" size="large"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" size="large" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
