var args = {};
var u_id = Ti.App.Properties.getString('u_id') || "";
var loadingView;
var appointmentModel = Alloy.createCollection('appointment');   
appointmentModel.addColumn("doctor_panel_id", "TEXT"); 
appointmentModel.addColumn("clinic_name", "TEXT"); 
appointmentModel.addColumn("doctor_name", "TEXT"); 
appointmentModel.addColumn("specialty_name", "TEXT"); 
var medicalRecordsModel = Alloy.createCollection('medicalRecords');   
medicalRecordsModel.addColumn("server_id", "TEXT"); 

var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');   
medicalAttachmentModel.addColumn("img_path", "TEXT"); 
medicalAttachmentModel.addColumn("server_id", "TEXT"); 

var notificationModel = Alloy.createCollection('notification');   
notificationModel.addColumn("isRead", "TEXT"); 
notificationModel.addColumn("status", "TEXT"); 

function loadingViewFinish(){
	loadingView.finish(function(){
		var isShowIntro = Ti.App.Properties.getString('isShowIntro') || "";
		 
		if(isShowIntro	!= ""){
			if(u_id == ""){ 
				console.log('login');
				var win = Alloy.createController("login").getView();
				win.open(); 
			}else{
				console.log('home');
				var win = Alloy.createController("home").getView();
				win.open(); 
			}
		}else{ 
			console.log('firsttime');
			$.index.win.open();
		}
		loadingView = null;
	});
}

//API.loadCategoryList(); 
//API.loadNewsFeed();
//API.loadLeaflet();
//API.loadClinicList(); 
//API.loadDoctorPanel();
//API.getDoctorList();
console.log(common.now()+"before");

API.callByPost({url: "dateNow"}, function(responseText){
	console.log(responseText+" wtf");
	common.sync_time(responseText);
	console.log(common.now()+"after");
	loadingView = Alloy.createController("loader");
	loadingView.getView().open();
	loadingView.start();
});


var AppVersionControl = require('AppVersionControl');
AppVersionControl.checkAndUpdate();

Ti.App.addEventListener('app:loadingViewFinish', loadingViewFinish);
