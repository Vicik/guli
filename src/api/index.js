/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import axios from "axios";
import { message } from "antd";
import jsonp from "jsonp";
import ajax from "./ajax";

// 登录接口
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// 添加用户
export const reqAddUser = (user) => ajax("manage/user/add", user, "POST");
// 请求天气
export const reqW = (city) => {
  let promise = "";
  return new Promise((resolve, reject) => {
    promise = axios.get("http://wthrcdn.etouch.cn/weather_mini", {
      params: { city },
    });
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error("请求出错了：" + error.message);
      });
  });
};

// jsonp请求的接口请求函数
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}output=json&ak=5slgyqGDENN7Sy7pw29IUvrZ`;
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === "success") {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        message.error("获取天气信息失败");
      }
    });
  });
};

// 获取一级/二级分类的列表
export const reqCategories = (parentId) =>
  ajax("manage/category/list", { parentId });
// 添加分类
export const reqAddCategory = ({ categoryName, parentId }) =>
  ajax("/manage/category/add", { categoryName, parentId }, "POST");
// 更新分类
export const reqUpdateCategory = ({ categoryName, categoryId }) =>
  ajax("/manage/category/update", { categoryName, categoryId }, "POST");
