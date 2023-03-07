<script lang="ts" setup>
import { isCollapse } from "./isCollapse";
</script>

<template>
    <el-aside>
        <el-menu router unique-opened :collapse="isCollapse">
            <a href="/" class="logo">
                <img src="@/assets/img/log.svg" alt="">
                <h1>课后学堂</h1>
            </a>

            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>权限管理</span>
                </template>
                <el-menu-item>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>新增权限</span>
                </el-menu-item>
                <el-menu-item>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>删除权限</span>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>用户管理</span>
                </template>
                <el-menu-item>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>管理员</span>
                </el-menu-item>
                <el-menu-item>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>业务员</span>
                </el-menu-item>
                <el-menu-item>
                    <el-icon>
                        <IEpSetting />
                    </el-icon> <span>客户</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item>
                <el-icon>
                    <IEpSetting />
                </el-icon> <span>课程管理</span>
            </el-menu-item>

            <el-menu-item>
                <el-icon>
                    <IEpSetting />
                </el-icon> <span>广告管理</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
    background-color: #e9e9eb;
    height: 100vh;
    width: auto;
}

.el-menu {
  background-color: #e9e9eb;
  border-right: none;
  width: 150px;
  &.el-menu--collapse {
    width: 60px;
    & h1 {
      display: none;
    }
  }
}


.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    text-decoration: none;
    color: black;

    img {
        width: 32px;
        height: 32px;
    }
}</style>
