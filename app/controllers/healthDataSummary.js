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
	if(gType == "1"){
		nav.navigationWindow("healthDataBmi");
	}
	if(gType == "2"){
		nav.navigationWindow("healthDataBloodPressure");
	}
	if(gType == "3"){
		nav.navigationWindow("healthDataHeartRate");
	}
	if(gType == "4"){
		nav.navigationWindow("healthDataBodyTemperature");
	}
}
	
function editData(){ 
	nav.navigateWithArgs("healthEditData",{gType: gType});
}	 
