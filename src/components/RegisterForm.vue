<template>
  <el-form ref="registerForm" :model="registerUser" :rules="registerRules" label-width="100px"
    class="registerForm sign-up-form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerUser.username" placeholder="请填写用户名..."></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="telephone">
      <el-input v-model="registerUser.telephone" placeholder="输入手机号..."></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerUser.password" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input v-model="registerUser.password2" type="password" placeholder="Enter Password..."></el-input>
    </el-form-item>

    <el-form-item label="选择身份">
      <el-select v-model="registerUser.role" placeholder="请选择身份">
        <el-option label="管理员" value="0"></el-option>
        <el-option label="用户" value="1"></el-option>
        <el-option label="游客" value="2"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button @click="handleRegister(registerForm)" type="primary" class="submit-btn">注册</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'


const server = inject('server')
const router = useRouter()
const props = defineProps({
  registerUser: {
    type: Object,
    required: true
  },
  registerRules: {
    type: Object,
    required: true
  }
})

// ? 获取 registerForm 的 DOM 元素
let registerForm = ref()
const handleRegister = (formEl: any): void => {
  formEl.validate((valid: boolean) => {
    if (valid) {
      // @ts-ignore
      server.userApi.postUserRegister(props.registerUser).then((res: any) => {
          // ? 注册成功
          alert('注册成功')
          // ? 路由跳转
          router.push('/')
        })
      formEl.resetFields()
    } else {
      console.log('提交的格式有误，请重新提交')
      return false
    }
  })
}
</script>
<style scoped></style>