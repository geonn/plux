// Require the module
var channelId = 'sound';
var deviceToken = null;
var API = require('api');
var fcm = require('firebase.cloudmessaging');

exports.subscribeToChannel = function(channelId){
	if(OS_IOS){
		return;
	}
	console.log("subscribeToChannel "+channelId+" ");
	//alert("subscribeToChannel "+channel+" "+deviceToken);
	var channel = Ti.Android.NotificationManager.createNotificationChannel({
        id: channelId,
        name: channelId,
        importance: Ti.Android.IMPORTANCE_DEFAULT,
        enableLights: true,
        enableVibration: true,
        showBadge: true
    });
    // if you use a custom id you have to set the same to the `channelId` in you php send script!

    fcm.notificationChannel = channel;
};

exports.unsubscribeToAll = function(ex){
	if(OS_IOS){
		return;
	}
	console.log("unsubscribeToChannel not working "+channelId+" "+deviceToken);

};

exports.pushNotification = function() {
   
var core = require('firebase.core');

// Configure core module (required for all Firebase modules).
if(OS_ANDROID){
	core.configure({
	    GCMSenderID: '501404059090',
	    googleAppID: '1:501404059090:android:ff6ad3a2c6e1afb872340b', // Differs between Android and iOS.
	    // file: 'GoogleService-Info.plist' // If using a plist (iOS only).
	});
}else{
	core.configure({
	    GCMSenderID: '501404059090',
	    googleAppID: '1:501404059090:android:ff6ad3a2c6e1afb872340b', // Differs between Android and iOS.
	    file: 'GoogleService-Info.plist' // If using a plist (iOS only).
	});
}


// Important: The cloud messaging module has to imported after (!) the configure()
// method of the core module is called

// Called when the Firebase token is registered or refreshed.
fcm.addEventListener('didRefreshRegistrationToken', function(e) {
    
    console.log("didRefreshRegistrationToken");
    deviceToken = e.fcmToken;
    console.log(e.fcmToken);
    Titanium.App.Properties.setString('deviceToken',  e.fcmToken);
    Alloy.Globals.API.updateNotificationToken();
});

// Called when direct messages arrive. Note that these are different from push notifications.
fcm.addEventListener('didReceiveMessage', function(e) {
    console.log("didReceiveMessage "+e.message);
    console.log(e.message);
    console.log(e.message.data.eventName+" "+e.message.data.params);
	Ti.App.fireEvent(e.message.data.eventName, e.message.data.params);
});

// Android-only: For configuring custom sounds and importance for the generated system
// notifications when app is in the background
if (OS_ANDROID) {
    // fcm.createNotificationChannel({
    //     sound: 'warn_sound',
    //     channelId: 'default',
    //     channelName: 'General Notifications',
    //     importance: 'high'
    // })

    var channel = Ti.Android.NotificationManager.createNotificationChannel({
        id: 'General',
        name: 'General',
        importance: Ti.Android.IMPORTANCE_DEFAULT,
        enableLights: true,
        enableVibration: true,
        showBadge: true
    });
    // if you use a custom id you have to set the same to the `channelId` in you php send script!

    fcm.notificationChannel = channel;

    // display last data:
    console.log("last data");
    console.log(fcm.lastData);
    Ti.App.fireEvent(fcm.lastData.eventName, fcm.lastData.params);
    fcm.registerForPushNotifications();
} else {
	// iOS
	// Listen to the notification settings event
	Ti.App.iOS.addEventListener('usernotificationsettings', function eventUserNotificationSettings() {
	  // Remove the event again to prevent duplicate calls through the Firebase API
	  Ti.App.iOS.removeEventListener('usernotificationsettings', eventUserNotificationSettings);

	  // Register for push notifications
	  Ti.Network.registerForPushNotifications({
	    success: function (e) { console.log("notification register success"); console.log(e); console.log('FCM-Token', fcm.fcmToken); 
	    var u_id = Ti.App.Properties.getString("u_id");
	    API.callByPost({url: "updateDeviceToken", params: {u_id: u_id, device_id: fcm.fcmToken}}, {onload: 
	    	function(responseText){
	    		//var result = JSON.parse(responseText);
	    		console.log(responseText);
	    	}
	    });
	    },
	    error: function () { console.log("notification register fail"); },
	    callback: function (e) { console.log("notification callback");
	    console.log(e); 
	    console.log(e.data);
	    Ti.App.fireEvent(e.data.eventName, e.data.params);
	    } // Fired for all kind of notifications (foreground, background & closed)
	  });
	});

	// Register for the notification settings event
	Ti.App.iOS.registerUserNotificationSettings({
	  types: [
	    Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
	    Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
	    Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
	  ]
	});
}

// Register the device with the FCM service.


// Check if token is already available.
if (fcm.fcmToken) {
    console.log('FCM-Token', fcm.fcmToken);
    Titanium.App.Properties.setString('deviceToken', fcm.fcmToken);
    Alloy.Globals.API.updateNotificationToken();
} else {
    console.log('Token is empty. Waiting for the token callback ...');
}

// Subscribe to a topic.
fcm.subscribeToTopic('testTopic');

};
