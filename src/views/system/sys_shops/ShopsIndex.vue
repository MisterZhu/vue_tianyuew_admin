<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useShop } from "./useShop";
import { TywUsergoryItem } from "@/api/userapi";
let router = useRouter()
const { getAllShop, allShops, ShopApprove, deleteShops } = useShop()

// const tableData = Array(20).fill(item);

getAllShop();

const handleDelete = (id: number) => {
    deleteShops(id)
}
const handleReject = (model: TywUsergoryItem) => {
    let state = 'true';

    ShopApprove(model.id, state)
}
const handleAdd = () => {
    // ? 跳转路由
    router.push({ name: "sys_shops_create" })
}
const formatDate = (dateString: string) => {
    const parts = dateString.split(".");
    const processedPart = parts[0];
    // 把“T”替换成空格
    return processedPart.replace("T", " ");
};
const formatType = (type: number) => {
    switch (type) {
        case 1:
            return '家政';
        case 2:
            return '装修';
        case 3:
            return '废品回收';
        default:
            return '自装指南';
    }
};
</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button @click="handleAdd" type="primary" plain>添加商家</el-button>
            </div>
        </template>
        <el-table :data="allShops">

            <el-table-column prop="title" label="商家名称" width="250">
            </el-table-column>
            <el-table-column prop="annual_rent" label="商家介绍" width="250">
            </el-table-column>
            <el-table-column prop="posts_type" label="服务类型" width="150" v-slot="scope">
                {{ formatType(scope.row.posts_type) }}
            </el-table-column>
            <el-table-column prop="CreatedAt" label="日期" width="200" v-slot="scope">
                <!-- 使用 formatDate 方法格式化日期 -->
                {{ formatDate(scope.row.CreatedAt) }}
            </el-table-column>
            <el-table-column label="操作" align="center" v-slot="scope" width="300">
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
