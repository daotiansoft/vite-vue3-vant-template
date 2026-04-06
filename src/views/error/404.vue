<template>
    <div class="not-found-container">
        <van-empty image="error" description="抱歉，您访问的页面不存在">
            <template #image>
                <div class="custom-image">
                    <van-icon name="warning-o" size="80" color="#969799" />
                </div>
            </template>
        </van-empty>

        <div class="button-group">
            <van-button type="primary" block @click="goToHome" class="action-button">
                返回首页
            </van-button>
            <van-button plain type="primary" block @click="goBack" class="action-button">
                返回上一页
            </van-button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const goToHome = () => {
    router.push('/')
}

// 返回上一页
const goBack = () => {
    // 如果存在上一页历史则返回，否则跳转到首页
    if (window.history.length > 1) {
        router.go(-1)
    } else {
        router.push('/')
    }
}
</script>

<style scoped>
.not-found-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    background-color: #f7f8fa;
    box-sizing: border-box;
}

.custom-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
}

.button-group {
    width: 100%;
    max-width: 300px;
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.action-button {
    border-radius: 8px;
}
</style>