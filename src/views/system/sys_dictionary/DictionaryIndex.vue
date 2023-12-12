<script lang="ts" setup>
import { useRouter } from "vue-router";
let router = useRouter()

const item = {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
};
const tableData = Array(20).fill(item);


const handleDelete = (id: number) => {
    //deleteAuthApply(id)
}
const handleReject = (id: number) => {
    //authApplyReject(id)
}
const handleAdd = () => {
    // ? 跳转路由
    router.push({name: "sys_dictionary_create"})
}
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button @click="handleAdd" type="primary" plain>添加版本</el-button>
            </div>
        </template>
        <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="200">
            </el-table-column>
            <el-table-column prop="name" label="版本" width="200">
            </el-table-column>
            <el-table-column prop="address" label="状态"  width="300">
            </el-table-column>
            <el-table-column prop="state" label="操作" align="center" v-slot="scope" width="300">
                <el-button type="primary" @click="handleReject(1)">修改</el-button>
                <el-button type="danger" @click="handleDelete(1)">删除</el-button>
                <!-- 添加更多状态的判断... -->
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped>

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
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
}
</style>
