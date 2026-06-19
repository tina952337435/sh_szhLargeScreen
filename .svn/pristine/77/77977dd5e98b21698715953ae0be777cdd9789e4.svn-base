import $ from "jquery";

function GetJosnsToken(url, postParam, token,_async,callback) {
	// jQuery.support.cors = true;
	var strHrefUrl = url;
	$.ajax({
		url: strHrefUrl, //SPI
		data: postParam,
		type: "POST",
		async: _async,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			"Authorization": token,
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,POST",
			"Access-Control-Allow-Headers": "content-type"
		},
		success: function (ResultData) {
			if(callback!=null){
                callback(ResultData);
            }
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			 console.error(errorThrown);
		}
	});
}
export{
    GetJosnsToken
}