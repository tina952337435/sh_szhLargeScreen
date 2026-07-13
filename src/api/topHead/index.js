import requestWXXS from "@/utils/requestWXXS";
import request from "@/utils/request";
import requestSWPT from "@/utils/requestSWPT";
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
  },
  //当前市级响应
  getSJYJXY_CURRENT: (params) => {
    return request.post('/service/api/swic/getSJYJXY_CURRENT', params)
  },
  //获取token
  getSwptToken: async (params) => {
    params.client_secret="rt8y0!t!";
    const res = await requestSWPT.get("/oauth/token", params);
    return res;
  },
  //获取气象预警
  getSwptQXYJ: (params) => {
    return requestSWPT.get("/service/api/swic/getQXYJ", params)
  },
  //潮位预警  
  getChaoWeiYuJing: (params) => {
    return requestSWPT.get("/service/api/swic/getChaoWeiYuJing", params)
  },
}
