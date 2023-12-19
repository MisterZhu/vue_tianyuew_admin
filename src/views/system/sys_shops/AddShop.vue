<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Action, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus'

const server = inject('server')
let router = useRouter()

const form = reactive({
  title: '',
  annual_rent: '',
  telephone: '',
  wei_xin: '',
});
const QiniuData = {    //这里是直接绑定data的值
  key: "", //图片名字处理
  token: "", //七牛云token
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
let inputForm = ref()

const value = ref('')

const options = [
  {
    value: '1',
    label: '家政',
  },
  {
    value: '2',
    label: '装修',
  },
  {
    value: '3',
    label: '废品回收',
  },
  {
    value: '4',
    label: '自装指南',
  },
]

// 上传前调用方法
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  let suffix = rawFile.name;
  let key = `images/upload_pic_${new Date().getTime()}_${rawFile.name}`
  // let key = new Date () + Math.floor(Math.random()*100) + encodeURI(`${suffix}`)
  QiniuData.key = key;
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
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
    'title': form.title,
    'annual_rent': form.annual_rent,
    'telephone': form.telephone,
    'wei_xin': form.wei_xin,
    'posts_type': Number(value.value),
  }

  // @ts-ignore
  const res = await server.userApi.addShop(formData)
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
  if (!form.title) {
    // alert('请输入标题')
    // return
    await ElMessageBox.alert('请输入商家名称', '提示', {
      // if you want to disable its autofocus
      autofocus: false,
      confirmButtonText: '确定',
      callback: (action: Action) => {
        return
      },
    })
  }
  if (!form.telephone) {
    // alert('请输入标题')
    // return
    await ElMessageBox.alert('请输入商家手机号', '提示', {
      // if you want to disable its autofocus
      autofocus: false,
      confirmButtonText: '确定',
      callback: (action: Action) => {
        return
      },
    })
  }
  if (!form.annual_rent) {
    // alert('请输入简介')
    // return
    await ElMessageBox.alert('请输入商家介绍', '提示', {
      // if you want to disable its autofocus
      autofocus: false,
      confirmButtonText: '确定',
      callback: (action: Action) => {
        return
      },
    })
  }
  if (value.value.length <= 0) {

    // alert('请输入简介')
    // return
    await ElMessageBox.alert('请选择商家类型', '提示', {
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

</script>

<template>
  <el-form :model="form" ref="inputForm">
    <el-form-item label="商家名称">
      <el-input v-model="form.title" placeholder="请输入商家名称"></el-input>
    </el-form-item>
    <el-form-item label="商家介绍">
      <el-input v-model="form.annual_rent" placeholder="请输入商家介绍" :autosize="{ minRows: 2, maxRows: 8 }"
        type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.telephone" placeholder="请输入商家手机号"></el-input>
    </el-form-item>
    <el-form-item label="商家微信">
      <el-input v-model="form.wei_xin" placeholder="请输入商家微信号"></el-input>
    </el-form-item>
    <el-form-item label="商家类型">
      <el-select v-model="value" class="m-2" placeholder="请选择商家类型" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
