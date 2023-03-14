<script lang="ts" setup>
import { isCollapse } from "./isCollapse";
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
import { useRouter } from "vue-router";
// import axios from '@/http';
let userInfo = ref({ username: "", avater: "", telephone: "", })

const server = inject('server')
let router = useRouter()

const getUserIn = () => {
    // @ts-ignore
    var uInfo = JSON.parse(localStorage.getItem('local_user_info'));

    console.log("userInfo = " + `${uInfo}`)
    if (uInfo) {
        userInfo = uInfo;
    }else{
        // 用户信息为空，跳转登录
        router.push({name: "login"})
    }
}
getUserIn()
// 退出登录
const handleLogout = async () => {

    // 1.弹框询问
    await ElMessageBox.confirm("确认退出登录？", "退出登录", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: 'warning'
    }).catch(() => {
        return new Promise(() => { })
    })
    // 2.执行退出
    // @ts-ignore
    await server.userApi.postUserLogout().catch(() => { })
    ElMessage.success("退出成功")
    // 3.清空token，跳转到登录
    localStorage.removeItem("local_token")
    localStorage.removeItem('local_user_info')
    // @ts-ignore
    router.push({ name: "login" })
}

</script>

<template>
    <el-header>
        <!-- 图标 -->
        <el-icon @click="isCollapse = !isCollapse">
            <IEpExpand v-show="isCollapse" />
            <IEpFold v-show="!isCollapse" />
        </el-icon>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>课程列表</el-breadcrumb-item>
            <el-breadcrumb-item>课程详情</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="32" :src="userInfo.avater" />

                <el-icon class="el-icon--right">
                    <IEpArrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>{{ userInfo.username }}</el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </el-header>
</template>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
    background-color: #dedfe0;
}

.el-header .el-icon {
    /* padding-left: 10px; */
    padding-right: 10px;
}

.el-dropdown {
    margin-left: auto;
}

.el-dropdown .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
