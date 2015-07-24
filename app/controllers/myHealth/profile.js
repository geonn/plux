var args = arguments[0] || {};
var formType = 1;
var lib_health = Alloy.createCollection('personalInfo'); 
var hd = require('healthData');
var myData = lib_health.getOwnerData();
hd.construct($); 

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();
var datePicker = Ti.UI.createPicker({
	  type: Ti.UI.PICKER_TYPE_DATE,
	  minDate: new Date(1930,0,1),
	  maxDate: new Date(yyyy,mm,dd),
	  id: "datePicker",
	  visible: false
});

//set data with value from db
function setupPersonalData(){
	$.selectorView.add(datePicker); 
	
	datePicker.addEventListener("change", changeDate);
	 
	var all_picker = $.selectorView.children;
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
		all_picker[0].add(gendata); 
	}
	all_picker[0].setSelectedRow(0,myGender,true); 	
	
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
		all_picker[1].add(blooddata); 
	}
	
	//Birthday 
	var myBDay = myData.birthDate;
	var sBday = myBDay.split("-");
	var showBday = "Not Set";
	if(sBday.length > 1){ 
		var myAge = hd.getAge(myBDay);
		showBday = sBday[2]+"/"+sBday[1]+"/"+sBday[0]+"("+myAge+")";
		all_picker[2].setValue(new Date(sBday[0],sBday[1],sBday[2]));
	} 
	//$.datePicker.setMinDate(new Date(1930,0,1));
 	//$.datePicker.setMaxDate(new Date(yyyy,mm,dd));
	
	$.bloodTypePicker.setSelectedRow(0,myBloodType,true); 
	
	$.date_value.text = showBday;
	$.gender_value.text =  myData.gender;
	$.bloodType_value.text =  myData.bloodType;
	$.tvrFieldDate.setTouchEnabled(false);
	$.tvrFieldGender.setTouchEnabled(false);
	$.tvrFieldBloodType.setTouchEnabled(false);
}

setupPersonalData(); 

var leftCancel  = Ti.UI.createButton({
		title : "Cancel",
		left: 0
});	
var leftNavView = Titanium.UI.createView();
var cancelEdit = function(){
	var all_picker = $.selectorView.children;
	
	resetTextColor(); 
	$.tvrFieldDate.setTouchEnabled(false);
	$.tvrFieldGender.setTouchEnabled(false);
	$.tvrFieldBloodType.setTouchEnabled(false); 
	$.editButton.visible ="true";
	$.saveButton.visible ="false";
	for (var i=0; i < all_picker.length; i++) {
	  all_picker[i].hide();
	};
	//$.datePicker.hide();
	//$.genderPicker.hide();
	//$.bloodTypePicker.hide();
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
	/*$.datePicker.show();
	$.genderPicker.show();
	$.bloodTypePicker.show();*/
	$.healthProfileWin.leftNavButton = leftNavView; 
	var all_picker = $.selectorView.children;
	if(OS_IOS){
		all_picker[2].show();
	}
	
	showDatePicker();
	for (var i=0; i < all_picker.length; i++) {
	  //all_picker[i].show();
	};
}

function showDatePicker(e){ 
	var all_picker = $.selectorView.children;
	var isEnabled = $.tvrFieldDate.getTouchEnabled();
	if(isEnabled){
		if(OS_ANDROID){
			myData = lib_health.getOwnerData();
			var myBDay = myData.birthDate;
			var sBday = myBDay.split("-"); 
			
			datePicker.showDatePickerDialog({
			  value: new Date(sBday[0],parseInt(sBday[1]) - 1, parseInt(sBday[2]) ),
			  callback: function(e) {
			    if (e.cancel) { 
			    } else {
			      changeDate(e);
			    }
			  }
			});
		}else{ 
			hd.showBirthDatePicker({date: all_picker[2],gender: all_picker[0], bloodType: all_picker[1]});  
		}
		resetTextColor();
		$.date_value.color = "#ff0000"; 
	}
	
}

function resetTextColor(){
	$.date_value.color = "#757575";
	$.gender_value.color = "#757575";
	$.bloodType_value.color = "#757575";
}

function showGenderPicker(e){ 
	var all_picker = $.selectorView.children;
	var isEnabled = $.tvrFieldGender.getTouchEnabled();
	if(isEnabled){
		resetTextColor();
		$.gender_value.color = "#ff0000";
		hd.showGenderPicker({gender: all_picker[0], bloodType: all_picker[1],date: all_picker[2]});  
	}
} 

function showBloodTypePicker(e){
	var all_picker = $.selectorView.children;
	var isEnabled = $.tvrFieldBloodType.getTouchEnabled();
	if(isEnabled){
		resetTextColor();
		$.bloodType_value.color = "#ff0000";
		hd.showBloodTypePicker({bloodType: all_picker[1], gender: all_picker[0],date: all_picker[2]}); 
		 
	}
	
}

function changeDate(e){ 
	console.log("changeDate : "+e.value);
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
	
	var debug = JSON.stringify($.date_value);
	 console.log("newDate :" +debug);
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
 

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.healthProfileWin); 
	});
}