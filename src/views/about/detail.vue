<!-- src/views/about/detail.vue (关于详情页) -->
<template>
    <div class="detail">
        <van-nav-bar title="关于我们" left-text="返回" left-arrow @click-left="() => router.back()" />
        <div class="content">
            <van-cell title="应用名称" value="Vant App" />
            <van-cell title="版本" value="1.0.0" />
            <van-cell title="作者" value="Your Name" />
            <van-cell title="联系方式" value="email@example.com" />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
    meta: {
        title: '关于我们'
    }
})

const router = useRouter()
</script>

<style scoped>
.content {
    padding: 20px;
}
</style>