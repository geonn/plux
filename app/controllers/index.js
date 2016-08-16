var args = {};
var u_id = Ti.App.Properties.getString('u_id') || "";
var appointmentModel = Alloy.createCollection('appointment');   
appointmentModel.addColumn("doctor_panel_id", "TEXT"); 
appointmentModel.addColumn("clinic_name", "TEXT"); 
appointmentModel.addColumn("doctor_name", "TEXT"); 
appointmentModel.addColumn("specialty_name", "TEXT"); 

var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');   
medicalAttachmentModel.addColumn("img_path", "TEXT"); 
medicalAttachmentModel.addColumn("server_id", "TEXT"); 

var notificationModel = Alloy.createCollection('notification');   
notificationModel.addColumn("isRead", "TEXT"); 
notificationModel.addColumn("status", "TEXT");

function init(){
	var isShowIntro = Ti.App.Properties.getString('isShowIntro') || "";
	var isSignup2 = Ti.App.Properties.getString('signup2');
	if(isShowIntro	!= ""){
		if(u_id == ""){ 
			if(isSignup2 == "yes"){
				var win = Alloy.createController("asp/signup2").getView();
				win.open(); 
			}else{
				console.log('login');
				var win = Alloy.createController("login").getView();
				win.open(); 
			}
		}else{
			if(isSignup2 == "yes"){
				var win = Alloy.createController("asp/signup2").getView();
				win.open(); 
			}else{
				console.log('home');
				var win = Alloy.createController("home").getView();
			}
		}
	}else{ 
		console.log('firsttime');
		$.index.win.open();
	}
}

init();

API.callByPost({url: "dateNow"}, function(responseText){
	var res = JSON.parse(responseText);
	
	if(res.status != "error"){
		common.sync_time(res.data);
	}
	
});