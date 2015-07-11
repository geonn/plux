function receivePush(e) {
    "claimDetail" == e.data.target && nav.navigateWithArgs("asp/" + e.data.target, {
        serial: e.data.extra
    });
    "webview" == e.data.target && nav.navigateWithArgs(e.data.target, {
        url: e.data.extra
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
            type: "android",
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
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
}

var Cloud = require("ti.cloud");

var app_status;

var redirect = false;

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

exports.registerPush = function() {
    registerPush();
};