var Cloud = require('ti.cloud'); 

// Process incoming push notifications
function receivePush(e) {
	 
	nav.navigateWithArgs("survey", {
		url: e.data.target
	});
 
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
			    type:'ios', 
			    device_token: deviceToken
			}, function (e) {
				 
			    if (e.success  ) {
			    	
			    	/** User device token**/
	         		Ti.App.Properties.setString('deviceToken', deviceToken);
			     	//	alert("success get token");
					//API.updateNotificationToken();
			    } else {
			    	 alert(' Error: ' + deviceToken);
			     //   registerPush();
			    }
			});
	    } else {
	    	// alert('B Error: ' + JSON.stringify(e));
	      //  alert("Error :"+e.message);
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

exports.registerPush = function(){
	registerPush();
};