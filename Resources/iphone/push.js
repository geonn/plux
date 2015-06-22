function receivePush(e) {
    nav.navigateWithArgs("webview", {
        url: e.data.target
    });
    return false;
}

function deviceTokenSuccess(ex) {
    deviceToken = ex.deviceToken;
    Cloud.Users.login({
        login: "geomilano",
        password: "geonn2015"
    }, function(e) {
        e.success && Cloud.PushNotifications.subscribe({
            channel: "survey",
            type: "ios",
            device_token: deviceToken
        }, function(e) {
            if (e.success) {
                Ti.App.Properties.setString("deviceToken", deviceToken);
                API.updateNotificationToken();
            } else registerPush();
        });
    });
}

function deviceTokenError(e) {
    alert("Failed to register for push notifications! " + e.error);
}

function registerPush() {
    if (true && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
        Ti.App.iOS.addEventListener("usernotificationsettings", function registerForPush() {
            Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
            Ti.Network.registerForPushNotifications({
                success: deviceTokenSuccess,
                error: deviceTokenError,
                callback: receivePush
            });
        });
        Ti.App.iOS.registerUserNotificationSettings({
            types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE ]
        });
    } else "android" == Ti.Platform.osname ? CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    }) : Titanium.Network.registerForPushNotifications({
        types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
}

var Cloud = require("ti.cloud");

var app_status;

var redirect = false;

if ("android" == Ti.Platform.osname) {
    var CloudPush = require("ti.cloudpush");
    CloudPush.addEventListener("callback", function(evt) {
        var payload = JSON.parse(evt.payload);
        Ti.App.Payload = payload;
        if (redirect) if ("not_running" == app_status) ; else {
            redirect = false;
            getNotificationNumber(payload);
        }
    });
    CloudPush.addEventListener("trayClickLaunchedApp", function() {
        redirect = true;
        app_status = "not_running";
    });
    CloudPush.addEventListener("trayClickFocusedApp", function() {
        redirect = true;
        app_status = "running";
    });
}

exports.registerPush = function() {
    registerPush();
};