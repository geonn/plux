exports.pushNotification = function(callback) {

    // Require the module
    var Cloud = require("ti.cloud");

    var deviceToken = null;

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

                callback({
                    error : false,
                    data : payload
                });

            }

        });

        CloudPush.addEventListener('trayClickLaunchedApp', function(e) {
            push_redirect = true;
            var payload = JSON.parse(e.payload);
            if (payload) {

                callback({
                    error : false,
                    data : payload
                });

            }

        });

        CloudPush.addEventListener('trayClickFocusedApp', function(e) {
          push_redirect = true;
            /*
            var payload = JSON.parse(e.payload);
            if (payload) {

                callback({
                    error : false,
                    data : payload
                });

            }*/

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

            callback({
                error : false,
                data : e.data
            });

        }

    }

    // Save the device token for subsequent API calls
    function deviceTokenSuccess(e) {

        deviceToken = e.deviceToken;

        Titanium.App.Properties.setString('deviceToken', deviceToken);
        API.updateNotificationToken();
        Cloud.PushNotifications.subscribeToken({
            device_token : Titanium.App.Properties.getString('deviceToken'),
            channel : 'general',
            type : (OS_IOS) ? 'ios' : 'android'
        }, function(e) {


        });

        // Reset the badge if needed
        Cloud.PushNotifications.resetBadge({
            device_token : Titanium.App.Properties.getString('deviceToken')
        }, function(e) {


        });

    }

    function deviceTokenError(e) {

        callback({
            error : true,
            message : e.error
        });

    }

};
