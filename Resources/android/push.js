function receivePush(e) {
    var target;
    var url;
    var param;
    var param = {
        id: e.id || "",
        member_no: e.mem_no || "",
        subject: e.android.title || "",
        message: e.message || "",
        url: e.extra || "",
        isRead: "0",
        expired: "",
        created: e.created,
        updated: e.updated
    };
    target = e.target;
    url = e.extra;
    var notificationModel = Alloy.createCollection("notification");
    notificationModel.addData(param);
    var dialog = Ti.UI.createAlertDialog({
        cancel: 1,
        buttonNames: [ "Cancel", "OK" ],
        message: "New message available. Do you want to read now?",
        title: "Confirmation"
    });
    dialog.addEventListener("click", function(ex) {
        0 === ex.index;
        if (1 === ex.index) {
            "claimDetail" == target && nav.navigateWithArgs("asp/notification");
            "webview" == target && nav.navigateWithArgs(target, {
                url: url
            });
        }
    });
    dialog.show();
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

function getNotificationNumber(payload) {
    console.log(payload);
}

var Cloud = require("ti.cloud");

var app_status;

var redirect = false;

var CloudPush = require("ti.cloudpush");

CloudPush.addEventListener("callback", function(evt) {
    var payload = JSON.parse(evt.payload);
    Ti.App.Payload = payload;
    receivePush(payload);
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