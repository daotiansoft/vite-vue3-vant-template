<template>
    <div class="auth-container">
        <div class="auth-card">
            <!-- 顶部品牌区域 -->
            <div class="brand-area">
                <div class="logo-wrapper">
                    <div class="logo-icon">
                        <van-icon name="cluster-o" size="36" color="#3f8cff" />
                    </div>
                    <h1 class="app-name">{{ isLoginMode ? '欢迎回来' : '创建账号' }}</h1>
                </div>
                <p class="slogan">{{ isLoginMode ? '请登录您的账户' : '立即注册，开启精彩体验' }}</p>
            </div>

            <!-- 模式切换标签页 -->
            <van-tabs v-model:active="activeTab" animated swipeable>
                <!-- 登录面板 -->
                <van-tab title="登录">
                    <van-form @submit="onLoginSubmit">
                        <!-- 账号输入 -->
                        <van-field v-model="loginForm.username" name="username" label="账号" placeholder="请输入手机号/邮箱"
                            :rules="[
                                { required: true, message: '请填写账号' },
                                { validator: validateUsername, message: '请输入正确的手机号或邮箱格式' }
                            ]" clearable left-icon="user-o" />

                        <!-- 密码输入 -->
                        <van-field v-model="loginForm.password" :type="showLoginPassword ? 'text' : 'password'"
                            name="password" label="密码" placeholder="请输入密码"
                            :rules="[{ required: true, message: '请填写密码' }]" clearable left-icon="closed-eye">
                            <template #right-icon>
                                <van-icon :name="showLoginPassword ? 'eye-o' : 'closed-eye'"
                                    @click="showLoginPassword = !showLoginPassword" />
                            </template>
                        </van-field>

                        <!-- 图形验证码 -->
                        <van-field v-model="loginForm.captcha" name="captcha" label="验证码" placeholder="请输入验证码"
                            :rules="[{ required: true, message: '请填写验证码' }, { validator: validateLoginCaptcha, message: '验证码错误' }]"
                            clearable left-icon="upgrade" maxlength="6">
                            <template #button>
                                <div class="captcha-code" @click="refreshLoginCaptcha">
                                    <span>{{ loginCaptchaText }}</span>
                                </div>
                            </template>
                        </van-field>

                        <!-- 额外选项 -->
                        <div class="extra-options">
                            <van-checkbox v-model="loginForm.remember">记住密码</van-checkbox>
                            <span class="forgot-link" @click="handleForgotPassword">忘记密码?</span>
                        </div>

                        <!-- 登录按钮 -->
                        <div class="action-btn-wrapper">
                            <van-button round block type="primary" native-type="submit">
                                登 录
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>

                <!-- 注册面板 -->
                <van-tab title="注册">
                    <van-form @submit="onRegisterSubmit">
                        <!-- 注册账号 -->
                        <van-field v-model="registerForm.username" name="reg_username" label="账号"
                            placeholder="请输入手机号/邮箱" :rules="[
                                { required: true, message: '请填写账号' },
                                { validator: validateUsername, message: '请输入正确的手机号或邮箱格式' }
                            ]" clearable left-icon="user-o" />

                        <!-- 注册密码 -->
                        <van-field v-model="registerForm.password" :type="showRegPassword ? 'text' : 'password'"
                            name="reg_password" label="密码" placeholder="请输入密码（6-20位）" :rules="[
                                { required: true, message: '请填写密码' },
                                { pattern: /^.{6,20}$/, message: '密码长度需为6-20位' }
                            ]" clearable left-icon="closed-eye">
                            <template #right-icon>
                                <van-icon :name="showRegPassword ? 'eye-o' : 'closed-eye'"
                                    @click="showRegPassword = !showRegPassword" />
                            </template>
                        </van-field>

                        <!-- 确认密码 -->
                        <van-field v-model="registerForm.confirmPassword" :type="showRegConfirm ? 'text' : 'password'"
                            name="confirm_password" label="确认密码" placeholder="请再次输入密码" :rules="[
                                { required: true, message: '请再次输入密码' },
                                { validator: validateConfirmPassword, message: '两次输入的密码不一致' }
                            ]" clearable left-icon="passed">
                            <template #right-icon>
                                <van-icon :name="showRegConfirm ? 'eye-o' : 'closed-eye'"
                                    @click="showRegConfirm = !showRegConfirm" />
                            </template>
                        </van-field>

                        <!-- 注册图形验证码 -->
                        <van-field v-model="registerForm.captcha" name="reg_captcha" label="验证码" placeholder="请输入验证码"
                            :rules="[{ required: true, message: '请填写验证码' }, { validator: validateRegCaptcha, message: '验证码错误' }]"
                            clearable left-icon="upgrade" maxlength="6">
                            <template #button>
                                <div class="captcha-code" @click="refreshRegCaptcha">
                                    <span>{{ regCaptchaText }}</span>
                                </div>
                            </template>
                        </van-field>

                        <!-- 注册协议 -->
                        <div class="agreement">
                            <van-checkbox v-model="registerForm.agreeProtocol" shape="square">
                                我已阅读并同意
                                <span class="link-text">《用户协议》</span>
                                和
                                <span class="link-text">《隐私政策》</span>
                            </van-checkbox>
                        </div>

                        <!-- 注册按钮 -->
                        <div class="action-btn-wrapper">
                            <van-button round block type="primary" native-type="submit"
                                :disabled="!registerForm.agreeProtocol">
                                注 册
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
            </van-tabs>

            <!-- 底部切换提示 -->
            <div class="switch-mode-footer">
                <span class="tip-text">
                    {{ isLoginMode ? '还没有账号？' : '已有账号？' }}
                    <span class="switch-link" @click="toggleMode">
                        {{ isLoginMode ? '立即注册' : '去登录' }}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { showToast } from 'vant'

// 当前激活的标签页 (0: 登录, 1: 注册)
const activeTab = ref(0)

// 根据 activeTab 计算当前模式
const isLoginMode = computed(() => activeTab.value === 0)

// ---------- 登录表单数据 ----------
const loginForm = reactive({
    username: '',
    password: '',
    captcha: '',
    remember: false
})

// 登录密码可见性
const showLoginPassword = ref(false)

// 登录验证码相关
const loginCaptchaText = ref('')
let loginCaptchaRealValue = ''

// ---------- 注册表单数据 ----------
const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    captcha: '',
    agreeProtocol: false
})

// 注册密码与确认密码可见性
const showRegPassword = ref(false)
const showRegConfirm = ref(false)

// 注册验证码相关
const regCaptchaText = ref('')
let regCaptchaRealValue = ''

// ---------- 工具函数：生成随机验证码（字母+数字混合，4-6位随机长度）----------
const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
    const length = Math.floor(Math.random() * 3) + 4
    let captcha = ''
    for (let i = 0; i < length; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)]
    }
    return captcha
}

// 刷新登录验证码
const refreshLoginCaptcha = () => {
    const newCaptcha = generateCaptcha()
    loginCaptchaText.value = newCaptcha
    loginCaptchaRealValue = newCaptcha
}

// 刷新注册验证码
const refreshRegCaptcha = () => {
    const newCaptcha = generateCaptcha()
    regCaptchaText.value = newCaptcha
    regCaptchaRealValue = newCaptcha
}

// 验证登录验证码
const validateLoginCaptcha = (val) => {
    if (!val) return false
    return val.toLowerCase() === loginCaptchaRealValue.toLowerCase()
}

// 验证注册验证码
const validateRegCaptcha = (val) => {
    if (!val) return false
    return val.toLowerCase() === regCaptchaRealValue.toLowerCase()
}

// 账号格式校验
const validateUsername = (val) => {
    if (!val) return false
    const phoneReg = /^1[3-9]\d{9}$/
    const emailReg = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    return phoneReg.test(val) || emailReg.test(val)
}

// 确认密码校验
const validateConfirmPassword = (val) => {
    return val === registerForm.password
}

// 登录提交
const onLoginSubmit = () => {
    if (!validateLoginCaptcha(loginForm.captcha)) {
        showToast({
            message: '验证码错误',
            type: 'fail',
            duration: 1500,
            position: 'bottom'
        })
        refreshLoginCaptcha()
        loginForm.captcha = ''
        return
    }

    showToast({
        message: `登录成功，欢迎 ${loginForm.username}`,
        icon: 'success',
        duration: 1500,
        position: 'bottom'
    })
}

// 注册提交
const onRegisterSubmit = () => {
    if (!validateRegCaptcha(registerForm.captcha)) {
        showToast({
            message: '验证码错误',
            type: 'fail',
            duration: 1500,
            position: 'bottom'
        })
        refreshRegCaptcha()
        registerForm.captcha = ''
        return
    }

    showToast({
        message: `注册成功！请登录`,
        icon: 'success',
        duration: 1500,
        position: 'bottom'
    })

    setTimeout(() => {
        activeTab.value = 0
        loginForm.username = registerForm.username
        loginForm.password = ''
        loginForm.captcha = ''
        refreshLoginCaptcha()
        registerForm.username = ''
        registerForm.password = ''
        registerForm.confirmPassword = ''
        registerForm.captcha = ''
        registerForm.agreeProtocol = false
        refreshRegCaptcha()
    }, 1500)
}

// 忘记密码
const handleForgotPassword = () => {
    showToast({
        message: '请联系客服重置密码',
        icon: 'info-o',
        duration: 1500,
        position: 'bottom'
    })
}

// 切换模式
const toggleMode = () => {
    activeTab.value = isLoginMode.value ? 1 : 0
}

// 监听切换标签页，刷新验证码
watch(activeTab, (newVal) => {
    if (newVal === 0) {
        refreshLoginCaptcha()
        loginForm.captcha = ''
    } else {
        refreshRegCaptcha()
        registerForm.captcha = ''
    }
})

// 初始化
refreshLoginCaptcha()
refreshRegCaptcha()
</script>

<style scoped>
/* 全屏容器 */
.auth-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #f0f4fa 0%, #e6ecf4 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
}

/* 卡片容器 */
.auth-card {
    width: 100%;
    min-height: 100%;
    background: #ffffff;
    padding: 40px 24px 48px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* 品牌区 - 仅保留基础样式 */
.brand-area {
    text-align: center;
    margin-bottom: 32px;
}

.logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 12px;
}

.app-name {
    font-size: 28px;
    font-weight: 600;
    color: #1f2f3a;
}

.slogan {
    font-size: 14px;
    color: #7e8c9e;
    margin-top: 8px;
}

/* 验证码区域 - 仅保留必要样式 */
.captcha-code {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 36px;
    background: #f2f3f5;
    border-radius: 8px;
    cursor: pointer;
    font-family: monospace;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 2px;
}

.captcha-code:active {
    opacity: 0.7;
}

/* 额外选项 */
.extra-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0 24px;
    font-size: 14px;
}

.forgot-link {
    color: #969799;
    cursor: pointer;
}

/* 协议区域 */
.agreement {
    margin: 16px 0 12px;
    font-size: 13px;
    display: flex;
    justify-content: center;
}

.link-text {
    color: #3f8cff;
    cursor: pointer;
}

/* 按钮容器 */
.action-btn-wrapper {
    margin-top: 24px;
}

/* 底部切换链接 */
.switch-mode-footer {
    text-align: center;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid #ebedf0;
}

.tip-text {
    font-size: 14px;
    color: #969799;
}

.switch-link {
    color: #3f8cff;
    font-weight: 500;
    margin-left: 8px;
    cursor: pointer;
}

/* 响应式 */
@media (max-width: 480px) {
    .auth-card {
        padding: 32px 20px 40px;
    }

    .app-name {
        font-size: 24px;
    }

    .captcha-code {
        width: 88px;
        font-size: 16px;
    }
}
</style>