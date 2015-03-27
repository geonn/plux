var args = arguments[0] || {};
var nav = require('navigation');
var hd = require('healthData'); 

setTimeout(function(){	 
	hd.populateData();
},2000); 
			 
$.bmiView.addEventListener('click',function(e){
	nav.navigationWindow("healthDataBmi");
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigationWindow("healthDataBloodPressure");
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigationWindow("healthDataHeartRate");
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigationWindow("healthDataBodyTemperature");
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