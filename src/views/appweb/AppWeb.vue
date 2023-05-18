<script lang="ts" setup>
import AppHeader from "./AppHeader.vue";
import AppMain from "./AppMain.vue";
import type { CategoryItem, ArticleItem } from "@/api/userapi";
import { useRoute } from "vue-router";

const allArticle = ref([] as ArticleItem[])
const cateItem = ref<CategoryItem>();
let route = useRoute()
// console.log(route.params.id)
// const { id, code, state } = route.params;

const server = inject('server')
console.log(route.params)
// 获取id参数
const id = route.query.id as string
// 获取code参数
const code = route.query.code as string
// 获取state参数
const state = route.query.state as string

const videoSrc = ref()

// 打印参数
console.log('id:', id)
console.log('code:', code)
console.log('state:', state)
const parentEdit = (val: string) => {
    console.log("parentEdit: " + val); //true
    videoSrc.value = val
};
//获取分类下的所有文章
const getCateAllArticles = async () => {
    // @ts-ignore
    const res = await server.userApi.getCateArticles({ "id": id })
    if (res.code === 200) {
        allArticle.value = res.data
    } else {
        ElMessage.error('获取视频列表失败')
        throw new Error(res.msg || '网络异常')
    }
}
//获取分类详情
const getCateDetail = async () => {
    // @ts-ignore
    const res = await server.userApi.getCategoryDetail({ "id": id })
    if (res.code === 200) {
        cateItem.value = res.data
    } else {
        ElMessage.error(res.msg)
        throw new Error(res.msg || '网络异常')
    }
}
getCateDetail()
getCateAllArticles()
const handleButtonClick = () => {
    // 执行相应操作
    
    alert('微信支付')

}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <AppHeader v-if="cateItem" :cateItem="cateItem" :videoSrc="videoSrc" />
            </el-header>
            <el-main>
                <AppMain v-if="cateItem" :cateItem="cateItem" :allArticle="allArticle" @handleEmit="parentEdit" />
            </el-main>
        </el-container>
        <!-- 添加悬浮按钮 -->
        <button class="float-button" @click="handleButtonClick">
            订阅观看￥49.90
        </button>
    </div>
</template>

<style lang="scss" scoped>
/* 设置悬浮按钮的样式 */
.float-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    left: 20px;
    height: 45px;
    border: none;
    border-radius: 22px;
    background-color: blueviolet;
    color: #fff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;

}

.header-and-main {
    flex-direction: column;
    height: 100vh;
}

.el-header {
    background-color: #f4f4f5;
    padding-right: 0px;
    padding-left: 0px;
    height: calc(100vw / 1.5);
    /* 屏幕宽度的三分之二 */

}

.el-main {
    background-color: #f4f4f5;
    padding-right: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    padding-top: 0px;

    height: calc(100% - calc(100vw / 1.5));
    /* 剩余高度 */

}

.common-layout {
    overflow: hidden;
}
</style>