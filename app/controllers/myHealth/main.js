var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
common.showLoading();
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
		$.bmiView.setHeight("40%"); 
		$.bmiView.show(); 
		$.heightView.setHeight("40%"); 
		$.heightView.show(); 
		$.weightView.setHeight("40%"); 
		$.weightView.show(); 
	}else if(e.category == "vitals"){
		resetGraph();
		$.heartRateView.setHeight("40%");
		$.bodyTemperatureView.setHeight("40%");
		$.bloodPressureView.setHeight("40%");
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.bloodPressureView.show();
	}else{
		$.stepsView.setHeight("40%");
		$.bmiView.setHeight("40%");
		$.bloodPressureView.setHeight("40%");
		$.heartRateView.setHeight("40%");
		$.bodyTemperatureView.setHeight("40%");
		$.heightView.setHeight("40%");  
		$.weightView.setHeight("40%"); 
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
},800); 
filterList({category: "all"}); 

$.stepsView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 10});
});

$.bmiView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 1});
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 2});
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 3});
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 4});
});

$.heightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 5});
});
$.weightView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 6});
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