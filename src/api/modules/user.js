// src/api/user.js
import request from "@/utils/request";
import { API } from "../config";

export const userApi = {
  // 登录
  login(data) {
    return request({
      url: API.USER.LOGIN,
      method: "post",
      data,
    });
  },

  // 获取用户信息
  getUserInfo() {
    return request({
      url: API.USER.INFO,
      method: "get",
    });
  },

  // 更新用户信息
  updateUserInfo(data) {
    return request({
      url: API.USER.UPDATE,
      method: "put",
      data,
    });
  },

  // 上传头像
  uploadAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return request({
      url: "/user/avatar",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
