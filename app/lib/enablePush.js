// Require the module
var channelId = 'sound';
var deviceToken = null;
// Import core module
var core = require('firebase.core');

// Configure core module (required for all Firebase modules).
core.configure();

// Important: The cloud messaging module has to imported after (!) the configure()
// method of the core module is called
var fcm = require('firebase.cloudmessaging');

// Called when the Firebase token is registered or refreshed.
fcm.addEventListener('didRefreshRegistrationToken', function(e) {
    Ti.API.info('Token', e.fcmToken);
    Titanium.App.Properties.setString('deviceToken',  e.fcmToken);
    Alloy.Globals.API.updateNotificationToken();
});

// Called when direct messages arrive. Note that these are different from push notifications.
fcm.addEventListener('didReceiveMessage', function(e) {
    Ti.API.info('Message', e.message);
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
        id: 'default',
        name: 'Default channel',
        importance: Ti.Android.IMPORTANCE_DEFAULT,
        enableLights: true,
        enableVibration: true,
        showBadge: true
    });
    // if you use a custom id you have to set the same to the `channelId` in you php send script!

    fcm.notificationChannel = channel;

    // display last data:
    Ti.API.info("Last data: " + fcm.lastData);
} else {
	// iOS
	// Listen to the notification settings event
	Ti.App.iOS.addEventListener('usernotificationsettings', function eventUserNotificationSettings() {
	  // Remove the event again to prevent duplicate calls through the Firebase API
	  Ti.App.iOS.removeEventListener('usernotificationsettings', eventUserNotificationSettings);

	  // Register for push notifications
	  Ti.Network.registerForPushNotifications({
	    success: function () {
            if (fcm != null) {
                console.log("New token", fcm.fcmToken);
                Titanium.App.Properties.setString('deviceToken',  fcm.fcmToken);
    			Alloy.Globals.API.updateNotificationToken();
            }
        },
	    error: function (e) {
            console.error(e);
        },
	    callback: function (e) {
            // Fired for all kind of notifications (foreground, background & closed)
            console.log(e.data);
            Ti.App.fireEvent(e.message.data.eventName, e.message.data.params);
        }
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
if (OS_ANDROID) fcm.registerForPushNotifications();

// Check if token is already available.
if (fcm.fcmToken) {
    Ti.API.info('FCM-Token', fcm.fcmToken);
    Titanium.App.Properties.setString('deviceToken',  fcm.fcmToken);
    Alloy.Globals.API.updateNotificationToken();
} else {
    Ti.API.info('Token is empty. Waiting for the token callback ...');
}

// Subscribe to a topic.
fcm.subscribeToTopic('testTopic');