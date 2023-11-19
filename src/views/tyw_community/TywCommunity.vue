<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useCommunity } from "./useCommunity"
const { getAllCommunity, allCommunitys, CommunityApprove, CommunityReject, deleteCommunitys } = useCommunity()
let router = useRouter()
const dialogVisible = ref(false)
const selectedImage = ref('')

getAllCommunity()

const handleAdd = () => {
    // ? 跳转路由
    router.push({ name: "tyw_community_create" })
}
const handleDelete = (id: number) => {
    deleteCommunitys(id)
}
const handleReject = (id: number) => {
    CommunityReject(id)
}
const handleApprove = (id: number) => {
    console.log("handleApprove ID:", id);

    CommunityApprove(id)
}

const showImage = (imageUrl: string) => {
    console.log('显示图片：', imageUrl);

    // selectedImage.value = imageUrl;
    // dialogVisible.value = true;
    const newWindow = window.open();
    newWindow?.document.write(`<html><body style="margin: 0; display: flex; align-items: center; justify-content: center;"><img src="${imageUrl}" style="max-width: 100%; max-height: 100%;"></body></html>`);

};

const closeImageDialog111 = () => {
    console.log('关闭图片弹窗');

    dialogVisible.value = false;
};

const handleImagePreview = (url: string) => {
    const instance = getCurrentInstance();

    // 使用 ref 创建响应式数据
    const dialogVisible = ref(true);

    // 使用 ref 创建响应式数据
    const selectedImage = ref(url);

    // 使用 ref 创建响应式数据
    const closeImageDialog = () => {
        dialogVisible.value = false;
    };

    // 弹出图片预览对话框
    instance?.appContext.config.globalProperties.$alert(`<img src="${url}" style="max-width: 100%; max-height: 100%;">`, '图片预览', {
        dangerouslyUseHTMLString: true,
        customClass: 'image-preview-alert',
        callback: closeImageDialog,
    });
};

</script>

<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <el-button @click="handleAdd" type="primary" plain>添加社区</el-button>
            </div>
        </template>
        <el-table :data="allCommunitys" border style="width: 100%">
            <el-table-column prop="name" label="小区" align="center" />
            <el-table-column prop="detail_name" label="小区全称" align="center" />
            <el-table-column prop="address" label="小区地址" align="center" />

            <el-table-column prop="state" label="操作" align="center" v-slot="scope">
                <template v-if="scope.row.state == 0">
                    <el-button type="danger" @click="handleDelete(scope.row.ID)">删除</el-button>
                    <!-- <el-button type="primary" @click="handleApprove(scope.row.ID)">修改</el-button> -->
                </template>
                <!-- 添加更多状态的判断... -->
            </el-table-column>
        </el-table>

    </el-card>
    <!-- 放大图片的弹窗 -->
    <el-dialog :visible.sync="dialogVisible" width="60%" center @close="closeImageDialog111">
        <el-image :src="selectedImage" fit="contain"></el-image>
    </el-dialog>
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
}
</style>
