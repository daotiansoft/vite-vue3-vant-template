<!-- src/views/user/profile.vue (个人资料页) -->
<template>
    <div class="profile">
        <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="() => router.back()" />
        <div class="content">
            <van-cell-group inset>
                <van-field v-model="userInfo.name" label="姓名" placeholder="请输入姓名" />
                <van-field v-model="userInfo.email" label="邮箱" placeholder="请输入邮箱" />
                <van-field v-model="userInfo.phone" label="手机号" placeholder="请输入手机号" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" @click="saveProfile">
                    保存修改
                </van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

defineOptions({
    meta: {
        title: '个人资料'
    }
})

const router = useRouter()
const userInfo = reactive({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000'
})

const saveProfile = () => {
    Toast.success('保存成功')
    setTimeout(() => {
        router.back()
    }, 1500)
}
</script>

<style scoped>
.content {
    padding: 20px;
}
</style>