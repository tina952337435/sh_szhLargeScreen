import request from "@/utils/requestHuishui";
const serveName = '';
// 获取当前主题
export default {
  //获取全流域结果
  modeGetResultAllModelByTime: (params) => {
    params.api="GetResultAllModelByTime";
    params.version="1";
    return request.post(`${serveName}`, params)
  },
    
} 
