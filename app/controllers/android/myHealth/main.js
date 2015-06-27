var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
common.showLoading();
hd.stepsMotion();
function resetGraph(){
	$.bmiView.setHeight("0");
	$.bloodPressureView.setHeight("0");
	$.heartRateView.setHeight("0");
	$.bodyTemperatureView.setHeight("0");
	$.heightView.setHeight("0");
	$.weightView.setHeight("0");
	$.bmiView.hide();
	$.bloodPressureView.hide();
	$.heartRateView.hide();
	$.bodyTemperatureView.hide();
	$.heightView.hide();
	$.weightView.hide();
}

function filterList(e){
	 
	if(e.category == "measurement"){
		resetGraph();
		$.bmiView.show(); 
		$.heightView.show();
		$.weightView.show(); 
	}else if(e.category == "vitals"){
		resetGraph();
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.bloodPressureView.show();
	}else{
		$.weightView.show(); 
		$.heightView.show(); 
		$.bmiView.show();
		$.bloodPressureView.show();
		$.heartRateView.show();
		$.bodyTemperatureView.show();
	}
}
Ti.App.addEventListener('filterList',filterList);
setTimeout(function(){ 
	hd.populateData();
	common.hideLoading();
},1000); 	
filterList({category: "all"}); 

$.bmiView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 1});
});

$.bmiView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	$.bmiView.height = parseInt(actualHeight);
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 2});
});

$.bloodPressureView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	$.bloodPressureView.height = parseInt(actualHeight);
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 3});
});

$.heartRateView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	$.heartRateView.height = parseInt(actualHeight);
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 4});
});

$.bodyTemperatureView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	$.bodyTemperatureView.height = parseInt(actualHeight);
});

$.heightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 5});
});

$.heightView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	$.heightView.height = parseInt(actualHeight);
});

$.weightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 6});
});

$.weightView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	$.weightView.height = parseInt(actualHeight);
});

$.moreHealth.addEventListener('click', function(e){
	var page = Alloy.createController('myHealth/_menu').getView();
	page.open();
	page.animate({
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 1,
		duration: 200
	});
});
