import { defineStore } from "pinia";
import { userApi } from "@/api";
import { showToast } from "vant";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref(null);
  const token = ref(localStorage.getItem("token") || "");
  const isLoggedIn = computed(() => !!token.value);

  // 登录
  async function login(loginForm) {
    try {
      const { data } = await userApi.login(loginForm);
      token.value = data.token;
      userInfo.value = data.user;
      localStorage.setItem("token", data.token);
      showToast({
        message: "登录成功",
        type: "success",
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // 获取用户信息
  async function fetchUserInfo() {
    try {
      const { data } = await userApi.getUserInfo();
      userInfo.value = data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  // 登出
  function logout() {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem("token");
    showToast("已退出登录");
  }

  return {
    userInfo,
    token,
    isLoggedIn,
    login,
    fetchUserInfo,
    logout,
  };
});
