<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
import { accountLoginRequest } from '@/service/modules/login/login'
// 1.定义account数据
const account = reactive({
  name: '',
  password: ''
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
function loginAction() {
  if (!formRef.value) return
  formRef.value?.validate((valid) => {
    if (valid) {
      // 验证有效
      let { name, password } = account
      // 发送网络请求
      accountLoginRequest({ name, password }).then((res) => {
        console.log(res)
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
        <el-input v-model="account.password" type="password" show-password size="large"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
