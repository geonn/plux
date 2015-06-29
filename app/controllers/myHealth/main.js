var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
common.showLoading();
hd.construct($);
hd.stepsMotion();
function resetGraph(){
	$.stepsView.setHeight("0");
	$.bmiView.setHeight("0");
	$.bloodPressureView.setHeight("0");
	$.heartRateView.setHeight("0");
	$.bodyTemperatureView.setHeight("0");
	$.heightView.setHeight("0");
	$.weightView.setHeight("0");
	$.stepsView.hide();
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
		$.stepsView.show();
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
}, 1500);
filterList({category: "all"}); 

$.stepsView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 10});
});

$.stepsView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});


$.bmiView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 1});
});

$.bmiView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 2});
});

$.bloodPressureView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 3});
});

$.heartRateView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 4});
});

$.bodyTemperatureView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.heightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 5});
});

$.heightView.addEventListener('load',function(e){
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
});

$.weightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 6});
});

$.weightWebView.addEventListener('load',function(e){
	hd.loadInfo(6);
	var actualHeight = e.source.evalJS("document.height;");
	e.source.height = parseInt(actualHeight);
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
