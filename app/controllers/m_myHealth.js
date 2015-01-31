var args = arguments[0] || {};
var nav = require('navigation');
$.bmiView.addEventListener('click',function(e){
	nav.navigationWindow("healthData","","",{formType: 1});
});

$.bloodPressureView.addEventListener('click',function(e){
	nav.navigationWindow("healthData","","",{formType: 2});
});

$.heartRateView.addEventListener('click',function(e){
	nav.navigationWindow("healthData","","",{formType: 3});
});

$.bodyTemperatureView.addEventListener('click',function(e){
	nav.navigationWindow("healthData","","",{formType: 4});
});