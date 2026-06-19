import request from "@/utils/requestArcgisonline";
const serveName = '';
// 获取当前主题
export default {
  // 加载边界
  GeometryServerProject: (params,method) => {
    var outSR = {
      "wkt": "PROJCS[\"shanghai project beijing54\",GEOGCS[\"GCS_Beijing_1954\",DATUM[\"D_Beijing_1954\",SPHEROID[\"Krasovsky_1940\",6378245.0,298.3]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Gauss_Kruger\"],PARAMETER[\"False_Easting\",8.0],PARAMETER[\"False_Northing\",-3457143.04],PARAMETER[\"Central_Meridian\",121.4671519444444],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",0.0],UNIT[\"Meter\",1.0]]"
    };
    params["inSR"]= 4326,
    params["outSR"]=JSON.stringify(outSR),
    params["transformForward"]=true,
    params["vertical"]=false,
    params["f"]= "pjson";
    return request.post(`${serveName}/`, params)
  }
} 
