<!-- src/views/settings/index.vue (设置页面) -->
<template>
    <div class="settings">
        <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="() => router.back()" />
        <div class="content">
            <van-cell-group title="账号设置">
                <van-cell title="修改密码" is-link to="/settings/password" />
                <van-cell title="绑定手机" is-link to="/settings/phone" />
            </van-cell-group>
            <van-cell-group title="通用设置">
                <van-cell title="清除缓存" @click="clearCache" />
                <van-cell title="检查更新" @click="checkUpdate" />
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
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

defineOptions({
    meta: {
        title: '设置'
    }
})

const router = useRouter()
const active = ref(2)

const clearCache = () => {
    Toast('缓存已清除')
}

const checkUpdate = () => {
    Toast('已是最新版本')
}
</script>

<style scoped>
.content {
    padding: 20px;
}
</style>