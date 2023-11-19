<script lang="ts" setup>
import { Action, ElMessage, ElMessageBox } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
const server = inject('server')
let router = useRouter()
let route = useRoute()

console.log(route.params.id)

const form = reactive({
    title: '',
    img: '',
});

const QiniuData = {    //这里是直接绑定data的值
    key: "", //图片名字处理
    token: "", //七牛云token
}
let inputForm = ref()
const videoSrc = ref()
const showLoading = ref(false);
const uploadRef = ref(null)

// const loading = ref();
const percentage = ref(10)
let fileList: File[] = [];

const getUpToken = async () => {
    // @ts-ignore
    const res = await server.userApi.getQinNiuUpToken()
    if (res.code === 200) {
        const token = res.data
        console.log(token)
        QiniuData.token = token
        // localStorage.setItem('qiniu_uptoken', token)
    } else {
        ElMessage.error('获取七牛云uptoken失败')
        throw new Error('获取七牛云uptoken失败')
    }
    console.log(res)
}
getUpToken()

// 上传前调用方法
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // loading = ElLoading.service({ fullscreen: true })
    // loading.value = ElLoading.service({
    //     lock: true,
    //     text: ``,
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)',
    // });
    showLoading.value = true
    const isMp4 = rawFile.type === 'video/mp4';
    const isLt10M = rawFile.size / 1024 / 1024 < 100;
    if (!isMp4) {
        ElMessage.error('上传视频只能是 MP4 格式!');
        return false;
    }
    if (!isLt10M) {
        ElMessage.error('上传视频大小不能超过 100MB!');
        return false;
    }

    videoSrc.value = URL.createObjectURL(rawFile);

    let suffix = rawFile.name;
    let key = `videos/upload_video_${new Date().getTime()}_${rawFile.name}`
    // let key = new Date () + Math.floor(Math.random()*100) + encodeURI(`${suffix}`)

    QiniuData.key = key;
}
// 上传成功触发的方法
const uploadSuccess: UploadProps['onSuccess'] = (uploadFile, uploadFiles) => {
    // loading.close()
    // loading.value.close();
    showLoading.value = false

    // loading.value = null;
    ElMessage.success('上传成功！');
    console.log('上传成功触发的方法uploadFile', uploadFile)
    console.log('上传成功触发的方法uploadFiles', uploadFiles)

    // 拼接图片地址
    const img = process.env.VUE_APP_QINIU_URL + uploadFile.key

    console.log(img)

    form.img = img
}
const uploadError: UploadProps['onSuccess'] = (uploadFile, uploadFiles) => {
    // loading.close()
    // loading.value.close();
    showLoading.value = false

    // loading.value = null;
    ElMessage.error('上传失败！');
    console.log('上传失败触发的方法uploadFile', uploadFile)
    console.log('上传失败触发的方法uploadFiles', uploadFiles)

}
const uploadProgress: UploadProps['onProgress'] = (event, uploadFile, uploadFiles) => {
    // loading.close()

    const percent = Math.round((event.loaded / event.total) * 100);
    console.log('上传 event.loaded', event.loaded)
    console.log('上传 event.total', event.total)

    console.log('上传进度', percent)
    percentage.value = percent

}
// 删除成功触发的方法
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('删除成功触发的方法uploadFile', uploadFile)
}
const deleVideo = async (formEl: any) => {
    deleteQiNiuFile(QiniuData.key)
    fileList = []
    // uploadRef.value.handleRemove
}
// 提交
const submitForm = async (formEl: any) => {

    if (!form.title) {
        // alert('请输入章节')
        // return
        await ElMessageBox.alert('请输入章节', '提示', {
            // if you want to disable its autofocus
            autofocus: false,
            confirmButtonText: '确定',
            callback: (action: Action) => {
                return
            },
        })
    }
    if (!form.img) {
        // alert('请先上传视频')
        // return
        await ElMessageBox.alert('请先上传视频', '提示', {
            // if you want to disable its autofocus
            autofocus: false,
            confirmButtonText: '确定',
            callback: (action: Action) => {
                return
            },
        })
    }
    addArticle()
}
const deleteQiNiuFile = async (key: string) => {
    QiniuData.key = key
    console.log(QiniuData)
    console.log('删除上传传参', QiniuData)

    // @ts-ignore
    const res = await server.userApi.postDeleteQinNiuFile(QiniuData)
    if (res.code === 200) {
        ElMessage.success('删除成功')
        videoSrc.value = ''

    } else {
        // ElMessage.error('删除视频失败')
        throw new Error('删除视频失败')
    }
    console.log(res)
}
//提交新增文章
const addArticle = async () => {
    const cid = route.params.id
    const categoryId = Array.isArray(cid) ? cid[0] : cid;
    const formData = {
        cid: categoryId,
        title: form.title,
        img: form.img,
    }
    // @ts-ignore
    const res = await server.userApi.postAddArticle(formData)
    console.log('上传的form表单 = ', form)

    if (res.code === 200) {
        ElMessage.success('添加成功')
        // router.push('/course')
        router.push({name: 'course_detail', params: {id: route.params.id}})

    } else {
        // ElMessage.error('操作失败')
        throw new Error('操作失败')
    }
    console.log(res)
}
</script>

<template>
    <el-form :model="form" ref="inputForm">
        <el-form-item label="章节">
            <el-input v-model="form.title" placeholder="请输入章节"></el-input>
        </el-form-item>
        <el-form-item label="视频">
        </el-form-item>
        <div v-show="!videoSrc" class="video-upload">
            <el-upload ref="uploadRef" class="upload-demo" drag action="https://upload.qiniup.com" :data="QiniuData"
                :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError"
                :on-progress="uploadProgress" :on-remove="handleRemove" :file-list="fileList">
                <el-icon class="el-icon--upload"><IEpupload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽到此处上传 <em>或点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        上传视频只能是 MP4 格式! 视频大小不能超过 100MB!
                    </div>
                </template>
            </el-upload>
        </div>
        <div v-show="showLoading" class="demo-progress">
            <el-progress type="dashboard" :percentage="percentage">
                <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                </template>
            </el-progress>
        </div>
        <div v-show="videoSrc" class="video-container">
            <video ref="videoRef" :src="videoSrc" controls></video>
        </div>
        <div v-show="videoSrc" class="delete-container">
            <el-button size="small" type="danger" @click="deleVideo">删除视频</el-button>
        </div>
        <el-form-item>
            <div class="container">
                <el-button style="width: 200px;" type="primary" @click="submitForm(inputForm)" size="large">提交</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>
  
<style scoped>
.delete-container {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    /* 使元素水平居中 */
}

.container {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    /* 使元素水平居中 */
    padding: 20px;

}

.video-upload {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    width: 100%;
    height: 250px;
    background-color: #f5f5f5;
}

.upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.video-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

video {
    width: 640px;
    height: 360px;
    outline: none;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}

.percentage-value {
    color: white;
    font-size: 24px;
    font-weight: bold;
}


.demo-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}
</style>
  

   <!-- <template>
    <el-upload :before-upload="beforeUpload" :file-list="fileList">
      <template #default>
        <el-button>选取视频</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip">只能上传mp4格式的视频，且不超过100MB</div>
      </template>
    </el-upload>
    <video ref="video" width="480" height="360" controls></video>
  </template>
  
  <script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  
  let fileList: File[] = [];
  let videoSrc = '';
  
  const beforeUpload = async (file: File) => {
    const isMp4 = file.type === 'video/mp4';
    const isLt10M = file.size / 1024 / 1024 < 100;
    if (!isMp4) {
      ElMessage.error('上传视频只能是 MP4 格式!');
      return false;
    }
    if (!isLt10M) {
      ElMessage.error('上传视频大小不能超过 100MB!');
      return false;
    }
  
    videoSrc = URL.createObjectURL(file);
    fileList = [file];
    return false; // 返回 false 阻止自动上传
  };
  </script> -->
  
  