<!-- src/views/index.vue (首页) -->
<template>
    <div class="home">
        <van-nav-bar title="首页" />
        <div class="content">
            <van-button type="primary" @click="fetchUserInfo">获取用户信息</van-button>
            <van-cell-group inset v-if="userInfo">
                <van-cell title="姓名" :value="userInfo.name" />
                <van-cell title="邮箱" :value="userInfo.email" />
            </van-cell-group>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="user-o" to="/about">我的</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/settings">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// 定义路由元信息
defineOptions({
    meta: {
        title: '首页'
    }
})

const active = ref(0)
const userInfo = ref(null)


</script>

<style scoped>
.content {
    padding: 20px;
}
</style>