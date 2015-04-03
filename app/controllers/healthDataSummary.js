var args = arguments[0] || {};
var gType = args.gType || 1; 
var hd = require('healthData');  
common.construct($);
common.showLoading();
if(gType == "1"){
		$.graphWebView.setUrl("/html/bmi.html");
	}
	if(gType == "2"){
		$.graphWebView.setUrl("/html/bloodPressure.html");
	}
	if(gType == "3"){
		$.graphWebView.setUrl("/html/heartRate.html");
	}
	if(gType == "4"){
		$.graphWebView.setUrl("/html/bodyTemperature.html");
	}
	
setTimeout(function(){	
	loadGraph(); 
	common.hideLoading();
},900); 

function loadGraph(){
	hd.loadGraphByType(gType); 
}
	
function addData(){
	hd.navigateGraph(gType);
}
	
function editData(){ 
	nav.navigateWithArgs("healthEditData",{gType: gType});
}	 
