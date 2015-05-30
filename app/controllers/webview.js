var args = arguments[0] || {};
var url = args.url || "";

if(url != ""){
	$.surveyView.url = url;
	$.defaultMsgView.height = 0;
}else{
	$.surveyView.height = 0;
}