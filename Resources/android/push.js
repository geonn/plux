function receivePush(e) {
    var param = {
        id: e.data.id || "",
        member_no: e.data.mem_no || "",
        subject: e.data.title || "",
        message: e.data.message || "",
        url: e.data.extra || "",
        expired: "",
        created: e.data.created,
        updated: e.data.updated
    };
    console.log(param);
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
            "claimDetail" == e.data.target && nav.navigateWithArgs("asp/notification");
            "webview" == e.data.target && nav.navigateWithArgs(e.data.target, {
                url: e.data.extra
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