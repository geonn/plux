var args = arguments[0] || {};
var formType = args.formType || 1;
var lib_health = Alloy.createCollection('health'); 
var nav = require('navigation');

todayDate();
function todayDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	var hh = today.getHours();
	var min = today.getMinutes();
	
	if(dd<10) {
	    dd='0'+dd;
	} 
	
	if(mm<10) {
	    mm='0'+mm;
	} 
	
	
	if(hh<10) {
	    hh='0'+hh;
	} 
	
	if(min<10) {
	    min='0'+min;
	} 
	today = dd+'/'+mm+'/'+yyyy;
	var ampm = hh >= 12 ? 'PM' : 'AM';
	if(hh > 12) {
	    hh = hh-12;
	}
	
	$.date_value.text = today; 
	$.time_value.text = hh +":"+min + " "+ ampm;
}

function showDatePicker(e){
	$.datePicker.visible = "true";
	$.timePicker.visible = "false";
	$.amountTF.blur();
}

function showTimePicker(e){
	$.timePicker.visible = "true";
	$.datePicker.visible = "false";
	$.amountTF.blur();
}

function changeDate(e){
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    day = day.toString();
 
    if (day.length < 2) {
        day = '0' + day;
    }
  
    var month = pickerdate.getMonth();
    month = month + 1;
    month = month.toString();
 
    if (month.length < 2) {
        month = '0' + month;
    }
 
    var year = pickerdate.getFullYear(); 
 
    selDate = day + "/" + month + "/" + year; 
	
	$.date_value.text = selDate; 
}

function changeTime(e){
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    var hour = pickerdate.getHours();
  //  month = month + 1;
    hour = hour.toString();
 	
    if (hour.length < 2) {
        hour = '0' + hour;
    }
 	var ampm = hour >= 12 ? 'PM' : 'AM';
 	if(hour > 12) {
	    hour = hour-12;
	}
    var minute = pickerdate.getMinutes(); 
    selTime = hour + ":" + minute + " "+ampm; 
	$.time_value.text = selTime; 
}

$.amountTF.addEventListener('change',function(e){ 
	if(e.value != ""){
		$.saveButton.color = "#CE1D1C";
		$.saveButton.touchEnabled = "true";
	}else{
		$.saveButton.color = "#ADADAD";
		$.saveButton.touchEnabled = "false";
	}
});

function doSaveRecords(){
	var date = $.date_value.text; 
	var time = $.time_value.text; 
	var amount = $.amountTF.value;
	var s_date = date.split('/');
	var newDate = s_date[2] + "-"+s_date[1]+"-"+s_date[0];
	
	var s_time = time.split(' ');
	var newTime = s_time[0] ;
	if(s_time[1] == "PM"){
		hm = newTime.split(':');  
		newTime = (parseInt(hm[0]) + 12) + ":"+hm[1];
	}
	
	lib_health.addHealthData({
		date : newDate,
		time : newTime,
		amount : amount,
		type : formType
	}); 
	
	nav.navigationWindow("m_myHealth" );
}
