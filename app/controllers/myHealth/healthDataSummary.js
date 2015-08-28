var args = arguments[0] || {};
var gType = args.gType || 1; 
var hd = require('healthData');  
common.construct($);
//common.showLoading();

if(gType == "1"){
	var url = "/html/bmi.html";
}
if(gType == "2"){
	var url = "/html/bloodPressure.html";
}
if(gType == "3"){
	var url = "/html/heartRate.html";
}
if(gType == "4"){
	var url = "/html/bodyTemperature.html";
}
if(gType == "5"){
	var url = "/html/height.html";
} 
if(gType == "6"){
	var url = "/html/weight.html";
}
if(gType == "7"){
	var url = "/html/cholestrol.html";
}
if(gType == "10"){
	var url = "/html/steps.html"; 
}

var webview = $.UI.create("WebView", {
	id: "graphWebView",
	width: "100%",
	bottom: 10,
	url: url,
	height: Ti.UI.SIZE,
	backgroundColor:"#EBEBEB"
});

var line = $.UI.create("View", {
	height: 1,
	bottom: 0,
	backgroundColor:"#FC7474",
	width: "100%"
});
$.bmiView.add(webview);
$.bmiView.add(line);
//$.graphWebView.setUrl("http://google.com");
function loadBarData(e){ 
	if(e.index == "0"){
		loadGraph("month"); 
	}else{
		loadGraph("year"); 
	}  
} 

$.buttonbarData.addEventListener('click', loadBarData);  

/*
setTimeout(function(){	
	loadGraph("month");  
	common.hideLoading();
},900); 
*/
function loadGraph(dataPeriod){
	hd.loadGraphByType(gType,dataPeriod); 
}
	
function addData(){
	hd.navigateGraph(gType);
}
	
function editData(){ 
	nav.navigateWithArgs("myHealth/healthEditData",{gType: gType});
}	 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.dashboard); 
	}); 
}
