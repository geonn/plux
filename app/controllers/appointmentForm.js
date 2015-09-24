var args = arguments[0] || {};
var userModel = Alloy.createCollection('users_plux'); 
var appointmentModel = Alloy.createCollection('appointment'); 
var user = userModel.getUserById(Ti.App.Properties.getString('u_id'));
var selectedClinic; 
$.patient_name.text = user.fullname;
$.patient_email.text = user.email;

var dpView = Titanium.UI.createView({
		layout: "vertical",
		height: 200,
		width: Ti.UI.FILL,
		visible: true
});
	
init();

function saveRecord(){
	//var title      = $.titleRecord.value;  
	//var message   = $.proceduceTextArea.value;
	var remark = $.remarkTextArea.value;
	var appDate   = $.appointment_datetime.text;
	appDate = convertToDBDateFormat(appDate);
 
 	var param = { 
		u_id : Ti.App.Properties.getString('u_id'),
		date : appDate,
		clinic_id  : selectedClinic,
		remark : remark.trim(),
		created : currentDateTime(),  
		updated : currentDateTime()
	};  
	
 	API.addAppointment({param: param}, savedAppointment);
 	return false;
	
	// nav.navigationWindow("myHealth" );
	Ti.App.fireEvent('displayRecords');
	nav.closeWindow($.win);
	 
}

function savedAppointment(ex){
	console.log(ex);

}

function deleteRecord(){
	
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Cancel','Confirm'],
		message: 'Are you sure want to delete this records?',
		title: 'Delete Confirmation'
	});
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		      //Do nothing
		}
		if (e.index === 1){ 
			 medicalRecordsModel.removeRecordById(rec_id);
			 medicalAttachmentModel.removeRecordByRec(rec_id);
			 Ti.App.fireEvent('displayRecords');
			 nav.closeWindow($.win);
		}
	});
	dialog.show(); 
	
}

function init(){
	if(OS_IOS){
		var done = Titanium.UI.createButton({
		    title: 'Done',
		    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
		});
		   
		done.addEventListener('click', function(){ 
			$.appointmentDateTime.visible = 0;
			$.appointmentDateTime.height = 0;
		});
	  
		toolbar = Titanium.UI.iOS.createToolbar({
		    items:[  done], 
		    extendBackground:true,
		    borderTop:true,
	   		borderBottom:false
		}); 
		
		dpView.add(toolbar); 
	}
	
	var curDate = currentDateTime();
	var d = curDate.substr(0,10);
	var cd = d.split("-"); 
	// Set picker data
	var minDate = new Date();
		minDate.setFullYear(cd[0]);
		minDate.setMonth(parseInt(cd[1]) - 1);
		minDate.setDate(parseInt(cd[2]));
	
 
	var value = new Date();
		value.setFullYear(cd[0]);
		value.setMonth(parseInt(cd[1]) - 1);
		value.setDate(parseInt(cd[2]));
	
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		minDate: minDate,
		value : value,
		bottom: 0
	});
	picker.addEventListener("change", changeDate);
	// turn on the selection indicator (off by default)
	picker.selectionIndicator = true; 
	dpView.add(picker);
	$.appointmentDateTime.add(dpView);
}
 
function changeDate(e){ 
	 
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    day = day.toString();
    var hours = pickerdate.getHours();
    var minutes = pickerdate.getMinutes();
    console.log(hours+":"+minutes);
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
    selDate = day + "/" + month + "/" + year + " "+hours+":"+minutes+":00"; 
     
	$.appointment_datetime.text = selDate  ;  
}

$.appointment_clinic.addEventListener('click', function(e){ 
	var winClinic = Alloy.createController('appointmentClinicList').getView();
	winClinic.open({
			modal:true
		}); 
});

$.appointment_datetime.addEventListener('click', function(e){ 
	$.appointmentDateTime.visible = 1;
	$.appointmentDateTime.height = 200;
});

function selectClinic(e){
	 
	selectedClinic = e.clinicId;
	$.appointment_clinic.text = e.clinicName;
}

function hideKeyboard(){
	$.remarkTextArea.blur();  
}

Ti.App.addEventListener('selectClinic',selectClinic);
//release memory when close
$.win.addEventListener("close", function(){
    Ti.App.removeEventListener('selectClinic',selectClinic); 
});

