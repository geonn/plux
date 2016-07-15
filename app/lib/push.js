var Cloud = require('ti.cloud'); 
var app_status;
var redirect = true;
if(Ti.Platform.osname == "android"){ 
	var CloudPush = require('ti.cloudpush');
	// notification callback function (important)
	CloudPush.addEventListener('callback', function (evt) { 
		var payload = JSON.parse(evt.payload);  
		Ti.App.Payload = payload;
		// if trayClickLaunchedApp or trayClickFocusedApp set redirect as true
		
		receivePush(payload);
 
	});
	
	CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
		redirect = true;
		app_status = "not_running"; 
	    //getNotificationNumber(Ti.App.Payload);
	});
	CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
		redirect = true;
		app_status = "running"; 
	}); 
} 
// Process incoming push notifications
function receivePush(e) {   
	var target;
	var url;
	if(OS_IOS){
		Titanium.UI.iPhone.setAppBadge("0"); 
		var param = {
			"id": e.data.id || "",
			"member_no": e.data.mem_no || "",
			"subject": e.data.title || "",
			"message" : e.data.message || "",
			"url" : e.data.extra || "",
			"isRead" : "0",
			"expired" : "",
			"created" : e.data.created,
			"updated" : e.data.updated,
			"from" : "push"
		};
		target = e.data.target;
		url = e.data.extra;
	}else{
		var param = {
			"id": e.id || "",
			"member_no": e.mem_no || "",
			"subject": e.android.title || "",
			"message" : e.message || "",
			"url" : e.extra || "",
			"isRead" : "0",
			"expired" : "",
			"status" : e.status,
			"created" : e.created,
			"updated" : e.updated,
		};
		target = e.target;
		url = e.extra;
	}  
	console.log(target+" and redirect "+redirect); 
	if(target == "conversation"){
		if(redirect){
			nav.navigateWithArgs("conversation");
		}
	}else if(target =="appointment"){
		console.log("in appointment");
		if(redirect){
			console.log("redirect true");
			nav.navigateWithArgs("appointment");
		}else{
			console.log("redirect false");
			Ti.App.fireEvent("appointment:refresh");
		}
	}else{
		var notificationModel = Alloy.createCollection('notification');  
	    notificationModel.addData(param); 
		var dialog = Ti.UI.createAlertDialog({
			cancel: 1,
			buttonNames: ['Cancel','OK'],
			message: 'New message available. Do you want to read now?',
			title: 'Confirmation'
		});
		dialog.addEventListener('click', function(ex){
			if (ex.index === 0){
				//Do nothing
			}
		
			if (ex.index === 1){
				if(target == "claimDetail"){ 
					nav.navigateWithArgs("asp/notification");
				}
				
				if(target == "webview"){
					nav.navigateWithArgs(target, {
						url: url
					});
				}
			}
		});
		dialog.show();  	
		Ti.App.fireEvent("updateNotification");
	}
	 
	return false;
}

function deviceTokenSuccess(ex) {
    deviceToken = ex.deviceToken; 
    Cloud.Users.login({
	    login: 'geomilano',
	    password: 'geonn2015'
	}, function (e) {
		if (e.success) {
			Cloud.PushNotifications.subscribe({
			    channel: 'survey',
			    type:Ti.Platform.name == 'android' ? 'android' : 'ios', 
			    device_token: deviceToken
			}, function (e) { 
			    if (e.success  ) { 
			     
			    	/** User device token**/
	         		Ti.App.Properties.setString('deviceToken', deviceToken); 
					API.updateNotificationToken();
					 
			    } else {
			    	registerPush();
			    }
			});
	    } else {
	    	 
	    }
	});

    
}


function deviceTokenError(e) {
    alert('Failed to register for push notifications! ' + e.error);
}

function registerPush(){
	if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
 
	 // Wait for user settings to be registered before registering for push notifications
	    Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
	 
	 // Remove event listener once registered for push notifications
	        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
	 
	        Ti.Network.registerForPushNotifications({
	            success: deviceTokenSuccess,
	            error: deviceTokenError,
	            callback: receivePush
	        });
	    });
	 
	 // Register notification types to use
	    Ti.App.iOS.registerUserNotificationSettings({
		    types: [
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
	        ]
	    });
	}else if(Ti.Platform.osname == "android"){
		CloudPush.retrieveDeviceToken({
		    success: deviceTokenSuccess,
		    error: deviceTokenError
		});
	}else{
		Titanium.Network.registerForPushNotifications({
		    types: [
		        Titanium.Network.NOTIFICATION_TYPE_BADGE,
		        Titanium.Network.NOTIFICATION_TYPE_ALERT,
		        Titanium.Network.NOTIFICATION_TYPE_SOUND
		    ],
			success:deviceTokenSuccess,
			error:deviceTokenError,
			callback:receivePush
		});
	}
	
}

function getNotificationNumber(payload){ 
	 
}

Ti.App.addEventListener("pause", function(e){
	console.log('sleep');
	redirect = false;
});

Ti.App.addEventListener("resumed", function(e){
	console.log('resume');
	redirect = false;
});

exports.setInApp = function(){
	console.log('In App');
	redirect = false;
};

exports.registerPush = function(){
	registerPush();
};