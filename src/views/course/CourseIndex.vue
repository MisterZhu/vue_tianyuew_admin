<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useCourse } from "./useCourse";
const {getAllCate, allCates, deleteCate} = useCourse()
let router = useRouter()

getAllCate()

const handleAdd = () => {
    // ? 跳转路由
    router.push({name: "course_create"})
}
const handleDelete = (id:number) =>{
    deleteCate(id)
}
const handleDetial = (id:number) =>{
    router.push({name: 'course_detail', params: {id: id}})
}
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button @click="handleAdd" type="primary" plain>添加主播</el-button>
            </div>
        </template>
        <el-table :data="allCates" border style="width: 100%">
            <el-table-column type="index" label="序号" align="center" />
            <el-table-column prop="name" label="标题" align="center" />
            <el-table-column prop="content" label="介绍" align="center" />
            <el-table-column prop="address" label="操作" align="center" v-slot="scope">
                <el-button type="primary" @click="handleDetial(scope.row.id)">播放列表</el-button>
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
