var args = arguments[0] || {};
var appointmentModel = Alloy.createCollection('appointment');  
var panelListModel = Alloy.createCollection('panelList');  
var appointmentList;
var indicator_color = ["#ffffff", '#fccd03', '#CE1D1C', '#afdb00', '#3f99f9', 'black'];
var status_text = ["", "Pending", "Rejected", "Accepted", "Suggestion", "Deleted"];
var current_date = "";
var loading = Alloy.createController("loading");

init();

function init(){
	$.win.add(loading.getView());
	loading.start();
	API.syncAppointmentData(savedAppointment);
}

function savedAppointment(ex){ 
	var result = ex.param; 
	if(result.status == "error"){
		common.createAlert("Error", result.data);
		return false;
	}else{
		//console.log(result.data);
		appointmentModel.saveArray(result.data);
	}
	render_appointment_list();
}

function render_appointment_list(){ 
	$.appointment_list.removeAllChildren();
	appointmentList = appointmentModel.getAppointmentList({u_id: Ti.App.Properties.getString('u_id')}); 
	var data=[];
	var counter = 0;  
	if(appointmentList.length < 1){
		var view_norecord = $.UI.create("View", {
			top: 10,
			classes: ['wsize', 'hsize', 'box', 'rounded']
		});
		var label_no_record = $.UI.create("Label", {
			classes: ['wsize', 'hsize','padding'],
			text: "No appointment at this moment."
		});
		view_norecord.add(label_no_record);
		$.appointment_list.add(view_norecord);
	}else{
		var all_date = _.sortBy(appointmentList, 'start_date');
		all_date = all_date.reverse(); 
		//console.log(all_date);
		for (var i=0; i < all_date.length; i++) {
			var datetime = all_date[i].start_date.split(" ");
			check_update_currentdate(datetime[0]);
		    $.appointment_list.add(add_appointment_row(all_date[i]));
		};
	}
	loading.finish();
}

function new_appointment(){ 
	nav.navigateWithArgs("appointment/index",{id : ""});
}

/*
 Private Function
 * */

function add_appointment_row(entry){
	var datetime = entry.start_date.split(" ");
	var time = datetime[1];
	
	var view_row = $.UI.create("View", {
		classes: ['wfill', 'box', 'horz', 'rounded'],
		height: 70,
		appointment_id: entry.id,
		doctor_panel_id: entry.doctor_panel_id,
		status: entry.status,
		view_row: 1,
		top: 3
	});
	
	var view_date_status_box = $.UI.create("View", {
		classes: ['hfill', 'vert'],
		width: 90,
		backgroundColor: indicator_color[entry.status]
	});
	
	var label_time = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		textAlign: "center",
		color: "#ffffff",
		bottom: 0,
		minimumFontSize: 12,
		text: convert_ampm(time)
	});
	
	var label_status = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		textAlign: "center",
		top: 0,
		color: "#ffffff",
		font:{
			fontSize: 12
		},
		text: status_text[entry.status]
	});
	
	view_date_status_box.add(label_time);
	view_date_status_box.add(label_status);
	console.log("here");
	console.log(entry);
	//middle part
	var view_clinic_specialty_box = $.UI.create("View", {
		classes: ['hfill', 'vert'],
		width: "auto",
	});
	
	var label_clinic = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		bottom: 0,
		color: "#000000",
		font:{
			fontSize: 12
		},
		text: entry.clinic_name
	});
	
	var label_doctor_name = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		bottom: 0,
		top: 0,
		color: "#000000",
		font:{
			fontSize: 12
		},
		text: entry.doctor_name
	});
	
	var label_specialty = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		bottom: 0,
		top: 0,
		font:{
			fontSize: 12
		},
		text: entry.specialty_name
	});
	
	view_clinic_specialty_box.add(label_clinic);
	view_clinic_specialty_box.add(label_doctor_name);
	view_clinic_specialty_box.add(label_specialty);
	
	view_row.add(view_date_status_box);
	view_row.add(view_clinic_specialty_box);
	
	view_row.addEventListener("click", create_dialog_box);
	return view_row;
}

function create_dialog_box(ex){
	var id = parent({name: "appointment_id"}, ex.source);
	var doctor_panel_id = parent({name: "doctor_panel_id"}, ex.source);
	var status = parent({name: "status"}, ex.source);
	var buttonName = [], message = "";
	//var view_row = parent({name: "view_row", value: 1}, ex.source);
	switch(status){
		case 1:
		case 2:	
			buttonName = ['Cancel Appointment', "Cancel"];
			message = "Are you sure want to cancel this appointment?";
			break;
		case 4:
			buttonName = ['Accept', "Cancel"];
			message = "Please confirm if this appointment time is convenient for you.";
			break;
		case 3:
			return;	
		
	}
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: buttonName,
	    message: message,
	    title: 'Actions'
	  });
	  dialog.addEventListener('click', function(e){
	    if (e.index === 0){
	      if(status == 4){
	      	loading.start();
	      	API.callByPost({url: "suggestedAppointmentUrl", params:{id: id}}, function(responseText){ 
	      		var model = Alloy.createCollection("appointment");
				var res = JSON.parse(responseText);
				var arr = res.data || null;
				//console.log("doctor_panel_id"+doctor_panel_id);
				//console.log(arr);
				model.saveArray(arr);
				model.updateSuggestedAppointmentStatus(doctor_panel_id);
				setTimeout(render_appointment_list, 1000);
				loading.finish();
	      	});
	      }else if(status == 1 || status == 2){
	      	loading.start();
	      	API.callByPost({url: "addAppointmentUrl", params:{id: id, status: 5}}, function(responseText){ 
	      		var model = Alloy.createCollection("appointment");
				var res = JSON.parse(responseText);
				var arr = res.data || null;
				model.updateAppointmentStatus(id, 5);
				render_appointment_list();
				loading.finish();
	      	});
	      }
	    }
	  });
	  dialog.show();
}

function check_update_currentdate(date){
	if(current_date != date){
		current_date = date;
		//add date into list
		var view_date = $.UI.create("View", {
			classes: ['wsize', 'hsize' ],
			top: 10
		});
		
		var d = new Date(); 
		var inputDate = new Date(current_date);  
		var bool = (d.toDateString() == inputDate.toDateString()); 
		var dateText = monthFormat(current_date); 
		if(bool === true){
			dateText = "Today";
		}
		var label_date = $.UI.create("Label", {
			classes: ['wsize', 'hsize', 'padding',"themeColor"],
			text: dateText
		});
		
		view_date.add(label_date);
		$.appointment_list.add(view_date);
	}
}

function convert_ampm(timeStamp){
	var time = timeStamp.split(":");
	var ampm = "am";
	if(time[0] > 12){
		ampm = "pm";
		time[0] = time[0] - 12;
	}
	
	return time[0]+":"+time[1]+ " "+ ampm;
}


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}

Ti.App.addEventListener('displayRecords', render_appointment_list);
Ti.App.addEventListener('appointment:refresh', render_appointment_list);

/** close all editProfile eventListener when close the page**/
$.win.addEventListener("close", function(){
	$.destroy(); 
    Ti.App.removeEventListener('displayRecords', render_appointment_list);
    Ti.App.removeEventListener('appointment:refresh', render_appointment_list);
});
