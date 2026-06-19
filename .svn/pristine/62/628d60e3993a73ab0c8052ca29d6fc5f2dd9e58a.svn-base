import request from "@/utils/request";
// import { GetJosns } from "../ComUnit";
const serveName = '';
// 获取当前主题
export default {
  // 视频
  videoSel: (params) => {
    return request.post(`${serveName}/video/selectList`, params)
  },
  videoPreview: (params) => {
    return request.post(`${serveName}/video/queryList`, params)
  },
  videoOnline: (params) => {
    return request.post(`${serveName}/video/onlineList`, params)
  },
  videotreeSel: (params) => {
    return request.post(`${serveName}/video/querytreeList`, params)
  },
  getptzsInfo: (params) => {
    return request.post(`${serveName}/video/getptzsInfo`, params)
  },
  previewURLs: (params) => {
    return request.previewURLs(params)

  },
  // BP预报
  postQuery: (params) => {
    return request.post(`${serveName}/excel/postQuery`, params)
  },
  // 查下数据
  postSel: (params) => {
    return request.post(`${serveName}/webserver/SPI`, params)
  },
} 
