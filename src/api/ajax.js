/*
* 能发送异步ajax请求的函数模块--封装axios
*/
import axios from "axios";
import { message } from "antd";
const BASE = '';

export default function ajax(url, data = {}, method = "GET") {
  let promise = '';
  return new Promise((resolve, reject) => {
    if(method === 'GET') {
      promise = axios.get(BASE+url, {params: data});
    }else{
      promise = axios.post(BASE+url,data);
    }
    promise.then(response => {
      resolve(response.data);
    }).catch(error => {
      message.error('请求出错了：' + error.message);
    })
  })
  
}