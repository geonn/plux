var args = arguments[0] || {};
var id = args.id || "";
var u_id = Ti.App.Properties.getString('u_id');
var moment = require('alloy/moment');
var loading = Alloy.createController('loading');
init();

function init(){ 
	$.win.add(loading.getView());
	loading.start();
	refresh();
} 

function refresh(){
	Alloy.Globals.API.callByPost({url: "getAppointmentList", new:true, domain: "FREEJINI_DOMAIN",  params: {u_id: u_id}}, function(responseText){
       var res = JSON.parse(responseText);
       for (var i=0; i < res.data.length; i++) {
         res.data[i].fromNow = moment(res.data[i].date).fromNow();
       };	
	   Alloy.Globals.mocx.createCollection("appointment", res.data);
	   loading.finish();
   });
}

function popup(ex){
	var dialog = Titanium.UI.createOptionDialog({
        title: L("Action"),
        options: ["Call", "Add To Calendar", "Cancel"],
        cancel: 2
    });
    dialog.show();
    dialog.addEventListener('click', function(e) {
    	if((OS_IOS)?e.cancel != e.index:!e.cancel){
	    	if(e.index == "0"){
	    		call(ex.source);
	    	}else if(e.index == '1'){
	    		addToCalender({date: ex.source.date});
	    	}
	   }
   });
}

function addToCalendar(e){
	// Create the event
	var date = e.date.split("/");
	var start_date = new Date(date[0], date[1]-1, date[2], 10, 0, 0);
	var end_date = new Date(date[0], date[1]-1, date[2], 23, 59, 59);
	var CALENDAR_TO_USE = 1; 
	var calendar = Ti.Calendar.getCalendarById(CALENDAR_TO_USE);
	console.log('check here');
	console.log(calendar);
	var eventBegins = new Date(2010, 11, 26, 12, 0, 0);
	var eventEnds = new Date(2010, 11, 26, 14, 0, 0);
	var details = {
	    title: 'Do some stuff',
	    description: "I'm going to do some stuff at this time.",
	    begin: eventBegins,
	    end: eventEnds
	};
	
	var event = calendar.createEvent(details);
	
	// Now add a reminder via e-mail for 10 minutes before the event.
	var reminderDetails = {
	    minutes: 10,
	    method: Ti.Calendar.METHOD_EMAIL
	};
	
	event.createReminder(reminderDetails);
}

function addToCalender(e){
	console.log("addToCalender");
	console.log(e);
	if(Ti.Platform.osname == "android"){
		var hasCalendarPermissions = Ti.Calendar.hasCalendarPermissions();
	
		if (hasCalendarPermissions) {
	        showCalendars(Ti.Calendar.selectableCalendars);
		    setCalendarEvent(e);
		}
		else{
			Ti.Calendar.requestCalendarPermissions(function(e1) {
				if (e1.success) {
					showCalendars(Ti.Calendar.selectableCalendars);
					setCalendarEvent(e);
				}else{
					alert('You denied permission.');			
				}
			});
		}
	}else{
		console.log(Ti.Calendar.hasCalendarPermissions()+" Ti.Calendar.hasCalendarPermissions");
		if(Ti.Calendar.hasCalendarPermissions()) {
			showCalendars(Ti.Calendar.allCalendars);
		    setCalendarEvent(e);
		    
		} else {
		    Ti.Calendar.requestCalendarPermissions(function(ex1){
	            if (ex1.success) {
	            	showCalendars(Ti.Calendar.allCalendars);
	                setCalendarEvent(e);
	            } else {
	                alert('Access to calendar is not allowed');
	            }
	        });
		}
	}
}
var Calendar_id = "";
function showCalendars(calendars) {
    for (var i = 0; i < calendars.length; i++) {
        console.log(calendars[i].id+" "+calendars[i].name);
        if(calendars[i].name == "Calendar" || i === 0){
        	Calendar_id = calendars[i].id;
        }
    }
    
    if(OS_ANDROID){
    	Calendar_id = 1;
    }
}

function call(e){
    var tel = e.clinic_tel;
    tel = tel.replace(/[+]/g, "");
    Ti.Platform.openURL('tel:'+tel);
}


function setCalendarEvent(e){
	console.log("setCalendarEvent");
	console.log(e);
	var cal = Ti.Calendar.getCalendarById(Calendar_id);
	console.log(cal);
	var date = e.date.split("-");
	var start_date = new Date(date[0], date[1]-1, date[2], 10, 0, 0);
	var end_date = new Date(date[0], date[1]-1, date[2], 23, 59, 59);
	
	/*
	if(e.source.expired_date != "0000-00-00"){
		var expired_date = e.source.expired_date.split("/");
		var end_date = new Date(expired_date[2], expired_date[1]-1, expired_date[0]-1, 10, 0, 0);
	}else{
		var end_date = new Date(active_date[2], active_date[1]-1, active_date[0], 23, 0, 0);
	}*/
	
	 var event = cal.createEvent({
	    title: "Doctor Appointment",
	    begin: start_date,
	    end: end_date,
	    availability: Ti.Calendar.AVAILABILITY_FREE,
	    allDay: true
	});
	
	 var mil = 60*1000;
	
	 //adding alert to your event , this alert will be before the start _date with 1 minutes
	 if(OS_IOS){
	 	var alert1 = event.createAlert({
		    relativeOffset: mil
		 });
		 event.alerts = [alert1];
	 	 event.save(Ti.Calendar.SPAN_FUTUREEVENTS);
	 }else{
	 	var reminderDetails = {
		    minutes: 60,
		    method: Ti.Calendar.METHOD_ALERT
		};
		
		event.createReminder(reminderDetails);
	 }
	 
	
	 
	 alert("Appointment reminder added into your calendar.");
}

function render(data){
	
}

function monthFormat(datetime){

	var monthNames = [
        "Jan", "Feb", "Mar",
        "April", "May", "June", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

	var timeStamp = datetime.split(" ");
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");
    if(date[1] == "08"){
		date[1] = "8";
	}
	if(date[1] == "09"){
		date[1] = "9";
	}
    month = parseInt(date[1]) -1;
	if(timeStamp.length == 1){
		newFormat =  date[2]+" "+ monthNames[month]+" "+ date[0];
	}else{
		var time = timeStamp[1].split(":");
		if(time[0] > 12){
			ampm = "pm";
			time[0] = time[0] - 12;
		}

		newFormat = date[2]+" "+ monthNames[month]+" "+ date[0] + ", "+ time[0]+":"+time[1]+ " "+ ampm;
	}

	return newFormat;
}

function closeWindow(){
	$.win.close();
}

$.win.addEventListener("close", function(){
	$.destroy();
});