var args = {};
var u_id = Ti.App.Properties.getString('u_id') || "";

var medicalRecordsModel = Alloy.createCollection('medicalRecords');   
medicalRecordsModel.addColumn("server_id", "TEXT"); 

var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');   
medicalAttachmentModel.addColumn("img_path", "TEXT"); 
medicalAttachmentModel.addColumn("server_id", "TEXT"); 

var notificationModel = Alloy.createCollection('notification');   
notificationModel.addColumn("isRead", "TEXT"); 
notificationModel.addColumn("status", "TEXT"); 

API.loadCategoryList(); 
API.loadNewsFeed();
API.loadLeaflet();
API.loadClinicList(); 
API.getDoctorList();

var isShowIntro = Ti.App.Properties.getString('isShowIntro') || "";
 
if(isShowIntro	!= ""){ 
		var win = Alloy.createController("home").getView();
		win.open(); 
		if(u_id == ""){ 
			nav.navigateWithArgs("login", {});  
		} 
}else{ 
		$.index.win.open();
}

/** 

 
>>>>>>> origin/master
var win = Alloy.createController("home").getView();
win.open(); 
if(u_id == ""){ 
	nav.navigateWithArgs("login", {});  
} 
**/
if (Ti.Platform.osname == 'android') {
	var AppVersionControl = require('AppVersionControl');
	AppVersionControl.checkAndUpdate();
}

/*
$.root.open({fullscreen:true});

$.link_visitor.addEventListener('click', function(e){
	var win = Alloy.createController("home").getView(); 
	win.open();
});

$.link_member.addEventListener('click', function(e){
	var win = Alloy.createController("login").getView(); 
	win.open();
});


*/