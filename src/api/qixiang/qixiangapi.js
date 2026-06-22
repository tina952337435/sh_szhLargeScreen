import request from "@/utils/requestWXXS";
const serveName = '' 
  //雷达图、降雨预报图等
  function TFPICWeacontent (params) {
    return request.post(`${serveName}WATER_WX_ZJ_TFPICSel`, params)
  }
  // 行政分区降雨预报
  function RainWeacontent (params) {
    return request.post(`${serveName}WATER_WX_ST_RNFL_FSel`, params)
  }
  // 行政分区降雨预报:日雨量
  function RainWeacontentDay(params) {
    return request.post(`${serveName}WATER_WX_ST_RNFL_FDay`, params)
  } 
  function QXSJRFFLTM(params){    
    return request.post(`${serveName}SWZZ_QXSJ_st_rnfl_f/selectByYBTMNew`, params)
  }
  function STRNFLFDay(params){    
    return request.post(`${serveName}SWZZ_QXSJ_st_rnfl_f/DATA_ST_RNFL_FDay`, params)
  }
  
  function STTIDERDATA(params){    
    return request.post(`${serveName}SWZZ_QXSJ_st_tide_ryb/findResult`, params)
  }
  function STTIDERDATAMAXTM(params){    
    return request.post(`${serveName}SWZZ_QXSJ_st_tide_ryb/findResultMaxTM`, params)
  }
  function windyweaterData(params){    
    return request.post(`${serveName}SWZZ_QXSJ_st_windyweater_r/findResult`, params)
  } 
  function formulabData(params){    
    return request.post(`${serveName}SWZZ_DATA_st_formula_b/findResult`, params)
  } 
export{
  TFPICWeacontent,
  RainWeacontent,
  RainWeacontentDay,
  QXSJRFFLTM,
  STRNFLFDay,
  STTIDERDATA,
  STTIDERDATAMAXTM,
  windyweaterData,
  formulabData
}