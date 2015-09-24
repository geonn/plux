var args = arguments[0] || {};
var appointmentModel = Alloy.createCollection('appointment');  
var appointmentList = appointmentModel.getAppointmentList({u_id: Ti.App.Properties.getString('u_id') }); 

init();

function init(){
	displayAppointmentList();
}

function displayAppointmentList(){ 
}

$.newRecord.addEventListener('click',function(){ 
	nav.navigateWithArgs("appointmentForm",{isEdit : 0});
});


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}