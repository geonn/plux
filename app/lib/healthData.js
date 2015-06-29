var mainView = null;
var lib_health = Alloy.createCollection('health'); 

var m_names = new Array("Jan", "Feb", "Mar", 
"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
"Oct", "Nov", "Dec");

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


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


exports.showBirthDatePicker = function(e){
	e.date.visible = "true";
	e.gender.visible = "false";
	e.bloodType.visible = "false";
};

exports.showGenderPicker = function(e){
	e.gender.visible = "true";
	e.bloodType.visible = "false";
	e.date.visible = "false";
};

exports.showBloodTypePicker = function(e){
	e.bloodType.visible = "true";
	e.gender.visible = "false";
	e.date.visible = "false";
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
	for(var i =1; i <= 6; i++){
	 	var info = loadInfo(i,"","1");
	}
	
	//steps
	info = loadInfo(10,"","1");
};

exports.loadInfo = function(gType){
	loadInfo(gType,"","");
};

function loadInfo(gType,dataPeriod,showDetailsLabel){
	var info = [];
	var info2 = [];
	var loadType= gType;
	if(loadType == "5" || loadType == "6"){
		loadType = "1";
	}
	if(dataPeriod == "year"){
		
		var info_details = lib_health.getHealthListByTypeInYear(loadType,gType); 
		 
		info_details.forEach(function(entry) {
			var rec = {};
			var convert = (entry.date).split('-'); 
			var month = parseInt(convert[1]) - 1;
			var newDate = m_names[month]+""+convert[0].substring(2, 4);
			rec['label'] = newDate;
			
			if(gType == "2"){
				rec['y'] = parseFloat(entry.value); 
				// For second records
				var rec2 = {};
				rec2['label'] = newDate;
				rec2['y'] = parseFloat(entry.value2);
				info2.push(rec2);
			}else if(gType == "6"){
				rec['y'] = parseFloat(entry.value);
			}else if(gType == "5"){
				rec['y'] = parseFloat(entry.value ) * 100;
			}else{
				rec['y'] = parseFloat(entry.value);
			}
			info.push(rec);
		});
	}else{ 
		if(gType == "10"){
			var info_details = lib_health.getSteps();  
			console.log(info_details);
		}else{
			var info_details = lib_health.getHealthListByType(loadType);  
		}
		
		info_details.reverse();	 
		var latestData;
		if(info_details.length > 0){
			info_details.forEach(function(entry) { 
				var rec = {};
				var convert = (entry.date).split('-'); 
				var month = parseInt(convert[1]) - 1;
				var newDate = convert[2]+" " +m_names[month]+""+convert[0].substring(2, 4);
				rec['label'] = newDate;
				
				if(gType == "2"){
					rec['y'] = parseFloat(entry.field1); 
					// For second records
					var rec2 = {};
					rec2['label'] = newDate;
					rec2['y'] = parseFloat(entry.field2);
					info2.push(rec2);
					latestData = parseFloat(entry.field2);
				}else if(gType == "6"){
					rec['y'] = parseFloat(entry.field1);
					latestData = parseFloat(entry.field1);
				}else if(gType == "5"){
					rec['y'] = parseFloat(entry.field2 ) * 100;
					latestData = parseFloat(entry.field2 ) * 100;
				}else{
					rec['y'] = parseFloat(entry.amount);
					latestData = entry.amount;
				}
				info.push(rec);
			});  
		}else{
			latestData = "";
		}
		
	} 
 
	if(gType == 1){ 
		Ti.App.fireEvent('app:bmiInfo',{ message:  info, dataPeriod:dataPeriod }); 
		if(showDetailsLabel == "1"){
			mainView.bmiDetailLabel.text = latestData|| "N/A";
		}
		
	}
	if(gType == 2){ 
		Ti.App.fireEvent('app:bloodPressureInfo',{ message:  info,message2:  info2, dataPeriod:dataPeriod });
		if(showDetailsLabel == "1"){
			mainView.bloodPressureDetailLabel.text = latestData ||  "N/A";
		}
	}
	if(gType == 3){
		Ti.App.fireEvent('app:heartRateInfo',{ message:  info, dataPeriod:dataPeriod });
		if(showDetailsLabel == "1"){
			mainView.heartRateDetailLabel.text = latestData ||  "N/A";
		}
	}
	if(gType == 4){
		Ti.App.fireEvent('app:bodyTemperatureInfo',{ message:  info, dataPeriod:dataPeriod });
		if(showDetailsLabel == "1"){
			mainView.bodyTempDetailLabel.text = latestData ||   "N/A";
		}
	}
	if(gType == 5){
		Ti.App.fireEvent('app:height',{ message:  info, dataPeriod:dataPeriod });
		if(showDetailsLabel == "1"){
			mainView.heightDetailLabel.text = latestData+" CM"|| "N/A";
		}
	}
	if(gType == 6){
		Ti.App.fireEvent('app:weight',{ message:  info, dataPeriod:dataPeriod });
		if(showDetailsLabel == "1"){
			mainView.weightDetailLabel.text = latestData +" KG"|| "N/A";
		}
	}
	if(gType == 10){
		Ti.App.fireEvent('app:steps',{ message:  info, dataPeriod:dataPeriod });
		if(latestData != ""){
			latestData = latestData  +" Steps";
		}
		if(showDetailsLabel == "1"){
			mainView.stepsDetailLabel.text = latestData || "N/A";
		}
	}
	return info;
}

exports.loadGraphByType = function(gType,dataPeriod){
	var info = loadInfo(gType,dataPeriod,""); 
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

exports.getAge = function(bday){
	return getAge(bday);
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
    
    var age = "";
    if(e.age == "1"){
    	age = "("+getAge(year+"-"+month+"-"+day)+")";  
    }
	
	mainView.date_value.text = selDate + age; 
};

exports.changeGender = function(e){ 
	mainView.gender_value.text = e.gender; 
};

exports.changeBloodType = function(e){ 
	mainView.bloodType_value.text = e.bloodType; 
};

exports.navigateGraph = function(gType){
	if(gType == "1"){
		nav.navigationWindow("myHealth/healthDataBmi");
	}
	if(gType == "2"){
		nav.navigationWindow("myHealth/healthDataBloodPressure");
	}
	if(gType == "3"){
		nav.navigationWindow("myHealth/healthDataHeartRate");
	}
	if(gType == "4"){
		nav.navigationWindow("myHealth/healthDataBodyTemperature");
	}
	if(gType == "5"){
		nav.navigationWindow("myHealth/healthDataBmi");
	}
	if(gType == "6"){
		nav.navigationWindow("myHealth/healthDataBmi");
	}
};

exports.stepsMotion = function(e){
	var info_details = lib_health.getHealthListByType(10);  
	 
	var gCurH = Ti.App.Properties.getString('curH') || "";
    var gStep = Ti.App.Properties.getString('step') || 0;
    //console.log(gCurH+" == "+gStep);
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