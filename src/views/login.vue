<template>
    <div class="login-container">

        <div class="form-content">
            <van-image class="logo" src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.png" width="80"
                height="80" fit="contain" />

            <van-form @submit="onLogin">
                <van-cell-group inset>
                    <van-field v-model="loginForm.account" name="account" label="账号" placeholder="请输入账号"
                        :rules="[{ required: true, message: '请填写账号' }]" left-icon="user-o" />

                    <van-field v-model="loginForm.password" type="password" name="password" label="密码"
                        placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" left-icon="lock-o" />
                </van-cell-group>

                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit" :loading="loginLoading">
                        登录
                    </van-button>
                </div>

                <div class="link-buttons">
                    <van-button type="default" size="small" @click="showRegister = true">
                        注册账号
                    </van-button>
                </div>
            </van-form>
        </div>

        <!-- 注册弹窗 -->
        <van-dialog v-model:show="showRegister" title="注册" show-cancel-button @confirm="onRegister"
            @cancel="resetRegisterForm">
            <van-form>
                <van-cell-group inset>
                    <van-field v-model="registerForm.account" label="账号" placeholder="请输入账号"
                        :rules="[{ required: true, message: '请填写账号' }]" />

                    <van-field v-model="registerForm.password" type="password" label="密码" placeholder="请输入密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />

                    <van-field v-model="registerForm.confirmPassword" type="password" label="重复密码" placeholder="请再次输入密码"
                        :rules="[
                            { required: true, message: '请再次输入密码' },
                            { validator: validatePassword, message: '两次输入的密码不一致' }
                        ]" />
                </van-cell-group>
            </van-form>
        </van-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { showToast } from 'vant'

const loginLoading = ref(false)
const showRegister = ref(false)

const loginForm = reactive({
    account: '',
    password: ''
})

const registerForm = reactive({
    account: '',
    password: '',
    confirmPassword: ''
})

// 验证两次密码是否一致
const validatePassword = (val) => {
    return val === registerForm.password
}

// 登录
const onLogin = () => {
    loginLoading.value = true

    // 模拟API请求
    setTimeout(() => {
        loginLoading.value = false

        if (loginForm.account && loginForm.password) {
            showToast({
                message: '登录成功',
                type: 'success'
            })
            console.log('登录信息:', loginForm)
        } else {
            showToast({
                message: '账号或密码错误',
                type: 'fail'
            })
        }
    }, 1000)
}

// 注册
const onRegister = () => {
    // 手动检查密码一致性（双重保障）
    if (registerForm.password !== registerForm.confirmPassword) {
        showToast({
            message: '两次输入的密码不一致',
            type: 'fail'
        })
        return false
    }

    // 模拟注册API请求
    showToast({
        message: '注册成功',
        type: 'success'
    })

    console.log('注册信息:', registerForm)
    resetRegisterForm()
    return true
}

// 重置注册表单
const resetRegisterForm = () => {
    registerForm.account = ''
    registerForm.password = ''
    registerForm.confirmPassword = ''
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    background: #f5f5f5;
}

.form-content {
    padding-top: 100px;
}

.logo {
    display: block;
    margin: 0 auto 30px;
    border-radius: 50%;
    background: white;
    padding: 10px;
}

.link-buttons {
    text-align: center;
    margin-top: 20px;
}
</style>