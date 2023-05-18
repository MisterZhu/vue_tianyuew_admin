
<script lang="ts" setup>
const showPlay = ref(false);
const props = defineProps({
  cateItem: {
    type: Object,
    required: true
  },
  videoSrc: {
    type: String,
    required: true
  },
})
watch(() => props.videoSrc, (newVal) => {
  showPlay.value = newVal !== '';
});
function getImageUrl() {
  return props.cateItem.image_urls.split(',')[0];
}

//props.cateItem.image_urls.split(',')
</script>

<template>
  <div  v-show="!showPlay" class="header">
    <img class="header-img" :src="getImageUrl()" alt="Header Image">
  </div>
  <div v-show="showPlay" class="video-container">
    <video ref="videoRef" :src="props.videoSrc" controls></video>
  </div>
</template>
  
<style>
.header {
  width: 100%;
  height: 0;
  padding-bottom: 66.67%;
  /* 2:3 aspect ratio */
  position: relative;
}
.video-container {
  width: 100%;
  height: 0;
  padding-bottom: 66.67%;
  position: relative;
}
/* .video-container {
    width: 375px;
    height: 250px;
} */
/* .video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; 
} */
/* 16:9 aspect ratio */
.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.header-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
  

