var mainView = null;
var lib_health = Alloy.createCollection('health'); 

var m_names = new Array("Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec");

exports.construct = function(mv){
	mainView = mv;
};

exports.showDatePicker = function(e){
	e.date.visible = "true";
	e.time.visible = "false";
};

exports.showTimePicker = function(e){
	e.date.visible = "false";
	e.time.visible = "true";
};

exports.disableSaveButton = function(e){
	mainView.saveButton.color = "#ADADAD";
	mainView.saveButton.touchEnabled = "false";
};

exports.enableSaveButton = function(e){
	mainView.saveButton.color = "#CE1D1C";
	mainView.saveButton.touchEnabled = "true";
};

exports.populateData = function(e){
	for(var i =1; i <= 4; i++){
	 	var info_details = lib_health.getHealthListByType(i); 
		var info = [];
		 
		info_details.forEach(function(entry) {
			var rec = {};
			var convert = (entry.date).split('-'); 
			var month = parseInt(convert[1]) - 1;
			var newDate = convert[2]+" " +m_names[month]+""+convert[0].substring(2, 4);
			rec['label'] = newDate;
			rec['y'] = parseFloat(entry.amount);
				
			info.push(rec);
		});  
		if(i == 1){
			Ti.App.fireEvent('app:bmiInfo',{ message:  info });
		}
		if(i == 2){
			Ti.App.fireEvent('app:bloodPressureInfo',{ message:  info });
		}
		if(i == 3){
			Ti.App.fireEvent('app:heartRateInfo',{ message:  info });
		}
		if(i == 4){
			Ti.App.fireEvent('app:bodyTemperatureInfo',{ message:  info });
		}
		
	}
};

exports.todayDate = function(){
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
	
	mainView.date_value.text = today; 
	mainView.time_value.text = hh +":"+min + " "+ ampm;
};


exports.changeDate= function(e){
	var pickerdate = e.date; 
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
	mainView.date_value.text = selDate; 
};

exports.changeTime = function(e){
	var pickerdate = e.time; 
    var day = pickerdate.getDate();
    var hour = pickerdate.getHours(); 
    hour = hour.toString();
    
 	var ampm = hour >= 12 ? 'PM' : 'AM';
 	if(hour > 12) {
	    hour = hour-12;
    }
    
    var minute = pickerdate.getMinutes(); 
    if (minute < 10) {
        minute = '0' + minute;
    }
    selTime = hour + ":" + minute + " "+ampm; 
	mainView.time_value.text = selTime; 
};