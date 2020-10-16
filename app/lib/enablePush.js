// Require the module
var Cloud = require("ti.cloud");
var channelId = 'sound';
var deviceToken = null;

exports.subscribeToChannel = function(channelId){
	console.log("subscribeToChannel "+channelId+" "+deviceToken);
	//alert("subscribeToChannel "+channel+" "+deviceToken);
	if(OS_ANDROID){
		var cl = Ti.Android.NotificationManager.createNotificationChannel({
	        id: channelId,
	        name: channelId,
	        importance: Ti.Android.IMPORTANCE_MAX ,
	    });
   }
   console.log(Ti.Platform.name+" Ti.Platform.name");
	Cloud.PushNotifications.subscribeToken({
        device_token : deviceToken,
        channel : channelId,
        type : Ti.Platform.name == 'android' ? 'android' : 'ios',
    }, function(e) {
		if (e.success) {
	        console.log("subscribeTo "+channelId+" with deviceToken "+deviceToken);
	    } else {
	        console.log('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
    });
};

exports.unsubscribeToAll = function(ex){
	console.log("unsubscribeToChannel "+channelId+" "+deviceToken);
	//alert("subscribeToChannel "+channel+" "+deviceToken);

	Cloud.PushNotifications.unsubscribeToken({
        device_token : deviceToken,
    }, function(e) {
		if (e.success) {
	        console.log("unsubscribe with deviceToken "+deviceToken);
	    } else {
	        console.log('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	    ex.callback();
    });
};


var loginUser = function(ex){
    // Log in to Arrow
    var u_id = Ti.App.Properties.getString('u_id') || "";
    Cloud.Users.login({
        login: u_id,
        password: '123456'

    }, function (e) {
        if (e.success) {
           // alert('Login successful');
            ex.callback();
        } else {
        	console.log(e.code+" error code ");
        	if(true){
        		Cloud.Users.create({
				    first_name: u_id,
				    username: u_id,
				    password: '123456',
				    password_confirmation: '123456'
				}, function (e) {
				    if (e.success) {
				        loginUser();
				    } else {
				        console.log('Error:\n' +
				            ((e.error && e.message) || JSON.stringify(e)));
				    }
	        	  });
            console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
        }
    });
};
exports.loginUser = loginUser;

exports.logoutUser = function(callback) {
	Cloud.Users.logout(function (e) {
	    if (e.success) {
	        console.log('Success: Logged out');
	    } else {
	        console.log('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

exports.pushNotification = function(ex) {
    if (OS_ANDROID) {
        var CloudPush = require('ti.cloudpush');
        CloudPush.retrieveDeviceToken({
            success : deviceTokenSuccess,
            error : deviceTokenError
        });

        // Process incoming push notifications
        CloudPush.addEventListener('callback', function(e) {

            var payload = JSON.parse(e.payload);
            if (payload) {

                ex.receivedPush({
                    error : false,
                    data : payload
                });

            }

        });

        CloudPush.addEventListener('trayClickLaunchedApp', function(e) {
            push_redirect = true;

        });

        CloudPush.addEventListener('trayClickFocusedApp', function(e) {
          push_redirect = true;
        });
    }

    if (OS_IOS) {

        if (Ti.Platform.name === "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {

            // Wait for user settings to be registered before registering for push notifications
            Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {

                // Remove event listener once registered for push notifications
                Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);

                Ti.Network.registerForPushNotifications({
                    success : deviceTokenSuccess,
                    error : deviceTokenError,
                    callback : receiveIOSPush
                });
            });

            // Register notification types to use
            Ti.App.iOS.registerUserNotificationSettings({
                types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
            });
        }

        // For iOS 7 and earlier
        else {

            Ti.Network.registerForPushNotifications({
                // Specifies which notifications to receive
                types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
                success : deviceTokenSuccess,
                error : deviceTokenError,
                callback : receiveIOSPush
            });
        }

        function receiveIOSPush(e) {

            ex.receivedPush({
                error : false,
                data : e.data
            });

        }

    }

    // Save the device token for subsequent API calls
    function deviceTokenSuccess(e) {

        deviceToken = e.deviceToken;
		console.log(deviceToken+' deviceTokenSuccess');
        Titanium.App.Properties.setString('deviceToken', deviceToken);
        Alloy.Globals.API.updateNotificationToken();
    }

    function deviceTokenError(e) {
    }

};
