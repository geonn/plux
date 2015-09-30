var args = arguments[0] || {};
var appointment_id = args.id || "";
var userModel = Alloy.createCollection('users_plux'); 
var appointmentModel = Alloy.createCollection('appointment'); 
var user = userModel.getUserById(Ti.App.Properties.getString('u_id'));
var panelListModel = Alloy.createCollection('panelList'); 
var selectedClinic; 
var toolbar;

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
	var appClinic = selectedClinic || "";
	 
	if(appDate == "Choose Date and Time"){
		 common.createAlert("Fail","Please choose appointment date and time");
		 return false;
	}

	if(appClinic == ""){
		 common.createAlert("Fail","Please choose a clinic");
		 return false;
	}
	appDate = convertToDBDateFormat(appDate); 
	remark = remark.replace(/\r?\n/g, '<br />');
 
 	var param = { 
 		id :appointment_id,
		u_id : Ti.App.Properties.getString('u_id'),
		date : appDate,
		clinic_id  : appClinic,
		remark : remark.trim() ,
		created : currentDateTime(),  
		updated : currentDateTime()
	};  
	
 	API.addAppointment({param: param}, savedAppointment);
 	 
	// nav.navigationWindow("myHealth" );
	
}

function savedAppointment(ex){ 
	var result = ex.param;
	if(result.status == "error"){
		common.createAlert("Error", result.data);
		return false;
	}else{  
		appointmentModel.saveArray(result.data); 
	}
	
	Ti.App.fireEvent('displayRecords');
	nav.closeWindow($.win); 
}

 
function init(){
	details = appointmentModel.getAppointmentById(appointment_id) || ""; 
	if(details != ""){
		var remark = details.remark; 
		var regex = /<br\s*[\/]?>/gi; 
		
		if(details.date >= currentDateTime() ){ 
			$.remarkTextArea.value = remark.replace(regex, "\n");
		}else{
			//if expired or cannot edit the appointment
			$.saveRecord.visible = false;
			$.remarkTextArea.height= 0;
			$.remarkTextArea_readonly.height = Ti.UI.SIZE;
			$.remarkTextArea_readonly.text = remark.replace(regex, "\n");
		}
		
		
		$.appointment_datetime.text = timeFormat(details.date);
		
		var clinic = panelListModel.getPanelListById(details.clinic_id);
		$.appointment_clinic.text = clinic.clinicName;
		selectedClinic = details.clinic_id; 
		
		//add Delete button if the appointment still active
		if(details.date >= currentDateTime() ){ 
			//add delete appointment button 
			var deleteBtn = Ti.UI.createButton({
				borderRadius: 5,
				backgroundColor : "#CC2228",
				title : "Delete Appointment",
				width : "70%",
				top	  : 20,
				height: 40,
				color : "#ffffff"
			});
			deleteBtn.addEventListener('click', function(){
			
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
						 API.deleteAppointment(appointment_id, removeAppointment); 
					}
				});
				dialog.show();  
			});
		
			$.aView.add(deleteBtn);
		}else{
			var statusLbl = Titanium.UI.createLabel({
				text: "Status", 
				source: details.id, 
				textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,  
				top:10,
				left:10, 
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE
			}); 
			
			var statusText = "Pending";
			var statusColor = "#8A6500";
			if(details.status == "2"){ //rejected
				statusText = "Rejected";
				statusColor = "#CE1D1C";
			}else if(details.status == "3"){ //accepted
				statusText = "Accepted";
				statusColor = "#2C8A00";
			}else if(details.status == "4"){ //suggested date
				statusText = "Suggested Another Date And Time";
				statusColor = "#005E8A";
			}
			 
			if(details.date < currentDateTime() ){ 
				statusText = "Expired";
				statusColor = "#CE1D1C";
			}
			var statusText = $.UI.create('Label', {
				classes : ["medium_font", "greyText"],
				text: statusText, 
				source: details.id, 
				color: statusColor,
				textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,  
				top:10,
				left:20, 
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE
			}); 
			 
			$.aView.add(statusLbl);	
			$.aView.add(statusText);
		}
	}
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
	var t = curDate.substr(2,16);
	var ct = t.split(":");  
		
	// Set picker data
	var minDate = new Date();
		minDate.setFullYear(cd[0]);
		minDate.setMonth(parseInt(cd[1]) - 1);
		minDate.setDate(parseInt(cd[2]));
	
 	if(details != ""){
 		var selDate = details.date;
 		d = selDate.substr(0,10);
		cd = d.split("-");  
		t = selDate.substr(2,16);
		ct = t.split(":");  
 	}
 
	var value = new Date();
		value.setFullYear(cd[0]);
		value.setMonth(parseInt(cd[1]) - 1);
		value.setDate(parseInt(cd[2]));
		value.setHours(ct[0],ct[1],0);
		//value.setMinutes(parseInt(ct[1]));
	
	if(OS_IOS){
		var picker = Ti.UI.createPicker({
			type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
			minDate: minDate,
			value : value,
			bottom: 0
		});
		picker.addEventListener("change", changeDate);
		picker.selectionIndicator = true; 
		dpView.add(picker);
	}	
	
	// turn on the selection indicator (off by default)
	
	$.appointmentDateTime.add(dpView);
}

function removeAppointment(){
	appointmentModel.updateAppointmentStatus(appointment_id, 5);
	Ti.App.fireEvent('displayRecords');
	nav.closeWindow($.win);
}

function changeDate(e){ 
	 
	var pickerdate = e.value; 
    var day = pickerdate.getDate();
    day = day.toString();
    var hours = pickerdate.getHours();
    var minutes = pickerdate.getMinutes(); 
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

if(details.date >= currentDateTime() || appointment_id == ""){ 
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
}

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
    toolbar = null;
    dpView = null;
});

