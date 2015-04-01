var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
common.showLoading();

function resetGraph(){
	$.bmiView.setHeight("0");
	$.bloodPressureView.setHeight("0");
	$.heartRateView.setHeight("0");
	$.bodyTemperatureView.setHeight("0");
	$.bmiView.hide();
	$.bloodPressureView.hide();
	$.heartRateView.hide();
	$.bodyTemperatureView.hide();
}
function filterList(e){
	 
	if(e.category == "measurement"){
		resetGraph();
		$.bmiView.setHeight("40%"); 
		$.bmiView.show(); 
	}else if(e.category == "vitals"){
		resetGraph();
		$.heartRateView.setHeight("40%");
		$.bodyTemperatureView.setHeight("40%");
		$.bloodPressureView.setHeight("40%");
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.bloodPressureView.show();
	}else{
		$.bmiView.setHeight("40%");
		$.bloodPressureView.setHeight("40%");
		$.heartRateView.setHeight("40%");
		$.bodyTemperatureView.setHeight("40%");
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
},900); 
filterList({category: "all"}); 

$.bmiView.addEventListener('click',function(e){
	nav.navigateWithArgs("healthDataSummary",{gType: 1});
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigateWithArgs("healthDataSummary",{gType: 2});
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigateWithArgs("healthDataSummary",{gType: 3});
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigateWithArgs("healthDataSummary",{gType: 4});
});

$.moreHealth.addEventListener('click', function(e){
	var page = Alloy.createController('healthMenu').getView();
	page.open();
	page.animate({
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
		opacity: 1,
		duration: 200
	});
});