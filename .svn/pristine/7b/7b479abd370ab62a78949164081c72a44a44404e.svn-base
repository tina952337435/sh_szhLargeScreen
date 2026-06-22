import $ from "jquery";
function previewURLs(params){
    var strJson=[];
    var settings = {
        "url": "https://172.16.63.61/artemis-web/debug",
        "method": "POST",
        "timeout": 0,
        "headers": {
           "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
           "Content-Type": "application/json"
        },
        "data": JSON.stringify({
           "httpMethod": "POST",
           "path": "/api/video/v2/cameras/previewURLs",
           "headers": {},
           "query": {},
           "parameter": {},
           "body": {
              "cameraIndexCode": "32050507081314001829",
              "streamType": 0,
              "protocol": "ws",
              "transmode": 1,
              "expand": "transcode=0",
              "streamform": "ps"
           },
           "contentType": "application/json;charset=UTF-8",
           "mock": false,
           "appKey": "25358335",
           "appSecret": "4LxHA0ccd9S5QroeSdMp"
        }),
     }; 
     $.ajax(settings).done(function (response) { 
        strJson=response;
        return strJson;
     });

       
}
export{
    previewURLs
}