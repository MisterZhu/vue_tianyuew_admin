<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Action, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus'

const server = inject('server')
let router = useRouter()

const form = reactive({
  name: '',
  detail_name: '',
  address: '',
  imageUrls: [] as any[],
});
const QiniuData = {    //这里是直接绑定data的值
  key: "", //图片名字处理
  token: "", //七牛云token
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
let inputForm = ref()
// 上传前调用方法
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  let suffix = rawFile.name;
  let key = `images/upload_pic_${new Date().getTime()}_${rawFile.name}`
  // let key = new Date () + Math.floor(Math.random()*100) + encodeURI(`${suffix}`)
  QiniuData.key = key;
}

// 删除成功触发的方法
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('删除成功触发的方法uploadFile', uploadFile)
  console.log('删除成功触发的方法uploadFiles', uploadFiles)

  // @ts-ignore
  const key = uploadFile.response.key as string
  const img = process.env.VUE_APP_QINIU_URL + key
  const index = form.imageUrls.indexOf(img);
  if (index !== -1) {
    form.imageUrls.splice(index, 1);
  }
  deleteQiNiuFile(key)

}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 上传成功触发的方法
const uploadSuccess: UploadProps['onSuccess'] = (uploadFile, uploadFiles) => {

  console.log('上传成功触发的方法uploadFile', uploadFile)
  console.log('上传成功触发的方法uploadFiles', uploadFiles)

  // 拼接图片地址
  const img = process.env.VUE_APP_QINIU_URL + uploadFile.key

  console.log(img)

  form.imageUrls.push(img)
}
const uploadError: UploadProps['onError'] = (uploadFile, uploadFiles) => {

  console.log('上传失败触发的方法uploadFile', uploadFile)
  console.log('上传失败触发的方法uploadFiles', uploadFiles)

}
const deleteQiNiuFile = async (key: string) => {
  QiniuData.key = key
  console.log(QiniuData)
  console.log('删除上传传参', QiniuData)

  // @ts-ignore
  const res = await server.userApi.postDeleteQinNiuFile(QiniuData)
  if (res.code === 200) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除图片失败')
    throw new Error('删除图片失败')
  }
  console.log(res)
}

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
//提交新增分类
const addCategory = async () => {
  const formData = {
    'name': form.name,
    'state': form.detail_name,
  }

  // @ts-ignore
  const res = await server.userApi.addConfig(formData)
  console.log('上传的form表单 = ', form)

  if (res.code === 200) {
    ElMessage.success('添加成功')
    router.push('/sys_dictionary')
  } else {
    ElMessage.error('操作失败')
    throw new Error('操作失败')
  }
  console.log(res)
}
// 提交
const submitForm = async (formEl: any) => {
  if (!form.name) {
    // alert('请输入标题')
    // return
    await ElMessageBox.alert('请输入版本号', '提示', {
      // if you want to disable its autofocus
      autofocus: false,
      confirmButtonText: '确定',
      callback: (action: Action) => {
        return
      },
    })
  }
  if (!form.detail_name) {
    // alert('请输入简介')
    // return
    await ElMessageBox.alert('请输入true/false', '提示', {
      // if you want to disable its autofocus
      autofocus: false,
      confirmButtonText: '确定',
      callback: (action: Action) => {
        return
      },
    })
  }
  addCategory()
}
// 重置
const resetForm = async () => {
  form.name = ''
  form.detail_name = ''
}
</script>

<template>
  <el-form :model="form" ref="inputForm">
    <el-form-item label="版本号">
      <el-input v-model="form.name" placeholder="请输入版本号"></el-input>
    </el-form-item>
    <el-form-item label="状态值">
      <el-input v-model="form.detail_name" placeholder="请输入true或false" :autosize="{ minRows: 2, maxRows: 8 }"
        type="textarea"></el-input>
    </el-form-item>

    <!-- <el-form-item label="图片">
      <el-upload class="upload-demo" action="https://upload.qiniup.com" :data="QiniuData" :file-list="form.imageUrls"
        accept="image/jpeg, image/jpg, image/png" list-type="picture-card" :before-upload="beforeUpload"
        :on-preview="handlePictureCardPreview" :on-success="uploadSuccess" :on-error="uploadError"
        :on-remove="handleRemove">
        <el-icon>
          <IEpPlus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item> -->
    <el-form-item>
      <div class="container">
        <el-button style="width: 200px;" type="primary" @click="submitForm(inputForm)" size="large">提交</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  /* 使元素水平居中 */
}

.el-button {
  margin: auto;
}
</style>
