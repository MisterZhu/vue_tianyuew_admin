<!-- <template>
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item, index) in listBread" :key="item.path">
        <span v-if="index == 0">{{ item.name }}</span>
        <router-link v-else :to="item.path">{{ item.name }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </template>
  
  <script setup>
  import { ref } from "@vue/reactivity";
  import { watchEffect } from "@vue/runtime-core";
  import { useRoute } from "vue-router";
  
  const listBread = ref([]);
  const route = useRoute();
  
  watchEffect(() => {
    listBread.value = route.matched;
  });
  </script> -->
  
<!-- <template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>

    <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
            <span v-if="index == 0">{{ item.meta.title }}</span>
            <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <el-breadcrumb separator="/">
        <TransitionGroup appear enter-active-class="animate__animated animate__fadeInRight">
            <el-breadcrumb-item :key="index" v-for="(item, index) in levelList">{{ item.meta.title }}</el-breadcrumb-item>
        </TransitionGroup>
    </el-breadcrumb>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
  
<script lang="ts" setup>
import { defineComponent, toRaw, Ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

interface BreadItem {
    path: string
    meta: { title: string }
}

const levelList = ref<BreadItem[]>([]);
const route = useRoute()
// @ts-ignore
const getBreadcrumbs = (routes: RouteRecordRaw[], parent: BreadItem = null) => {
    console.log(111,route.meta)

    routes.forEach((route) => {
        const title = (route.meta?.title || '首页') as string
        const mate = {
            title: title
        }
        const item = {
            path: route.path,
            meta: mate,
        }
        if (parent) {
            levelList.value.push({
                path: parent.path + route.path,
                meta: mate,
            })
        } else {
            levelList.value.push(item)
        }

        if (route.children) {
            getBreadcrumbs(route.children, item)
        }
    })
}

const routes = computed(() => toRaw(route.matched))

watchEffect(() => {
    getBreadcrumbs(routes.value)
  });
  onMounted(() => {
  getBreadcrumbs(routes.value)
});

watch(useRoute, (to) => {
    getBreadcrumbs(routes.value)
});

</script>
   -->
  
<script lang="ts" setup>
import { computed, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { isCollapse } from "./isCollapse";
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
// import axios from '@/http';
let userInfo = ref({ username: "", avater: "", telephone: "", })

const server = inject('server')

interface TagItem {
    path: string;
    meta: {
        title: string;
    };
}

const route = useRoute()
const router = useRouter()

const tagList = reactive<TagItem[]>([
    {
        path: '/',
        meta: {
            title: '首页',
        },
    },
])

// 当前激活的标签索引
const activeIndex = computed(() => {
    const index = tagList.findIndex(item => item.path === route.path)
    return index >= 0 ? index : 0
})

// 添加标签
const addTag = (item: TagItem) => {
    if (!tagList.some(tag => tag.path === item.path)) {
        tagList.push(item)
    }
}

// 关闭标签
const handleClose = (index: number) => {
    tagList.splice(index, 1)
    console.log('index = ', index)
    const currentPath = route.path
    const currentTag = tagList[activeIndex.value]
    if (currentPath !== currentTag.path) {
        if (index > 0) {
            const newTag = tagList[index - 1]
            router.push(newTag.path)
        } else {
            router.push(currentTag.path)
        }
    }
}

// 点击标签
const handleClick = (item: TagItem) => {
    router.push(item.path)
}

// 监听路由变化，自动添加标签
watch(
    () => route.meta.title,
    title => {
        const item = {
            path: route.path,
            meta: {
                title,
            },
        }
        // @ts-ignore
        addTag(item)
    }
)
//用户信息模块
const getUserIn = () => {
    // @ts-ignore
    var uInfo = JSON.parse(localStorage.getItem('local_user_info'));

    console.log("userInfo = " + `${uInfo}`)
    if (uInfo) {
        userInfo = uInfo;
    } else {
        // 用户信息为空，跳转登录
        router.push({ name: "login" })
    }
}
getUserIn()
// 退出登录
const handleLogout = async () => {
    // 1.弹框询问
    await ElMessageBox.confirm("确认退出登录？", "退出登录", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: 'warning'
    }).catch(() => {
        return new Promise(() => { })
    })
    // 2.执行退出
    // @ts-ignore
    await server.userApi.postUserLogout().catch(() => { })
    ElMessage.success("退出成功")
    // 3.清空token，跳转到登录
    localStorage.removeItem("local_token")
    localStorage.removeItem('local_user_info')
    // @ts-ignore
    router.push({ name: "login" })
}
</script>
  

  
<template>
    <el-header>
        <!-- 图标 -->
        <el-icon @click="isCollapse = !isCollapse">
            <IEpExpand v-show="isCollapse" />
            <IEpFold v-show="!isCollapse" />
        </el-icon>
        <!-- 面包屑 -->
        <div class="tag-nav">
            <el-tag v-for="(item, index) in tagList" :key="item.path" :closable="index !== 0" :disable-transitions="true"
                @close="handleClose(index)" @click="handleClick(item)"
                :class="{ 'is-active': activeIndex === index, 'tag-item': true }">
                {{ item.meta.title }}
            </el-tag>
        </div>

        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <!-- <el-avatar :size="32" :src="userInfo.avater" /> -->
                <img class="animated-avatar" src="../../assets/test3.webp" alt="User Avatar">

                <el-icon class="el-icon--right">
                    <IEpArrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>{{ userInfo.username }}</el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

    </el-header>
</template>
  
<style scoped>
.animated-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer; /* 可选，添加鼠标指针样式 */
  /* 可以添加其他样式以适应你的设计需求 */
}
.tag-nav {
    display: flex;
    height: 55px;
    align-items: center;
    margin-left: 15px;
    margin-right: 75px;

}

.tag-item {
    margin-right: 10px;
    font-size: 16px;
}

.is-active {
    color: #409eff;
    border-color: #409eff;
}
.el-header {
    display: flex;
    align-items: center;
    background-color: #e9e9eb;
}

.el-header .el-icon {
    /* padding-left: 10px; */
    padding-right: 10px;
}

.el-dropdown {
    margin-left: auto;
}

.el-dropdown .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
  