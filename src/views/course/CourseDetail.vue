<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import { useCourse } from "./useCourse";
const { getCateAllArticles, allArticle, deleteArticle } = useCourse()
let router = useRouter()
let route = useRoute()
const videoSrc = ref()

console.log(route.params.id)

getCateAllArticles(route.params.id.toString())

const handleAdd = () => {
  // ? 跳转路由
  // router.push({name: "article_add"})
  router.push({ name: 'article_add', params: { id: route.params.id } })
}
const handleDelete = (id: number) => {
  deleteArticle(id)
}
const playVideo = (img: string) => {
  videoSrc.value = img
}
const closeVideo = () => {
  videoSrc.value = ''
}
// const handleDetial = (id:number) =>{
//     router.push({name: 'course_detail', params: {id: id}})
// }

</script>

<template>
  <div class="wrapper">
    <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <el-button @click="handleAdd" type="primary" plain>添加章节</el-button>
          </div>
        </template>
        <el-table :data="allArticle" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" />
          <!-- <el-table-column prop="title" label="标题" align="center" /> -->
          <el-table-column prop="title" label="章节" align="center" />
          <el-table-column prop="img" label="视频" align="center" v-slot="scope">
            <el-button type="primary" plain @click="playVideo(scope.row.img)">播放</el-button>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center" v-slot="scope">
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div v-if="videoSrc" class="video-mask">
      <div class="video-container">
        <video ref="videoRef" :src="videoSrc" controls></video>
        <div class="video-close" @click="closeVideo">
          <el-icon>
            <IEpClose />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

/* .video-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container {
  position: relative;
} */
/* video {
  position: relative;
  width: 50% !important;
  height: 50% !important; 
  left: 25% ;
  top: 10%;
} */
/* .video-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: gray;
  font-size: 24px;
}

video {
  width: 640px;
  height: 360px;
  outline: none;
} */
.video-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container {
  position: relative;
  width: 50%; /* 半屏宽 */
  height: 50%; /* 半屏高 */
  padding-bottom: 1%;
  background-color: black;
}

.video-container video {
  display: block;
  margin: 0 auto; /* 水平居中 */
  max-width: 100%;
  max-height: 100%;
}
.video-close {
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 15px;
  cursor: pointer;
  color: gray;
  font-size: 24px;
}
/* .video-close {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  color: gray;  
  cursor: pointer;
  font-size: 20px;
} */

.video-close:hover {
  color: #f00; /* 鼠标悬停时字体颜色变为红色 */
}
</style>
