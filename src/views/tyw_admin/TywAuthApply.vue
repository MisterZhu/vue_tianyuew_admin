<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthApply } from "./useAuthApply"
const { getAllAuthApply, allAuthApplys, authApplyApprove, authApplyReject, deleteAuthApply } = useAuthApply()
let router = useRouter()
const dialogVisible = ref(false)
const selectedImage = ref('')

getAllAuthApply()

const handleAdd = () => {
    // ? 跳转路由
    router.push({ name: "course_create" })
}
const handleDelete = (id: number) => {
    deleteAuthApply(id)
}
const handleReject = (id: number) => {
    authApplyReject(id)
}
const handleApprove = (id: number) => {
    console.log("handleApprove ID:", id);

    authApplyApprove(id)
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
        <!-- <template #header>
            <div class="card-header">
                <el-button @click="handleAdd" type="primary" plain>添加主播</el-button>
            </div>
        </template> -->
        <el-table :data="allAuthApplys" border style="width: 100%">
            <el-table-column prop="user_id" label="user_id" align="center" />
            <el-table-column prop="telephone" label="手机号" align="center" />
            <el-table-column prop="community" label="小区" align="center" />
            <el-table-column prop="room" label="房号" align="center" />
            <el-table-column label="证明" width="100">
                <template #default="scope">
                    <el-image :src="scope.row.img_url" fit="cover" style="width: 50px; height: 50px; cursor: pointer;"
                        @click="showImage(scope.row.img_url)"></el-image>
                </template>
            </el-table-column>

            <el-table-column prop="state" label="操作" align="center" v-slot="scope">
                <template v-if="scope.row.state == 1">
                    <el-button type="danger" @click="handleReject(scope.row.ID)">拒绝</el-button>
                    <el-button type="primary" @click="handleApprove(scope.row.ID)">通过</el-button>
                </template>
                <template v-else-if="scope.row.state == 2">
                    <el-button type="danger" @click="handleDelete(scope.row.ID)">删除</el-button>
                </template>
                <template v-else-if="scope.row.state == 3">
                    <el-button type="info" :disabled="true">已拒绝</el-button>
                    <el-button type="primary" @click="handleApprove(scope.row.ID)">通过</el-button>

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
