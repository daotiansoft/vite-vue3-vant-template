<!-- src/views/about/index.vue (关于页面) -->
<template>
    <div class="about">
        <van-nav-bar title="我的" />
        <div class="content">
            <van-cell title="版本号" value="v1.0.0" />
            <van-cell title="关于我们" is-link to="/about/detail" />
            <van-cell title="个人资料" is-link to="/user/profile" />
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

defineOptions({
    meta: {
        title: '个人中心'
    }
})

const active = ref(1)
</script>

<style scoped>
.content {
    padding: 20px;
}
</style>