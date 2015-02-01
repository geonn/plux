var args = arguments[0] || {};
var nav = require('navigation');
var lib_health = Alloy.createCollection('health'); 
//retrieveGraphInfo();
//function retrieveGraphInfo(){
	var bmi_details = lib_health.getHealthListByType(1);

	var bmi = [];
	bmi_details.forEach(function(entry) {
		var rec = {};
		rec['label'] = entry.date;
		rec['y'] = parseFloat(entry.amount);
		
		bmi.push(rec);
	}); 
	
	
//}

setTimeout(function(){
	
	//Ti.App.fireEvent('app:fromTitanium', { message: 'event fired from Titanium, handled in WebView' });
	Ti.App.fireEvent('app:bmiInfo',{
		message:  bmi
	});
},2000);

 

			 
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