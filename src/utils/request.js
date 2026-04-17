// src/utils/request.js
import axios from "axios";
import { showToast, showLoadingToast, closeToast } from "vant";
import { useUserStore } from "@/stores/user";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (config.showLoading !== false) {
      config.loading = showLoadingToast({
        message: "加载中...",
        forbidClick: true, // 禁止点击
        duration: 0, // 持续显示
      });
    }

    // 添加 token
    const userStore = useUserStore();
    const token = userStore.token || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 关闭 loading
    if (response.config.loading) {
      closeToast();
    }

    // 根据后端返回格式调整
    if (res.code !== 200) {
      // 业务错误提示
      showToast({
        message: res.message || "请求失败",
        type: "fail",
      });

      // token 过期处理
      if (res.code === 401) {
        const userStore = useUserStore();
        userStore.logout();
        // 跳转到登录页
        window.location.href = "/login";
      }

      return Promise.reject(new Error(res.message));
    }

    return res;
  },
  (error) => {
    // 关闭 loading
    if (error.config?.loading) {
      closeToast();
    }
    showToast(error.message || "网络错误");
    return Promise.reject(error);
  },
);

export default request;
