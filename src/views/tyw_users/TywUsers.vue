<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useXcxUsers } from "./useXcxUsers"
const {getAllTywUser, allTywUsers, deleteTywUser} = useXcxUsers()
let router = useRouter()

getAllTywUser()

const handleAdd = () => {
    // ? 跳转路由
    router.push({name: "course_create"})
}
const handleDelete = (id:number) =>{
    deleteTywUser(id)
}
const handleDetial = (id:number) =>{
    router.push({name: 'course_detail', params: {id: id}})
}
</script>

<template>
    <el-card class="box-card">
        
        <el-table :data="allTywUsers" border style="width: 100%">
            <el-table-column prop="user_id" label="用户ID" align="center" />
            <el-table-column prop="telephone" label="手机号" align="center" />
            <el-table-column prop="username" label="名称" align="center" />
            <el-table-column prop="address" label="操作" align="center" v-slot="scope">
                <el-button type="primary" @click="handleDetial(scope.row.id)">编辑</el-button>
                <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: auto;
}</style>
