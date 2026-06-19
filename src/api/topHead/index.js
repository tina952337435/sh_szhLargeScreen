import requestWXXS from "@/utils/requestWXXS";
import request from "@/utils/request";
const serveName = ''
export default {
  // 应急响应
  getUsePremission: (params) => {
    return request.post('/SWZZ_DATA_emergency_response/getSJYJXY_CURRENT', params)
  },
  // 历史应急响应
  getgetSJYJXYList: (params) => {
    return request.post('/SWZZ_DATA_emergency_response/findResult', params)
  },
  // 气象信息
  Weacontent: (params) => {
    return requestWXXS.post(`${serveName}SQDATA_WX_TBA_WEACONTENTSel`, params)
  },
  //雷达图、降雨预报图等
  TFPICWeacontent: (params) => {
    return requestWXXS.post(`${serveName}WATER_WX_ZJ_TFPICSel`, params)
  }
}
