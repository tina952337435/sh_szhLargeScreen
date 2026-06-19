import request from "@/utils/request";
const serveName = ''
export default {
  GetTyphoonList: (params) => {
    return request.post(`${serveName}ZJ_TYPHOON_ZJ_TF/GetTyphoonList`, params)
  },  
  //台风专题列表
  selectZhuanTiList: (params) => {
    return request.post(`${serveName}SWZZ_FLOOD_ZhuanTi/selectZhuanTiList`, params)
  },
  //台风特征值
  ZhuantifindResultName: (params) => {
    return request.post(`${serveName}SWZZ_FLOOD_Zhuanti_tz/findResultName`, params)
  },  
  //超警统计
  ZhuantifindResultWrz: (params) => {
    return request.post(`${serveName}SWZZ_FLOOD_Zhuanti_tz/findResultWrz`, params)
  },  
  //潮位过程  
  ZhuantiTideGC: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_ES_ZHANDIANDATA/SWZZ_FLOODTIDEDATA_ST_TIDEHIGH_RSel`, params)
  },  
  //潮位统计
  ZhuantiTideTJ: (params) => {
    return request.post(`${serveName}/SWZZ_FLOOD_ST_TIDEH_R/findResultTJ`, params)
  },
  //分区面雨量
  ZHUANTIAreaJYDay: (params) => {
    return request.post(`${serveName}/SWZZ_FLOOD_Zhuanti_tz/ZHUANTIAreaJYDay`, params)
  },
}
