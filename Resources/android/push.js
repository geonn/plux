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
        status: e.status,
        created: e.created,
        updated: e.updated
    };
    target = e.target;
    url = e.extra;
    console.log(target + " and redirect " + redirect);
    if ("conversation" == target) redirect ? nav.navigateWithArgs("conversation") : Ti.App.fireEvent("conversation:refresh"); else if ("appointment" == target) {
        var theWindow = Ti.App.Properties.getString("currentAppointmentWindow") || "";
        if ("" == theWindow) {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Cancel", "OK" ],
                message: "[Appointment] New message available. Do you want to read now?",
                title: "Confirmation"
            });
            dialog.addEventListener("click", function(ex) {
                0 === ex.index;
                1 === ex.index && nav.navigateWithArgs("appointment");
            });
            dialog.show();
        } else Ti.App.fireEvent("appointment:refresh");
    } else {
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
        Ti.App.fireEvent("updateNotification");
    }
    return false;
}

function deviceTokenSuccess(ev) {
    deviceToken = ev.deviceToken;
    console.log("deviceToken:" + deviceToken);
    Cloud.Users.login({
        login: "geomilano",
        password: "geonn2015"
    }, function(e) {
<<<<<<< HEAD
        e.success && Cloud.PushNotifications.unsubscribe({
            channel: "survey",
            device_token: deviceToken
        }, function(ey) {
            if (ey.success) Cloud.PushNotifications.subscribe({
=======
        if (e.success) Cloud.PushNotifications.unsubscribe({
            channel: "survey",
            device_token: deviceToken
        }, function(ey) {
            console.log(ey);
            ey.success ? Cloud.PushNotifications.subscribe({
>>>>>>> origin/master
                channel: "survey",
                type: "android",
                device_token: deviceToken
            }, function(ex) {
                if (ex.success) {
                    Ti.App.Properties.setString("deviceToken", deviceToken);
                    API.updateNotificationToken();
                } else registerPush();
<<<<<<< HEAD
            }); else {
                console.log("Error:\n" + (e.error && e.message || JSON.stringify(e)));
                Cloud.PushNotifications.subscribe({
                    channel: "survey",
                    type: "android",
                    device_token: deviceToken
                }, function(ex) {
                    if (ex.success) {
                        Ti.App.Properties.setString("deviceToken", deviceToken);
                        API.updateNotificationToken();
                    } else registerPush();
                });
            }
        });
=======
            }) : Cloud.PushNotifications.subscribe({
                channel: "survey",
                type: "android",
                device_token: deviceToken
            }, function(ex) {
                if (ex.success) {
                    Ti.App.Properties.setString("deviceToken", deviceToken);
                    API.updateNotificationToken();
                    console.log("geo7");
                } else {
                    console.log("geo8");
                    registerPush();
                }
            });
        }); else {
            console.log("GEO NOT Error:\n" + (e.error && e.message || JSON.stringify(e)));
            Cloud.PushNotifications.subscribe({
                channel: "survey",
                type: "android",
                device_token: deviceToken
            }, function(ex) {
                if (ex.success) {
                    Ti.App.Properties.setString("deviceToken", deviceToken);
                    API.updateNotificationToken();
                } else registerPush();
            });
        }
>>>>>>> origin/master
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

function getNotificationNumber() {}

var Cloud = require("ti.cloud");

var app_status;

var redirect = true;

var CloudPush = require("ti.cloudpush");

CloudPush.addEventListener("callback", function(evt) {
    var payload = JSON.parse(evt.payload);
    Ti.API.info("call back notification");
    Ti.App.Payload = payload;
    receivePush(payload);
});

CloudPush.addEventListener("trayClickLaunchedApp", function(evt) {
    redirect = true;
    app_status = "not_running";
    var payload = JSON.parse(evt.payload);
    Ti.App.Payload = payload;
    Ti.API.info("Tray Click Launched App (app was not running)");
    receivePush(payload);
});

CloudPush.addEventListener("trayClickFocusedApp", function(evt) {
    redirect = true;
    app_status = "running";
    var payload = JSON.parse(evt.payload);
    Ti.API.info("Tray Click Focused App (app was already running)");
    receivePush(payload);
});

Ti.App.addEventListener("pause", function() {
    var theWindow = Ti.App.Properties.getString("currentAppointmentWindow") || "";
    redirect = "1" == theWindow ? false : true;
    console.log("sleep : " + theWindow);
});

Ti.App.addEventListener("resumed", function() {
    var theWindow = Ti.App.Properties.getString("currentAppointmentWindow") || "";
    redirect = "1" == theWindow ? false : true;
<<<<<<< HEAD
    console.log("resume : " + theWindow);
=======
>>>>>>> origin/master
});

exports.setInApp = function() {
    console.log("In App");
    redirect = false;
};

exports.registerPush = function() {
    registerPush();
};