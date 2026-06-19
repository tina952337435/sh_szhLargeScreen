import request from "@/utils/request";
const serveName = ''
export default { 
  // 获取实时水位数据
  stWasRnew: (params) => {
    return request.post(`${serveName}WATER_ST_WAS_RNEW`, params)
  }
}
