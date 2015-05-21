var args = arguments[0] || {};
var formType = 1;
var lib_health = Alloy.createCollection('personalInfo'); 
var hd = require('healthData');
var myData = lib_health.getOwnerData();
hd.construct($); 
function hideKeyboard(){
	//$.field1.blur();
	//$.field2.blur();
}
 
var leftCancel  = Ti.UI.createButton({
		title : "Cancel",
		left: 0
});	
var leftNavView = Titanium.UI.createView();
var cancelEdit = function(){
	resetTextColor(); 
	$.tvrFieldDate.setTouchEnabled(false);
	$.tvrFieldGender.setTouchEnabled(false);
	$.tvrFieldBloodType.setTouchEnabled(false); 
	$.editButton.visible ="true";
	$.saveButton.visible ="false";
	$.datePicker.hide();
	$.genderPicker.hide();
	$.bloodTypePicker.hide();
	leftNavView.removeEventListener('click',cancelEdit);	 
	$.healthProfileWin.leftNavButton = null; 
};

function doEditRecords(e){
	$.date_value.color = "#ff0000";
	$.tvrFieldDate.setTouchEnabled(true);
	$.tvrFieldGender.setTouchEnabled(true);
	$.tvrFieldBloodType.setTouchEnabled(true);
	leftNavView.add(leftCancel); 
	leftNavView.addEventListener('click',cancelEdit);
	$.editButton.visible ="false";
	$.saveButton.visible ="true"; 
	$.datePicker.show();
	$.genderPicker.show();
	$.bloodTypePicker.show();
	$.healthProfileWin.leftNavButton = leftNavView; 
}
 

function showDatePicker(e){ 
	var isEnabled = $.tvrFieldDate.getTouchEnabled();
	if(isEnabled){
		resetTextColor();
		$.date_value.color = "#ff0000";
		hd.showBirthDatePicker({date: $.datePicker,gender: $.genderPicker, bloodType: $.bloodTypePicker}); 
		hideKeyboard();
	}
	
}

function resetTextColor(){
	$.date_value.color = "#757575";
	$.gender_value.color = "#757575";
	$.bloodType_value.color = "#757575";
}
function showGenderPicker(e){ 
	var isEnabled = $.tvrFieldGender.getTouchEnabled();
	if(isEnabled){
		resetTextColor();
		$.gender_value.color = "#ff0000";
		hd.showGenderPicker({gender: $.genderPicker, bloodType: $.bloodTypePicker,date: $.datePicker}); 
		hideKeyboard();
	}
} 

function showBloodTypePicker(e){
	var isEnabled = $.tvrFieldBloodType.getTouchEnabled();
	if(isEnabled){
		resetTextColor();
		$.bloodType_value.color = "#ff0000";
		hd.showBloodTypePicker({bloodType: $.bloodTypePicker, gender: $.genderPicker,date: $.datePicker}); 
		hideKeyboard();
	}
	
}

function changeDate(e){ 
	//console.log
	hd.changeDate({date: e.value, age : 1});
}

function changeGender(e){ 
	hd.changeGender({gender: e.selectedValue[0]}); 
}

function changeBloodType(e){
	hd.changeBloodType({bloodType: e.selectedValue[0]}); 
}
 
function doSaveRecords(){
	var birthdate = $.date_value.text; 
	var gender    = $.gender_value.text; 
	var bloodType = $.bloodType_value.text;  
	 
	if(birthdate != "Not Set"){ 
		var bdate =birthdate.split('(');
		var s_date  = bdate[0].split('/');
		var newDate = s_date[2] + "-"+s_date[1]+"-"+s_date[0];   
	}
	 
	lib_health.addPersonalData({
		id : myData.id,
		name : "",
		gender : gender,
		bloodType : bloodType,
		birthDate : newDate,
		 
	});  
	// nav.navigationWindow("myHealth" );
	common.createAlert('Updates Profile', 'Your personal information are saved!');
	cancelEdit(); 
	//nav.closeWindow($.healthBmiWin);
}
 
//set data with value from db
function setupPersonalData(){
	if(myData.length == 0){
		myData = lib_health.getOwnerData();
		setupPersonalData();
		return false;
	}
	
	//Set Gender
	var genderValue =["Not Set", "Female", "Male"];
	var myGender;
	for(var i = 0 ; i < genderValue.length; i++){
		if(genderValue[i] == myData.gender)  {
			myGender = i;
		}
		
		var genderData = genderValue[i]; 
		var gendata = Ti.UI.createPickerRow({
			title:genderData.toString() 
		}); 
		$.genderPicker.add(gendata); 
	}
	$.genderPicker.setSelectedRow(0,myGender,true); 	
	
	//Set BloodType 
	var bloodTypeValue =["Not Set", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
	var myBloodType;
	for(var i = 0 ; i < bloodTypeValue.length; i++){
		if(bloodTypeValue[i] == myData.bloodType)  {
			myBloodType = i;
		}
		
		var bloodTypeData = bloodTypeValue[i]; 
		var blooddata = Ti.UI.createPickerRow({
			title:bloodTypeData.toString() 
		}); 
		$.bloodTypePicker.add(blooddata); 
	}
	
	//Birthday
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); 
	var yyyy = today.getFullYear();
	var myBDay = myData.birthDate;
	var sBday = myBDay.split("-");
	var showBday = "Not Set";
	if(sBday.length > 1){ 
		var myAge = hd.getAge(myBDay);
		showBday = sBday[2]+"/"+sBday[1]+"/"+sBday[0]+"("+myAge+")";
		$.datePicker.setValue(new Date(sBday[0],sBday[1],sBday[2]));
	} 
	$.datePicker.setMinDate(new Date(1930,0,1));
 	$.datePicker.setMaxDate(new Date(yyyy,mm,dd));
	$.bloodTypePicker.setSelectedRow(0,myBloodType,true); 
	
	$.date_value.text = showBday;
	$.gender_value.text =  myData.gender;
	$.bloodType_value.text =  myData.bloodType;
	$.tvrFieldDate.setTouchEnabled(false);
	$.tvrFieldGender.setTouchEnabled(false);
	$.tvrFieldBloodType.setTouchEnabled(false);
}

setupPersonalData();