var Cloud = require('ti.cloud'); 
var app_status;
var redirect = false;
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
	console.log(e);
	return false;
	var notificationModel = Alloy.createCollection('notification'); 
	notificationModel.addData();
	
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
			if(e.data.target == "claimDetail"){ 
				nav.navigateWithArgs("asp/"+e.data.target, {
					serial: e.data.extra
				});
			}
			if(e.data.target == "webview"){
				nav.navigateWithArgs(e.data.target, {
					url: e.data.extra
				});
			}
		}
	});
	dialog.show();  	
	
 
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
	console.log(payload);
}

exports.registerPush = function(){
	registerPush();
};