<template>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" stretch>
        <el-tab-pane label="简介" name="first">
            <div class="tab-content1">
                <ul>
                    <li>
                        <p class="li-title">{{ props.cateItem.content }}</p>
                    </li>
                    <li v-for="item in getImageArr()" :key="item">
                        <img :src="item" alt="Image" style="width: 100%; height: auto;">
                    </li>
                </ul>
            </div>
        </el-tab-pane>
        <el-tab-pane label="视频" name="second">
            <div class="tab-content">
                <ul>
                    <li v-for="(item, index) in allArticle" :key="item" @click="handleVideo(item, index)"
                        :class="{ active: item.isActive }">
                        <div class="video-title">
                            <div class="video-box">
                                <p class="shipin">视频</p>
                            </div>
                            <p class="title">{{ item.title }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
  
<script lang="ts" setup>
import { ArticleItem } from '@/api/userapi';
import item from 'element-plus/es/components/space/src/item';
import { ref } from 'vue';

const emit = defineEmits(["handleEmit"]);
let activeIndex = '-1'
const props = defineProps({
    cateItem: {
        type: Object,
        required: true
    },
    allArticle: {
        type: Object,
        required: true

    }
})
const activeName = ref('first');
function getImageArr() {
    return props.cateItem.image_urls.split(',');
}
const handleClick = (tab: any) => {
    // console.log(tab);
};
const handleVideo = (item: ArticleItem, index: string) => {
    emit("handleEmit", item.img);
    // @ts-ignore
    props.allArticle.forEach((article, i) => {
        article.isActive = i === index;
    });
};
</script>
  
<style>
ul li {
    margin: 15px 0;
    /* 设置 li 元素之间的上下边距为 10px，左右边距为 0 */
}

.el-tabs {
    /* height: 400px; */
    height: calc(100% - calc(100vw / 1.5)) - 52px;
}

.demo-tabs>.el-tabs__header {
    background-color: white;
    margin-bottom: 12px;
}

.tab-content {
    /* height: 480px; */
    height: 55vh;

    overflow-y: auto;
}

.video-title {
    display: flex;
    align-items: center;
}

.video-title .title {
    color: #666;
    font-size: 14px;
}

.video-title .video-box {
    display: inline-block;
    align-items: center;
    border: 1px solid #666;
    width: 40px;
    height: 20px;
    margin-right: 10px;
    border-radius: 5px;
    text-align: center;
    color: purple;
}

.li-title {
    color: #000;
    font-size: 14px;
}

.shipin {
    color: #666;
    font-size: 14px;
    margin: 0;
}

.active .title {
    color: purple;
}

.active .shipin {
    color: purple;
}
.active .video-box {
    border: 1px solid purple;
}


.demo-tabs>.el-tabs__content {
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 12px;
    padding-right: 12px;
    height: max-content;
    background-color: white;
}

.el-tabs__active-bar {
    background-color: blueviolet !important;
}

/* 非选中状态 */
.demo-tabs .el-tabs__item {
    /* background-color: #f0f0f0; */
    color: #999;
}

/* 选中状态 */
.demo-tabs .el-tabs__item.is-active {
    /* background-color: #409EFF; */
    color: blueviolet;
}
</style>
  

