<script setup lang="ts"></script>

<template>
  <div>
    <el-form label-width="60px" ref="formRef">
      <el-form-item label="帐号" prop="name">
        <el-input size="large"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <div class="verify-code">
          <el-input type="password" size="large" show-password></el-input>
          <el-button class="code-btn" type="primary" size="large">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.verify-code {
  display: flex;
}
.code-btn {
  margin-left: 8px;
}
</style>
