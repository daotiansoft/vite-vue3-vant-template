// src/api/user.js
import request from "@/utils/request";

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: "/user/info",
    method: "get",
  });
};

// 登录
export const login = (data) => {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
};
