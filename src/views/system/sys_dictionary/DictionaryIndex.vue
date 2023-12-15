<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useConfig } from "./useConfig";
import { ConfigItem } from "@/api/userapi";
let router = useRouter()
const { getAllConfig, allConfigs, ConfigApprove, deleteConfigs } = useConfig()

const item = {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
};
// const tableData = Array(20).fill(item);

getAllConfig();

const handleDelete = (id: number) => {
    deleteConfigs(id)
}
const handleReject = (model: ConfigItem) => {
    let state = '';
    if ( model.state == "true"){
        state = "false";
    }else{
        state = "true";
    }
    ConfigApprove(model.ID, state)
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
        <el-table :data="allConfigs">
            <el-table-column prop="CreatedAt" label="日期" width="200">
            </el-table-column>
            <el-table-column prop="name" label="版本" width="200">
            </el-table-column>
            <el-table-column prop="state" label="状态"  width="300">
            </el-table-column>
            <el-table-column label="操作" align="center" v-slot="scope" width="300">
                <el-button type="primary" @click="handleReject(scope.row)">修改</el-button>
                <el-button type="danger" @click="handleDelete(scope.row.ID)">删除</el-button>
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
