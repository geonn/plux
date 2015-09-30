var args = arguments[0] || {};
var appointmentModel = Alloy.createCollection('appointment');  
var panelListModel = Alloy.createCollection('panelList');  
var appointmentList;
common.construct($); 
common.showLoading();
init();

function init(){
	API.syncAppointmentData(savedAppointment);
	displayAppointmentList();
}

function savedAppointment(ex){ 
	var result = ex.param;
	if(result.status == "error"){
		common.createAlert("Error", result.data);
		return false;
	}else{  
		appointmentModel.saveArray(result.data); 
	}
	
	displayAppointmentList(); 
}


function displayAppointmentList(){ 
	appointmentList = appointmentModel.getAppointmentList({u_id: Ti.App.Properties.getString('u_id') }); 
	var data=[]; 
	$.recordTable.setData(data);
	var counter = 0; 
 
	if(appointmentList.length < 1){
		common.hideLoading(); 
		$.recordTable.setData(common.noRecord());
	}else{
		appointmentList.forEach(function(entry) {
			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    source: entry.id,
			    backgroundSelectedColor: "#FFE1E1", 
				color: "transparent"
			   });
			
			var contentView = Ti.UI.createView({
				layout: "vertical",
				height: Ti.UI.SIZE,
				source: entry.id,
				width: Ti.UI.FILL
			});
			 
			panel = panelListModel.getPanelListById(entry.clinic_id);
			var clinicLbl = Titanium.UI.createLabel({
				text:panel.clinicName || "",
				font:{fontSize:14},
				source: entry.id,
				color: "#CE1D1C", 
				textAlign:'left',  
				top:5,
				left:15, 
				width:"80%",
				height:Ti.UI.SIZE
			}); 
			contentView.add(clinicLbl);
			
			var statusText = "Pending";
			var statusColor = "#8A6500";
			if(entry.status == "2"){ //rejected
				statusText = "Rejected";
				statusColor = "#CE1D1C";
			}else if(entry.status == "3"){ //accepted
				statusText = "Accepted";
				statusColor = "#2C8A00";
			}else if(entry.status == "4"){ //suggested date
				statusText = "Suggested Another Date And Time";
				statusColor = "#005E8A";
			}
			 
			if(entry.date < currentDateTime() ){ 
				statusText = "Expired";
				statusColor = "#CE1D1C";
			}
			
			var statusLbl = Titanium.UI.createLabel({
				text: "Status : "+statusText,
				font:{fontSize:12},
				source: entry.id,
				color: statusColor, 
				textAlign:'left', 
				left:15,
				height:Ti.UI.SIZE
			}); 
			contentView.add(statusLbl);
		 
			var appLbl = Titanium.UI.createLabel({
				text:  "Appt. date : "+monthFormat(entry.date),
				font:{fontSize:12},
				source: entry.id,
				color: "#848484", 
				textAlign:'left', 
				left:15,
				bottom:5,
				width: "85%",
				height:Ti.UI.SIZE
			}); 
			contentView.add(appLbl);
			
			var rightForwardBtn =  Titanium.UI.createImageView({
				image:"/images/btn-forward.png",
				source: entry.id,
				width:15,
				right:20 
			});
			
			row.add(contentView);
			row.add(rightForwardBtn); 
		 	row.addEventListener('click', function(e) {
				viewDetails(e.rowData.source);
			});
			data.push(row);
		});
	
		
		$.recordTable.setData(data);
	}
	common.hideLoading(); 
}

function viewDetails(rec_id){  
	nav.navigateWithArgs("appointmentForm",{id: rec_id}); 
}

$.newRecord.addEventListener('click',function(){ 
	nav.navigateWithArgs("appointmentForm",{id : ""});
});


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}

Ti.App.addEventListener('displayRecords', displayAppointmentList);
/** close all editProfile eventListener when close the page**/
$.win.addEventListener("close", function(){
	$.destroy(); 
    Ti.App.removeEventListener('displayRecords', displayAppointmentList);
});
