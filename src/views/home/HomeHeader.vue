<template>
    <div class="app-container">
        <div class="header">
            <img class="header-img"
                src="https://imgs0.zupu.cn/photos/common/2023/03/14/7ad3c5bc-9606-443f-848b-d682a62121f0.png"
                alt="Header Image">
            <!-- <div class="tab" :class="{ active: activeTab === 1 }" @click="activeTab = 1">Tab1</div>
            <div class="tab" :class="{ active: activeTab === 2 }" @click="activeTab = 2">Tab2</div> -->

        </div>
        <div class="tab-container">
            <div class="tab" :class="{ active: activeTab === 1 }" @click="activeTab = 1">Tab1</div>
            <div class="tab" :class="{ active: activeTab === 2 }" @click="activeTab = 2">Tab2</div>
        </div>
        <div class="columns">
            <div v-if="activeTab === 1">
                <ul>
                    <li v-for="(item, index) in pictures" :key="index">{{ item.src }}</li>
                </ul>
            </div>
            <div v-else-if="activeTab === 2">
                <ul>
                    <li v-for="(item, index) in texts" :key="index">{{ item.content }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            activeTab: 1,
            pictures: [
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 1, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 2, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 3, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 4, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
                { id: 5, src: 'https://imgs0.zupu.cn/photos/common/2023/03/14/706830fc-1ad9-41c2-a2cd-2daffb27bfc9.png' },
            ],
            texts: [
                { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { id: 3, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 4, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
                { id: 5, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { id: 3, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 4, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
                { id: 5, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { id: 3, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 4, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
                { id: 5, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { id: 3, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 4, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
                { id: 5, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { id: 3, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 4, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
                { id: 5, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                { id: 2, content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { id: 3, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { id: 4, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
                { id: 5, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
            ],
        };
    },
};
</script>
  
<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 0 20px;
    height: 80px;
    z-index: 1;
}

.header-img {
    height: 50px;
    width: auto;
}

.tab {
    flex: 1;
    text-align: center;
    padding: 20px 0;
    font-size: 20px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
    transition: color 0.2s;
}

.tab.active {
    color: #000;
    border-bottom: 4px solid #000;
}

.columns {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.columns ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.columns li {
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 1.5;
}
</style>
  