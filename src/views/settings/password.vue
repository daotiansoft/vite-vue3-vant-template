<!-- src/views/settings/password.vue (修改密码页) -->
<template>
    <div class="password">
        <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="() => router.back()" />
        <div class="content">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="formData.oldPassword" type="password" label="原密码" placeholder="请输入原密码"
                        :rules="[{ required: true, message: '请输入原密码' }]" />
                    <van-field v-model="formData.newPassword" type="password" label="新密码" placeholder="请输入新密码"
                        :rules="[{ required: true, message: '请输入新密码' }]" />
                    <van-field v-model="formData.confirmPassword" type="password" label="确认密码" placeholder="请再次输入新密码"
                        :rules="[
                            { required: true, message: '请再次输入新密码' },
                            { validator: (val) => val === formData.newPassword, message: '两次输入的密码不一致' }
                        ]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

defineOptions({
    meta: {
        title: '修改密码'
    }
})

const router = useRouter()
const formData = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const onSubmit = () => {
    Toast.success('密码修改成功')
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