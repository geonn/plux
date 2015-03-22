var args = arguments[0] || {};
var url = args.url || "";

if(url != ""){
	$.surveyView.url = url;
}else{
	$.surveyView.height = 0;
}
