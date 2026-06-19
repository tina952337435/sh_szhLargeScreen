import request from "@/utils/request";
const serveName = '';
// 获取当前主题
export default {
  //方案列表
  loadFangList: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_DD_SOLUTION/findResult`, params)
  },
  loadModeZhanDian:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_ZHANDIAN/findResult`, params)
  },
  loadModeZhanDianJY:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_SLTONGJI/findResult`, params)
  },
  loadModeZhanDianDataBind:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_ZHANDIAN/FH_GetBind`, params)
  },
  loadModeZhanDianDataBindJY:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_ZHANDIAN/FH_GetBindJY`, params)
  },
  loadModeYBSHUIWEI:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_ZHANDIANDATA/YBSHUIWEI`, params)
  },
  loadMODELSINGRESULT:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/WJ_MODELSINGRESULT`, params)
  },
  loadMODEYBList:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/YBList`, params)
  },
  loadRainFallTree:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_RAINFALL_TREE/findResult`, params)
  },
  loadRainFallData:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_RAINFALL/findResult`, params)
  },
  loadSlTongjiData:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_SLTONGJI/findResult`, params)
  },
  loadreadwqjsonresult:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/readwqjsonresult`, params)
  },
  loadjisuanzhanData:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_ES_JISUANZHAN/findResult`, params)
  }, 
  loadAreajinchusl:(params)=>{
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/AREASL`, params)
  },
  loadFangListTZ: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_DD_SOLUTION/findResultTZ`, params)
  },
  loadGetFangAnDataDuo: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/GetFangAnDataDuo`, params)
  },
  //水位～面积～蓄量关系表  
  WATERSTORAGEfindResult: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_ST_WATERSTORAGE_B/findResult`, params)
  },
  //获取当前蓄量信息
  findResultModeXSL: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_DD_SOLUTION/findResultModeXSL`, params)
  },
  findResultBDMSPREDICT: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/findResult`, params)
  },
} 
