<script lang="ts" setup>

import HomeAside from "./HomeAside.vue";
import HomeHeader from "./HomeHeader.vue";
import HomeBread from "./HomeBread.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <HomeAside />
      <el-container class="header-and-main">
        <HomeBread />
        <el-main>
          <el-scrollbar>
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}

.el-main {
  background-color: #f4f4f5;
  padding-right: 10px;
}
</style>

