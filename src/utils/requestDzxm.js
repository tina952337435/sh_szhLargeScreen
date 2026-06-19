import axios from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: "/dzxmApi/",
  timeout: 30000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  // headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" },
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");   
    if (accessToken) {
      config.headers.Authorization = accessToken;
    } 
    return config;
  },
  (error) => {
    window.loadingHide();
    console.error('error', error) // 打印错误
    // return Promise.reject(error);
    // 返回登录页面
    window.location.href = "/login";
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理，例如只返回data部分
    const res = response.data
    // console.error("service",res)
    // 根据返回的状态码做相应处理，例如401未授权等
    if (res.code == "-401") {
      localStorage.clear();
      localStorage.removeItem("loginFalse");
      localStorage.setItem("forceLogout", Date.now().toString());
      window.loadingHide();
      window.location.href = "/login";
    }
    return Promise.resolve(res)
  },
  (error) => {
    // 响应错误处理
    console.error('error', error) // 打印错误
    window.loadingHide();
    if (error.code === "-401") {
      localStorage.clear();
      localStorage.removeItem("loginFalse");
      localStorage.setItem("forceLogout", Date.now().toString());
      window.location.href = "/login";
    }
    return Promise.reject(error)
  }
)

function httpGet(url, params) {
  return service.get(url, { params })
}
function httpPost(url, params) {
  return service.post(url, params)
}
export default {
  get: httpGet,
  post: httpPost
}
