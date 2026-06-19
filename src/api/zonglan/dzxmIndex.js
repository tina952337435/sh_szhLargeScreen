import request from "@/utils/requestDzxm";
const serveName = '';
// 获取当前主题
export default {
  // 加载边界
  rainfallshanghaiSel: (params) => {
    return request.get(`${serveName}/rainfall/shanghai`, params)
  },  
  rainfallprocessSel: (params) => {
    return request.post(`${serveName}/rainfall/process`, params)
  },

  //雨量等值面
  rainfallIsosurfaces: (params) => {
    return request.post(`${serveName}/isosurfaces`, params)
  },  
  //雨量等值线
  rainfallIsolines: (params) => {
    return request.post(`${serveName}/isolines`, params)
  },
  //雨量面积统计
  rainfallAreaStats:  (params) => {
    return request.post(`${serveName}/area-stats`, params)
  },

  //多区域雨量等值面
  rainfallMultiIsosurfaces: (params) => {
    return request.post(`${serveName}/multi-regions/isosurfaces`, params)
  },
  //多区域雨量等值线
  rainfallMultiIsolines: (params) => {
    return request.post(`${serveName}/multi-regions/isolines`, params)
  },
} 
