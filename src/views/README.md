// 如果需要自定义路由名称，可以创建 src/views/README.md 说明文件

/\*
路由自动生成规则说明：

1. index.vue 会被映射为根路径 /
2. about/index.vue 会被映射为 /about
3. about/detail.vue 会被映射为 /about/detail
4. user/profile.vue 会被映射为 /user/profile
5. settings/index.vue 会被映射为 /settings
6. settings/password.vue 会被映射为 /settings/password

命名规则：

- 文件夹名称会成为路由路径的一部分
- 文件名（不含.vue）会成为最后的路径
- index.vue 会作为该文件夹的默认路由

路由元信息：
可以在组件中使用 defineOptions 设置 meta 信息
defineOptions({
meta: {
title: '页面标题',
requiresAuth: true, // 是否需要登录
keepAlive: true // 是否缓存页面
}
})
\*/
