<template>
    <el-form ref="loginForm" :model="loginUser" :rules="rules" label-width="100px" class="loginForm sign-in-form">
        <el-form-item label="账号" prop="telephone">
            <el-input v-model="loginUser.telephone" placeholder="输入手机号..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" placeholder="输入密码..."></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
            <el-button @click="handleLogin(loginForm)" type="primary" class="submit-btn">提交</el-button>
        </el-form-item>
        <!-- 找回密码 -->
        <div class="tiparea">
            <p>忘记密码？<a href="">立即找回</a></p>
        </div>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import request from "@/api/requestconfig";

const server = inject('server')
let axios = inject('axios')

let router = useRouter()
let route = useRoute()
const userInfo = ref({ username: "", avater: "", telephone: "", })

const props = defineProps({
    loginUser: {
        type: Object,
        required: true
    },
    rules: {
        type: Object,
        required: true

    }
})
// ? 获取 DOM 元素
let loginForm = ref()
// ? 触发登陆方法
const handleLogin = (formEl: any): void => {
    formEl.validate((valid: boolean) => {
        if (valid) {
            console.log(props.loginUser)
            /* /api = https://imissu.herokuapp.com/api/ */
            // @ts-ignore
            server.userApi.postUserLogin(props.loginUser).then((res: any) => {

                // ElMessage(msg)
                // ? 路由跳转
                if (res.code === 200) {

                console.log(res.data)
                // ? 登陆成功，存储 token 到 LS 中
                const { token } = res.data
                const msg: string = res.msg
                console.log(msg)

                localStorage.setItem('local_token', token)
                    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    getUserInfo()
                }else{
                    alert(res.msg);
                }

            })
            // @ts-ignore
            // axios.post('/api/v1/user/login', props.loginUser)  // 已使用代理转换 /api 地址
            // .then((res: any) => {
            //   console.log(res.data)
            //   // ? 登陆成功，存储 token 到 LS 中
            //   const {token} = res.data
            //   localStorage.setItem('local_token', token)

            // })
            formEl.resetFields()
        } else {
            console.log('提交的格式有误，请重新提交')
            return false
        }
    })
}
// 获取用户信息
const getUserInfo = () => {
    // @ts-ignore
    server.userApi.getUserInfo().then((res: any) => {
        console.log(res.data)
        // ? 登陆成功，存储 token 到 LS 中
        // userInfo.value = res.data

        // localStorage.setItem('local_user_info', userInfo)
        localStorage.setItem('local_user_info', JSON.stringify(res.data));

        router.push(route.query.redirect as string || '/')

    })

}
const handleForgot = () => {
    // ? 跳转路由
    router.push('/forgotpassword')
}

</script>

<style scoped>
.loginForm {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
    width: 100%;
}

.tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
}

.tiparea p a {
    color: #409eff;
}
</style>