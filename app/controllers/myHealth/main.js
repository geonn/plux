var args = arguments[0] || {};
var category = args.category || "";
var nav = require('navigation');
var hd = require('healthData');  
common.construct($);
hd.construct($);
hd.stepsMotion();

function resetGraph(){
	$.bmiView.setHeight("0");
	$.bloodPressureView.setHeight("0");
	$.heartRateView.setHeight("0");
	$.bodyTemperatureView.setHeight("0");
//	$.heightView.setHeight("0");
//	$.weightView.setHeight("0");
	$.cholestrolView.setHeight("0");

	$.bmiView.setTop("0");
	$.bloodPressureView.setTop("0");
	$.heartRateView.setTop("0");
	$.bodyTemperatureView.setTop("0");
//	$.heightView.setTop("0");
//	$.weightView.setTop("0");
	$.cholestrolView.setTop("0");
}

function filterList(e){
	 
	if(e.category == "measurement"){
		resetGraph();
		$.bmiView.setHeight(Ti.UI.SIZE);
//		$.heightView.setHeight(Ti.UI.SIZE);
//		$.weightView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);

		$.bmiView.setTop(10);
//		$.heightView.setTop(10);
//		$.weightView.setTop(10);
		$.cholestrolView.setTop(10);
		
		$.bmiView.show();
//		$.heightView.show();
//		$.weightView.show(); 
		$.cholestrolView.show(); 
	}else if(e.category == "vitals"){
		resetGraph();
		$.heartRateView.setHeight(Ti.UI.SIZE);
		$.bodyTemperatureView.setHeight(Ti.UI.SIZE);
		$.bloodPressureView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);
		
		$.heartRateView.setTop(10);
		$.bodyTemperatureView.setTop(10);
		$.bloodPressureView.setTop(10);
		$.cholestrolView.setTop(10);
		
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.bloodPressureView.show();
		$.cholestrolView.show();
	}else{
		$.stepsView.setHeight(Ti.UI.SIZE);
		$.bmiView.setHeight(Ti.UI.SIZE);
//		$.heightView.setHeight(Ti.UI.SIZE);
//		$.weightView.setHeight(Ti.UI.SIZE);
		$.heartRateView.setHeight(Ti.UI.SIZE);
		$.bodyTemperatureView.setHeight(Ti.UI.SIZE);
		$.bloodPressureView.setHeight(Ti.UI.SIZE);
		$.cholestrolView.setHeight(Ti.UI.SIZE);
		
		$.stepsView.setTop(10);
		$.bmiView.setTop(10);
//		$.heightView.setTop(10);
//		$.weightView.setTop(10);
		$.heartRateView.setTop(10);
		$.bodyTemperatureView.setTop(10);
		$.bloodPressureView.setTop(10);
		$.cholestrolView.setTop(10);
		
		$.stepsView.show();
//		$.weightView.show(); 
//		$.heightView.show(); 
		$.bmiView.show();
		$.bloodPressureView.show();
		$.heartRateView.show();
		$.bodyTemperatureView.show();
		$.cholestrolView.show();
	}
	
}

Ti.App.addEventListener('filterList',filterList);
Ti.App.addEventListener('populateDataById',populateDataById);

function populateDataById(e){
	hd.loadInfo(e.id,'','1');
}

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

//$.heightView.addEventListener('click',function(e){
//	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 5});
//});

//$.heightView.addEventListener('load',function(e){
//	var actualHeight = e.source.evalJS("document.height;");
//	e.source.height = parseInt(actualHeight);
//});

//$.weightView.addEventListener('click',function(e){
//	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 6});
//});

//$.weightWebView.addEventListener('load',function(e){
//	hd.loadInfo(6);
//	var actualHeight = e.source.evalJS("document.height;");
//	e.source.height = parseInt(actualHeight);
//});

$.cholestrolView.addEventListener('click',function(e){
	nav.navigateWithArgs("myHealth/healthDataSummary",{gType: 7});
});

$.cholestrolView.addEventListener('load',function(e){
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

$.myhealth.addEventListener("close", function(e){
	Ti.App.removeEventListener('filterList',filterList);
	Ti.App.removeEventListener('populateDataById',populateDataById);
});
