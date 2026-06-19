import request from "@/utils/request";
const serveName = '';
// 获取当前主题
export default {
  // 实时降雨前十站点
  stPptnRainsumtable: (params) => {
    return request.post(`${serveName}ST_PPTN_RAINSUMTABLE`, params)
  },
  //总览：行政分区降雨量
  stPptnRainDay: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/queryTREEDRPList`, params)
  },
  // 总览：水位监测
  stPptnWater: (params) => {
    return request.post(`${serveName}GetWaterViewNew/queryBySWNew`, params)
  },
  // 总览：雨情统计、 雨情：累计降雨排名
  stPptnRain: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/queryDRPList`, params)
  },
  // 总览：水位过程线
  stPptnWaterLine: (params) => {
    return request.post(`${serveName}GetWaterViewNew/selectListByHis`, params)
  },
  // 总览：进出水量
  stPptnSLLine: (params) => {
    // return request.post(`${serveName}`, params)
  },
  // 雨情：小时雨强排名
  stPptnYQHourTop: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_PPTN_R/queryMAXHOURDRPList`, params)
  },
  // 雨情：单站小时降雨
  stPptnDanZhanHour: (params) => {
    return request.post(`${serveName}/ST_PPTN_Water/selectListIsHouse`, params)
  },
  // 雨情：单站日降雨
  stPptnDanZhanDay: (params) => {
    return request.post(`${serveName}/ST_PPTN_Water/selectListIsDay`, params)
  },
  // 雨情：地图
  stPptnMapRain: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_PPTN_R/queryDRPList`, params)
  },
  // 雨情：地图单站
  stPptnDanZhan: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_PPTN_R/selectListDanZhan`, params)
  },
  // 雨情：地图单站
  queryDRPDANZHANList: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_PPTN_R/queryDRPDANZHANList`, params)
  },
  // 水情：代表站水位排序
  stPptnSQSWtable: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_PPTN_R/selectListBySen`, params)
  },
  // 水情：河道过程线
  stPptnSQRiver: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/selectListNewAndLength`, params)
  },
  // 工情：圩区水位
  stPptnGQSW: (params) => {
    return request.post(`${serveName}/WQBASE/selectList`, params)
  },
  // 工情：圩区纳雨能力
  stPptnGQWQ: (params) => {
    return request.post(`${serveName}/WQBASE/selectWQBaseList`, params)
  },
  // 工情：圩区工程运行能力
  stPptnGQGC: (params) => {
    return request.post(`${serveName}/WQBASE/selectListGQAll`, params)
  },
  // 工情：边界水量
  stPptnGQBJSL: (params) => {
    return request.post(`${serveName}/ST_FLOW_R/selectSlAndYsl`, params)
  },
  // 工程统计
  stPptnGQTJ: (params) => {
    return request.post(`${serveName}/ST_GATE_RNEW/queryTreeList`, params)
  },
  // 工情：工情监测(new)
  stPptnGQTable: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_GATE_RNEW/queryList`, params)
  },
  // 工情：单站过程(new)
  stPptnGQDanZhan: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_GATE_RNEW/queryDANZHANList`, params)
  },
  // 工情：流量
  stPptnGQLL: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/queryBySWQNew`, params)
  },
  // 工情：流量
  stPptnGQLLDanZhan: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/queryBySWQDanZhan`, params)
  },
  // 工情：逐日水量
  stPptnGQSL: (params) => {
    return request.post(`${serveName}/ST_WDPSTAT_R/selectWdpstatRBXList`, params)
  },
  // 工情：合计水量
  stPptnGQSLAll: (params) => {
    return request.post(`${serveName}/ST_WDPSTAT_R/selectTreeListBy`, params)
  },
  // 工情：闸站基础信息
  stPptnGQWagaBase: (params) => {
    return request.post(`${serveName}/ST_STBPRP_B/selectWagaBase`, params)
  },
  // 工情：泵站基础信息
  stPptnGQAttPustBase: (params) => {
    return request.post(`${serveName}/ST_STBPRP_B/selectAttPustBase`, params)
  },
  // 水量：水量月报
  stPptnSLTable: (params) => {
    return request.post(`${serveName}/sysxqjb/selectList`, params)
  },
  // 自定义配置
  treeSel: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_STBPRP_B_TREE/findResult`, params)
  },
  // 自定义配置
  QuSel: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_STBPRP_B_QU/findResult`, params)
  },
  // 自定义配置
  QuSelDuo: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_STBPRP_B_QU/findResultdDuo`, params)
  },
  //城市内涝：管网
  att_shaftdatanewqueryList: (params) => {
    return request.post(`${serveName}/ATT_SHAFT_BASE/querytreeList`, params)
  },
  //城市内涝：管网过程
  att_shaftdatagcqueryList: (params) => {
    return request.post(`${serveName}/ATT_SHAFT_BASE/queryList`, params)
  },
  //城市内涝：下立交
  att_wpnewdataqueryList: (params) => {
    return request.post(`${serveName}/ATT_WP_BASE/querytreeList`, params)
  },
  //城市内涝：下立交过程
  att_wpnewdatagcqueryList: (params) => {
    return request.post(`${serveName}/ATT_WP_BASE/queryList`, params)
  },
  //水质最新数据
  att_WaterQualityQueryList: (params) => {
    return request.post(`${serveName}/ATT_EMSC_BASE/querytreeList`, params)
  },
  //水质过程数据
  att_WaterQualityGCQueryList: (params) => {
    return request.post(`${serveName}/ATT_EMSC_BASE/queryList`, params)
  },
  // 导出
  ExportExcel: (params) => {
    return request.post(`${serveName}/excel/excelDownloadExport`, params)
  },
  // 下载文件
  download: (params) => {
    return request.get(`${serveName}/excel/download`, params)
  },
  // 排涝车辆
  CarSelectList: (params) => {
    return request.post(`${serveName}/CAR_BASE_INFO/selectList`, params)
  },
  // 排涝车辆最新数据
  CarQuerytreeList: (params) => {
    return request.post(`${serveName}/CAR_BASE_INFO/querytreeList`, params)
  },
  // 排涝车辆过程数据
  CarQueryList: (params) => {
    return request.post(`${serveName}/CAR_BASE_INFO/queryList`, params)
  },
  // 短信发送
  MessageSMSSend: (params) => {
    return request.post(`${serveName}/smspool/SMSSend`, params)
  },
  // 短信列表
  MessageSelectList: (params) => {
    return request.post(`${serveName}/smspool/selectList `, params)
  },
  // 通讯录
  Addressbook: (params) => {
    return request.post(`${serveName}/addressbook/selectList `, params)
  },
  //抢险主表
  DangerSelectList: (params) => {
    return request.post(`${serveName}/danger/findResult `, params)
  },
  //根据编号获取抢险过程、图片、流程
  DangerQueryList: (params) => {
    return request.post(`${serveName}/danger/queryList `, params)
  },
  //响应预警信息
  emergencyearlywarning: (params) => {
    return request.post(`${serveName}/SWZZ_MODE_BDMS_PREDICT/emergencyearlywarning `, params)
  },
  // 应急响应查询
  WarningFindResult: (params) => {
    return request.post(`${serveName}/TH_EMERGENCY_JILU/findResult `, params)
  },
  // 应急响应新增
  WarningAdd: (params) => {
    return request.post(`${serveName}/TH_EMERGENCY_JILU/add `, params)
  },
  // 历史响应查询更新
  WarningModify: (params) => {
    return request.post(`${serveName}/TH_EMERGENCY_JILU/modify `, params)
  },
  // 应急响应预案
  WarningSZFindResult: (params) => {
    return request.post(`${serveName}/TH_EMERGENCY_SZ/findResult `, params)
  },
  //响应报告
  WarningBaoGao: (params) => {
    return request.post(`${serveName}/WD_LISTTABLE/exportTemplateToWord`, params)
  },
  GateVideoList: (params) => {
    return request.post(`${serveName}/ST_GATEVIDEO_B/selectList`, params);
  },
  // 排水:雨中巡查
  RcyhdailySelectList: (params) => {
    return request.post(`${serveName}/rcyhdaily/selectList`, params);
  },
  // 排水:AI识别
  HydropsSelectList: (params) => {
    return request.post(`${serveName}/hydrops/selectList`, params);
  },
  // 排水:积水点情况
  MyVideoSiteSelectListhydrops: (params) => {
    return request.post(`${serveName}/MyVideoSite/selectListhydrops`, params);
  },
  // 排水:积水记录
  HydropsFindResult: (params) => {
    return request.post(`${serveName}/hydrops/findResult`, params);
  },
  // 圩区:圩区关联工程
  WQFindResult: (params) => {
    return request.post(`${serveName}/wqbasegc/selectList`, params);
  },
  // 圩区:骨干河道
  hdBaseBRiverResult: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_HD_BASE_B/findResult`, params);
  },
  // 圩区:骨干单条河道信息
  hdBaseBRiverPathResult: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_HD_BASE_B/findResultPathList`, params);
  },
  //圩区调度规则
  wqbaseddgz: (params) => {
    return request.post(`${serveName}/wqbasegz/selectList`, params);
  },
  //（预报）分析对比调度规则
  wqbaseddgzFindResult: (params) => {
    return request.post(`${serveName}/wqbasegz/findResult`, params);
  },
  //最新数据
  stStbprpBStcdFindResult: (params) => {
    return request.post(`${serveName}/ST_STBPRP_B_STCD/findResult`, params);
  },
  // 污水井实时数据
  WS_3HSCADASlectList: (params) => {
    return request.post(`${serveName}/WS_3HSCB/queryList`, params);
  },
  // 污水井基础数据
  WS_3HSCBSlectList: (params) => {
    return request.post(`${serveName}/WS_3HSCB/selectList`, params);
  },
  // 沿江水量（报汛）望虞河
  SelectWdpstatRBXList: (params) => {
    return request.post(`${serveName}/ST_WDPSTAT_R/selectWdpstatRBXList`, params);
  },
  // 河道关联工程
  Wqbaserivergc: (params) => {
    return request.post(`${serveName}/wqbaserivergc/selectList`, params);
  },
  //值班记录
  DUTYPLANSel: (params) => {
    return request.post(`${serveName}/DUTYPLAN/selectList`, params);
  },
  //值班记录
  QueryMAXDRPList: (params) => {
    return request.post(`${serveName}/ST_PPTN_R/queryMAXDRPList`, params);
  },
  //多站水位对比
  DuoSel: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/queryBySWDuoZhan`, params);
  },
  querySUMPSL: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/querySUMPSL`, params)
  },
  querySUMDAYPSL: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/querySUMDAYPSL`, params)
  },
  querySUMPSLDan: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/querySUMPSLDan`, params)
  },
  querySUMDAYPSLDan: (params) => {
    return request.post(`${serveName}/GetWaterViewNew/querySUMDAYPSLDan`, params)
  },
  // 根据经纬度获取到仓库、队伍、安置点
  FZCbqueryList: (params) => {
    return request.post(`${serveName}/FZ_CB/queryList`, params)
  },
  // 积水点管理
  PSBASESelectList: (params) => {
    return request.post(`${serveName}/PS_BASE_INFO/selectList`, params)
  },
  // 泵车基础信息
  CarBASESelectList: (params) => {
    return request.post(`${serveName}/CARBASE/selectList`, params)
  },
  // 泵车基础信息
  XLJBASESelectList: (params) => {
    return request.post(`${serveName}/xljbase/selectList`, params)
  },
  //获取任务信息
  getFXFTTaskInfoLimit: (params) => {
    return request.post(`${serveName}/api55/swcc/getFXFTTaskInfoLimit`, params)
  },
  //防指成员获取各自填报信息
  getFXFTShowInfoNew: (params) => {
    return request.post(`${serveName}/api55/swcc/getFXFTShowInfoNew`, params)
  },
  //获取水务局前置任务内容
  getxcBaseList: (params) => {
    return request.post(`${serveName}/XC_BASE/selectList`, params)
  },
  getsysEmployeeList: (params) => {
    return request.post(`${serveName}sysEmployee/selectList`, params)
  },
  getinoutwdpstatdayList: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_WDPSTAT_R/INOUTWDPSTATDAYSel`, params)
  },
  getFzTypeList: (params) => {
    return request.post(`${serveName}FZ_TYPE/selectList`, params)
  },
  getPgFangSel: (params) => {
    return request.post(`${serveName}PG_FANG/selectList`, params)
  },
  getPgFangInsertOne: (params) => {
    return request.post(`${serveName}PG_FANG/insertOne`, params)
  },
  getPgFangdeleteOne: (params) => {
    return request.post(`${serveName}PG_FANG/deleteOne`, params)
  },
  // 巡查前置：统计板块信息
  getXCBase: (params) => {
    return request.post(`${serveName}XC_BASE/selectList`, params)
  },
  getfangxunkanghanSel: (params) => {
    return request.post(`${serveName}GetWaterViewNew/fangxunkanghan`, params)
  },
  // 调度指令
  DDU_DIAODU: (params) => {
    return request.post(`${serveName}/DDU_DIAODU/DDU_DIAODULIST`, params)
  },
  // 积水点照片
  XLJDATASelectList: (params) => {
    return request.post(`${serveName}/XLJDATA/selectList`, params)
  },
  // 圩区方案集查询
  BDMS_PREDICTWQList: (params) => {
    return request.post(`${serveName}/DD_SOLUTIONWQ/selectList`, params)
  },
  BDMS_PREDICTWQSel: (params) => {
    return request.post(`${serveName}/DD_SOLUTIONWQ/findResult`, params)
  },
  // 圩区方案集新增
  BDMS_PREDICTWQAdd: (params) => {
    return request.post(`${serveName}/DD_SOLUTIONWQ/add`, params)
  },
  // 圩区方案集修改
  BDMS_PREDICTWQModify: (params) => {
    return request.post(`${serveName}/DD_SOLUTIONWQ/modify`, params)
  },
  // 圩区雨量数据结果查询
  BDMS_PREDICTWQ: (params) => {
    return request.post(`${serveName}/BDMS_PREDICTWQ/findResult`, params)
  },
  // 圩区方案集查询（分区降雨）
  SLFQ_SOLUTION: (params) => {
    return request.post(`${serveName}/SLFQ_SOLUTION/findResult`, params)
  },
  //积水点识别结果
  getAllSiteDealMessage: (params) => {
    return request.get(`${serveName}/jsd/openApi/getAllSiteDealMessage`, params)
  },
  //面雨量
  getRainDashboard: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_AREARAIN_H/getRainDashboard`, params)
  },
  getGLSTCD: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_GL_STCD/findResult`, params)
  },
  //上海气象台分区预报降雨量
  getSWZZSHQXJY: (params) => {
    return request.post(`${serveName}SWZZ_QXSJ_tz_watersheddata/findResultFirst`, params)
  },
  //预测水位
  getMODELSINGRESULT: (params) => {
    return request.post(`${serveName}SWZZ_MODE_BDMS_PREDICT/WJ_MODELSINGRESULT`, params)
  },
  //预报水位过程
  loadModeYBSHUIWEI: (params) => {
    return request.post(`${serveName}SWZZ_MODE_ES_ZHANDIANDATA/YBSHUIWEI`, params)
  },
  // 总览：实测实线，预报虚线
  stPptnWaterLineAndYB: (params) => {
    return request.post(`${serveName}GetWaterViewNew/selectListByHisYB`, params)
  },
  //流量过程
  stFlowLine: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_FLOW_R/selectHis`, params)
  },
  //流量监测
  stFlowJC: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_FLOW_R/queryByLLNew`, params)
  },
  //过去VS未来
  selectListHourlyAreaYB: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/selectListHourlyAreaYB`, params)
  },
  //风速风向
  selectListWind: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_WDWV_R/selectNew`, params)
  },
  stwdwvrFengLine: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_WDWV_R/selectHis`, params)
  },
  //5分钟，小时，日水雨情  
  querySWDRPDANZHANList: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/querySWDRPDANZHANList`, params)
  },
  // 工情：水利片统计
  stPptnGQSLPTJ: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_GATE_RNEW/queryTreeList`, params)
  },
  //区域最大降雨量点
  stPptnRainMaxDay: (params) => {
    return request.post(`${serveName}/SWZZ_RTSQ_ST_PPTN_R/queryTREEDRPMaxList`, params)    
  },
  //面雨量小时过程
  selectListHourlyArea: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/selectListHourlyArea`, params)
  },
  //查询长序列的雨量:ST_PSTAT_R    降水量统计表  
  findResultDayArea: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PSTAT_R/findResultDayArea`, params)
  },
  //面雨量时段统计
  getRainDashboardr: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/getRainDashboard`, params)
  }, 
  //代表站场次降雨排序
  getEventRain32: (params) => {
    return request.post(`${serveName}SWZZ_RTSQ_ST_PPTN_R/getEventRain32`, params)
  },   
}

